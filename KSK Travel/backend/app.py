# backend/app.py
from flask import Flask, render_template
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from routes.reservation import reservation_bp  # Import the reservation blueprint

# Initialize the Flask app and configure template/static folders.
# Adjust the paths to 'templates' and 'static' if your frontend is located elsewhere.
app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')
app.config.from_object(Config)

# Enable CORS for all routes
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(reservation_bp, url_prefix='/reservation')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/service')
def service():
    return render_template('service.html')

@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/contact')
def contact_form():
    return render_template('Contact-form.html')

@app.route('/accommodation')
def accommodation():
    return render_template('accommodation.html')

@app.route('/transportation')
def transportation():
    return render_template('transportation.html')

@app.route('/form')
def form():
    return render_template('formTransportation.html')

@app.route('/restaurant')
def restaurant():
    return render_template('restaurant.html')

@app.route('/popular')
def popular():
    return render_template('popular.html')

@app.route('/hotel_checkout')
def hotel_checkout():
    return render_template('hotel-checkout.html')

@app.route('/locations')
def locations():
    return render_template('locations.html')

@app.route('/table')
def table():
    return render_template('TableDetail.html')

if __name__ == "__main__":
    app.run(debug=True, port=5001)
