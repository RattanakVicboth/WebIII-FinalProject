# backend/config.py
from dotenv import load_dotenv
import os

class Config:
    # Flask secret key
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key')
    
    # MySQL database configuration
    MYSQL_HOST = os.environ.get('MYSQL_HOST', '')
    MYSQL_USER = os.environ.get('MYSQL_USER', '')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', '')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'user_db')
    
    # ==== Flask‑Mail settings ====
    MAIL_SERVER   = ''        # or your SMTP host
    MAIL_PORT     = 587
    MAIL_USE_TLS  = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')  # your SMTP user
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')  # your SMTP password
    MAIL_DEFAULT_SENDER = ('', '')
