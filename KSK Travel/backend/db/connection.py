# backend/db/connection.py
import mysql.connector
from mysql.connector import Error
from config import Config

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DB
        )
        if connection.is_connected():
            print("Connected to MySQL database")
    except Error as e:
        print(f"Error: '{e}' occurred")
    return connection
