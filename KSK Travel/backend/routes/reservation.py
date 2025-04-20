# backend/routes/reservation.py
from flask import Blueprint, request, jsonify
from db.connection import create_connection

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route('/check_availability', methods=['POST'])
def check_availability():
    """
    Returns how many rooms of the given type are still free
    in the requested date range, out of a total of 5.
    """
    data = request.get_json()
    room_type     = data['room_type']
    checkin       = data['checkin']
    checkout      = data['checkout']
    requested_qty = int(data.get('room_number', 1))

    conn   = create_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT COALESCE(SUM(room_number),0) AS total_booked
            FROM hotel_reservations
            WHERE room_type = %s
                AND checkin_date < %s
                AND checkout_date > %s

        """, (room_type, checkout, checkin))
        total_booked = cursor.fetchone()['total_booked']

        TOTAL_ROOMS = 5
        available_rooms = TOTAL_ROOMS - total_booked

        return jsonify({
            "available_rooms": available_rooms,
            "can_book": available_rooms >= requested_qty
        })

    except Exception as e:
        print("Availability check error:", e)
        return jsonify({"available_rooms": 0, "can_book": False}), 500

    finally:
        cursor.close()
        conn.close()


@reservation_bp.route('/hotel_reservation', methods=['POST'])
def hotel_reservation():
    """
    Inserts a new reservation and returns its auto-generated ID.
    """
    data = request.get_json()
    # Required fields
    name           = data.get('name')
    email          = data.get('email')
    address        = data.get('address')
    checkin        = data.get('checkin')
    checkout       = data.get('checkout')
    room_type      = data.get('room_type')
    room_number    = int(data.get('room_number', 1))
    person_number  = int(data.get('person_number', 1))
    child_number   = int(data.get('child_number', 0))
    # Convert '0'/'1' or similar into True/False
    res_facilities = bool(int(data.get('res_facilities', 0)))

    conn   = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO hotel_reservations
              (name, email, address, checkin_date, checkout_date,
               room_type, room_number, person_number, child_number,
               restaurant_facilities)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            name, email, address, checkin, checkout,
            room_type, room_number, person_number, child_number,
            res_facilities
        ))
        conn.commit()

        # Grab the new reservation's ID
        reservation_id = cursor.lastrowid
        return jsonify({
            "success": True,
            "message": "Booking successful",
            "reservation_id": reservation_id
        }), 201

    except Exception as e:
        print(f"Error inserting reservation: {e}")
        conn.rollback()
        return jsonify({"success": False, "message": "Server error"}), 500

    finally:
        cursor.close()
        conn.close()


@reservation_bp.route('/cancel_reservation', methods=['POST'])
def cancel_reservation():
    """
    Deletes a reservation by its ID.
    Expects JSON: { "reservation_id": 123 }
    """
    data = request.get_json()
    res_id = data.get('reservation_id')
    if not res_id:
        return jsonify({"success": False, "message": "Missing reservation_id"}), 400

    conn   = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM hotel_reservations WHERE id = %s", (res_id,))
        if cursor.rowcount == 0:
            return jsonify({"success": False, "message": "Reservation not found"}), 404
        conn.commit()
        return jsonify({"success": True}), 200

    except Exception as e:
        conn.rollback()
        print("Cancel error:", e)
        return jsonify({"success": False, "message": "Server error"}), 500

    finally:
        cursor.close()
        conn.close()
