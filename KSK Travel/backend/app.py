# backend/app.py
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from routes.reservation import reservation_bp

# Initialize Flask
app = Flask(
    __name__,
    template_folder='../frontend/templates',
    static_folder='../frontend/static'
)
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize Flask‑Mail
mail = Mail(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(reservation_bp, url_prefix='/reservation')


# -- Your existing page routes --
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

@app.route('/cancel')
def cancel_page():
    return render_template('cancel_reservation.html')


# -- New: handle contact‑form submissions --
@app.route('/send_message', methods=['POST'])
def send_message():
    # Gather form fields
    name    = request.form.get('name', '').strip()
    email   = request.form.get('email', '').strip()
    phone   = request.form.get('phone', '').strip()
    message = request.form.get('message', '').strip()

    # Build email content
    body = f"""
You have a new message from the KSK Travel contact form:

Name:    {name}
Email:   {email}
Phone:   {phone}

Message:
{message}
"""

    try:
        msg = Message(
            subject=f"Contact Form: {name}",
            recipients=["2022133heng@aupp.edu.kh"],
            body=body
        )
        mail.send(msg)
        flash("Your message has been sent!", "success")
    except Exception as e:
        print("Mail send error:", e)
        flash("Sorry, we couldn't send your message. Please try again later.", "danger")

    return redirect(url_for('contact_form'))


if __name__ == "__main__":
    app.run(debug=True, port=5001)
