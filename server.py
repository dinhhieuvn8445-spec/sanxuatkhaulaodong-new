#!/usr/bin/env python3
"""
Simple HTTP server for the job portal website with authentication
"""

import http.server
import socketserver
import os
import sys
import json
import urllib.parse
from pathlib import Path
import psycopg2
import bcrypt

# Set the port
PORT = 12001

# Change to the project directory
project_dir = Path(__file__).parent
os.chdir(project_dir)

def get_db_connection():
    """Tạo kết nối đến PostgreSQL database"""
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="sanxuatkhaulaodong",
            user="postgres",
            password="postgres"
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def authenticate_user(username, password):
    """Xác thực người dùng"""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, username, password_hash, is_admin FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user[2].encode('utf-8')):
            return {
                'id': user[0],
                'username': user[1],
                'is_admin': user[3]
            }
        return None
    except Exception as e:
        print(f"Authentication error: {e}")
        return None
    finally:
        conn.close()

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Allow iframe embedding
        self.send_header('X-Frame-Options', 'ALLOWALL')
        super().end_headers()

    def do_OPTIONS(self):
        """Handle preflight requests"""
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        """Handle POST requests for login"""
        if self.path == '/api/login':
            self.handle_login()
        else:
            self.send_error(404)

    def handle_login(self):
        """Xử lý đăng nhập"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                self.send_json_response({'success': False, 'message': 'Thiếu tên đăng nhập hoặc mật khẩu'})
                return
            
            user = authenticate_user(username, password)
            
            if user:
                self.send_json_response({
                    'success': True, 
                    'message': 'Đăng nhập thành công',
                    'user': {
                        'username': user['username'],
                        'is_admin': user['is_admin']
                    }
                })
            else:
                self.send_json_response({'success': False, 'message': 'Tên đăng nhập hoặc mật khẩu không đúng'})
                
        except Exception as e:
            print(f"Login error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'})

    def send_json_response(self, data):
        """Gửi response JSON"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"Server running at http://0.0.0.0:{PORT}/")
            print(f"Access the website at: https://work-1-mshglbgemrxnuvwc.prod-runtime.all-hands.dev")
            print("Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)