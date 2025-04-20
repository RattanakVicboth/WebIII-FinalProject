from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Example hardcoded users (usually, you'd get this from a database)
users = {
    "abc@gmail.com": "abc123"
}

# Home route (root)
@app.route('/')
def home():
    return 'Welcome to the KSK Travel API!'

# Favicon route (to avoid 404 errors for the favicon)
@app.route('/favicon.ico')
def favicon():
    return '', 204

# Login API route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if users.get(email) == password:
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Signup API route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    mobile = data.get('mobile')

    if email in users:
        return jsonify({"success": False, "message": "Email already exists"}), 400
    users[email] = {'name': name, 'email': email, 'password': password, 'mobile': mobile}
    return jsonify({"success": True, "message": "Signup successful"}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5001)