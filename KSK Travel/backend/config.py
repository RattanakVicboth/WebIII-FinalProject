# backend/config.py
import os

class Config:
    # Flask secret key
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key')
    
    # MySQL database configuration
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'Dambo123')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'user_db')
