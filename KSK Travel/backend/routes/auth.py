# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from db.connection import create_connection

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = create_connection()
    if conn is None:
        return jsonify({"success": False, "message": "Database connection error"}), 500
    
    cursor = conn.cursor(dictionary=True)
    try:
        query = "SELECT * FROM existing_users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if user and user['password'] == password:
            return jsonify({"success": True, "message": "Login successful"}), 200
        else:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    mobile = data.get('mobile')
    
    conn = create_connection()
    if conn is None:
        return jsonify({"success": False, "message": "Database connection error"}), 500
    
    cursor = conn.cursor(dictionary=True)
    try:
        # Check if email already exists in existing_users table
        check_query = "SELECT * FROM existing_users WHERE email = %s"
        cursor.execute(check_query, (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "Email already exists"}), 400
        
        # Insert new user details into new_registered_users table
        insert_new_query = """
            INSERT INTO new_registered_users (name, email, password, mobile)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_new_query, (name, email, password, mobile))
        
        # Also insert the minimal credentials into existing_users table
        insert_existing_query = """
            INSERT INTO existing_users (email, password)
            VALUES (%s, %s)
        """
        cursor.execute(insert_existing_query, (email, password))
        
        conn.commit()
        return jsonify({"success": True, "message": "Signup successful"}), 201
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()
