# backend/routes/reservation.py
from flask import Blueprint, request, jsonify
from db.connection import create_connection

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route('/check_availability', methods=['POST'])
def check_availability():
    data = request.get_json()
    room_type = data.get('room_type')
    checkin = data.get('checkin')
    checkout = data.get('checkout')
    
    conn = create_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        query = """
            SELECT COUNT(*) AS total_conflicts
            FROM hotel_reservations
            WHERE room_type = %s
              AND (checkin_date < %s AND checkout_date > %s)
        """
        cursor.execute(query, (room_type, checkout, checkin))
        result = cursor.fetchone()
        available = (result['total_conflicts'] == 0)
        return jsonify({"available": available})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"available": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()



@reservation_bp.route('/hotel_reservation', methods=['POST'])
def hotel_reservation():
    data = request.get_json()
    
    # Extract personal details and reservation information
    name = data.get('name')
    email = data.get('email')
    address = data.get('address')
    checkin = data.get('checkin')
    checkout = data.get('checkout')
    
    room_type = data.get('room_type')
    room_number = data.get('room_number')
    person_number = data.get('person_number')
    child_number = data.get('child_number')
    res_facilities = data.get('res_facilities')  # Assume this is a boolean or an appropriate value

    conn = create_connection()
    cursor = conn.cursor()
    try:
        query = """
            INSERT INTO hotel_reservations 
            (name, email, address, checkin_date, checkout_date, room_type, room_number, person_number, child_number, restaurant_facilities)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (name, email, address, checkin, checkout, room_type, room_number, person_number, child_number, res_facilities))
        conn.commit()
        return jsonify({"success": True, "message": "Booking successful"}), 201
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()
