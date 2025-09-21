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
import sqlite3
import bcrypt

# Set the port
PORT = 12001

# Change to the project directory
project_dir = Path(__file__).parent
os.chdir(project_dir)

def get_db_connection():
    """Tạo kết nối đến SQLite database"""
    try:
        conn = sqlite3.connect('admin_content.db')
        conn.row_factory = sqlite3.Row  # Enable dict-like access to rows
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
        cur.execute("SELECT id, username, password_hash, is_admin FROM users WHERE username = ?", (username,))
        user = cur.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return {
                'id': user['id'],
                'username': user['username'],
                'is_admin': user['is_admin']
            }
        return None
    except Exception as e:
        print(f"Authentication error: {e}")
        return None
    finally:
        conn.close()

def get_page_content(page_name):
    """Lấy nội dung trang"""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT content FROM page_content WHERE page_name = ?", (page_name,))
        result = cur.fetchone()
        
        if result:
            return json.loads(result['content'])
        return None
    except Exception as e:
        print(f"Error getting page content: {e}")
        return None
    finally:
        conn.close()

def save_page_content(page_name, content):
    """Lưu nội dung trang"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT OR REPLACE INTO page_content (page_name, content, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        """, (page_name, json.dumps(content, ensure_ascii=False)))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving page content: {e}")
        return False
    finally:
        conn.close()

def get_countries_data():
    """Lấy dữ liệu quốc gia"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM countries ORDER BY name")
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting countries: {e}")
        return []
    finally:
        conn.close()

def get_jobs_data():
    """Lấy dữ liệu việc làm"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT * FROM jobs 
            WHERE is_active = 1
            ORDER BY created_at DESC
        """)
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting jobs: {e}")
        return []
    finally:
        conn.close()

def get_job_by_id(job_id):
    """Lấy thông tin job theo ID"""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
        row = cur.fetchone()
        return dict(row) if row else None
    except Exception as e:
        print(f"Error getting job by ID: {e}")
        return None
    finally:
        conn.close()

def save_job(job_data):
    """Lưu thông tin job (thêm mới hoặc cập nhật)"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        
        if 'id' in job_data and job_data['id']:
            # Cập nhật job hiện có
            cur.execute("""
                UPDATE jobs SET
                    title = ?, country = ?, country_flag = ?, salary_amount = ?,
                    salary_currency = ?, salary_period = ?, requirements = ?,
                    deadline = ?, image_url = ?, status_badge = ?,
                    consultant_name = ?, consultant_phone = ?, consultant_zalo = ?,
                    consultant_facebook = ?, view_count = ?, is_active = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            """, (
                job_data.get('title'), job_data.get('country'), job_data.get('country_flag'),
                job_data.get('salary_amount'), job_data.get('salary_currency'), job_data.get('salary_period'),
                job_data.get('requirements'), job_data.get('deadline'), job_data.get('image_url'),
                job_data.get('status_badge'), job_data.get('consultant_name'), job_data.get('consultant_phone'),
                job_data.get('consultant_zalo'), job_data.get('consultant_facebook'), job_data.get('view_count'),
                job_data.get('is_active', 1), job_data['id']
            ))
        else:
            # Thêm job mới
            cur.execute("""
                INSERT INTO jobs (
                    title, country, country_flag, salary_amount, salary_currency, salary_period,
                    requirements, deadline, image_url, status_badge, consultant_name,
                    consultant_phone, consultant_zalo, consultant_facebook, view_count, is_active
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                job_data.get('title'), job_data.get('country'), job_data.get('country_flag'),
                job_data.get('salary_amount'), job_data.get('salary_currency'), job_data.get('salary_period'),
                job_data.get('requirements'), job_data.get('deadline'), job_data.get('image_url'),
                job_data.get('status_badge'), job_data.get('consultant_name'), job_data.get('consultant_phone'),
                job_data.get('consultant_zalo'), job_data.get('consultant_facebook'), 
                job_data.get('view_count', 0), job_data.get('is_active', 1)
            ))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving job: {e}")
        return False
    finally:
        conn.close()

def delete_job(job_id):
    """Xóa job (soft delete - đặt is_active = 0)"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("UPDATE jobs SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?", (job_id,))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error deleting job: {e}")
        return False
    finally:
        conn.close()

def get_orders_data():
    """Lấy dữ liệu đơn hàng"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM orders ORDER BY created_at DESC")
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting orders: {e}")
        return []
    finally:
        conn.close()

def get_applications_data():
    """Lấy dữ liệu hồ sơ ứng tuyển"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT a.*, j.title as job_title 
            FROM applications a 
            LEFT JOIN jobs j ON a.job_id = j.id 
            ORDER BY a.created_at DESC
        """)
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting applications: {e}")
        return []
    finally:
        conn.close()

def get_partners_data():
    """Lấy dữ liệu đối tác"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM partners ORDER BY name")
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting partners: {e}")
        return []
    finally:
        conn.close()

def get_users_data():
    """Lấy dữ liệu người dùng"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, username, email, is_admin, created_at FROM users ORDER BY created_at DESC")
        users = []
        for row in cur.fetchall():
            user = dict(row)
            user['role'] = 'Admin' if user['is_admin'] else 'User'
            user['status'] = 'active'  # Mặc định active
            users.append(user)
        return users
    except Exception as e:
        print(f"Error getting users: {e}")
        return []
    finally:
        conn.close()

def get_dashboard_stats():
    """Lấy thống kê dashboard"""
    conn = get_db_connection()
    if not conn:
        return {}
    
    try:
        cur = conn.cursor()
        
        # Đếm việc làm
        cur.execute("SELECT COUNT(*) FROM jobs WHERE status = 'active'")
        total_jobs = cur.fetchone()[0]
        
        # Đếm hồ sơ ứng tuyển
        cur.execute("SELECT COUNT(*) FROM applications")
        total_applications = cur.fetchone()[0]
        
        # Đếm quốc gia
        cur.execute("SELECT COUNT(*) FROM countries WHERE status = 'active'")
        total_countries = cur.fetchone()[0]
        
        # Đếm người dùng
        cur.execute("SELECT COUNT(*) FROM users")
        total_users = cur.fetchone()[0]
        
        return {
            'totalJobs': total_jobs,
            'totalApplications': total_applications,
            'totalCountries': total_countries,
            'totalUsers': total_users
        }
    except Exception as e:
        print(f"Error getting dashboard stats: {e}")
        return {}
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
        """Handle POST requests"""
        if self.path == '/api/login':
            self.handle_login()
        elif self.path.startswith('/api/admin/content/'):
            self.handle_save_content()
        elif self.path == '/api/admin/jobs':
            self.handle_save_job()
        else:
            self.send_error(404)
    
    def do_GET(self):
        """Handle GET requests"""
        if self.path.startswith('/api/admin/content/'):
            self.handle_get_content()
        elif self.path == '/api/admin/countries':
            self.send_json_response(get_countries_data())
        elif self.path == '/api/admin/jobs':
            self.send_json_response(get_jobs_data())
        elif self.path.startswith('/api/admin/jobs/'):
            # Get job by ID: /api/admin/jobs/123
            job_id = self.path.split('/')[-1]
            try:
                job_id = int(job_id)
                job = get_job_by_id(job_id)
                if job:
                    self.send_json_response(job)
                else:
                    self.send_json_response({'error': 'Job not found'}, 404)
            except ValueError:
                self.send_json_response({'error': 'Invalid job ID'}, 400)
        elif self.path == '/api/admin/orders':
            self.send_json_response(get_orders_data())
        elif self.path == '/api/admin/applications':
            self.send_json_response(get_applications_data())
        elif self.path == '/api/admin/partners':
            self.send_json_response(get_partners_data())
        elif self.path == '/api/admin/users':
            self.send_json_response(get_users_data())
        elif self.path == '/api/admin/dashboard/stats':
            self.send_json_response(get_dashboard_stats())
        else:
            # Serve index.html for root path
            if self.path == '/':
                self.path = '/index.html'
            return super().do_GET()

    def do_DELETE(self):
        """Handle DELETE requests"""
        if self.path.startswith('/api/admin/jobs/'):
            # Delete job by ID: /api/admin/jobs/123
            job_id = self.path.split('/')[-1]
            try:
                job_id = int(job_id)
                if delete_job(job_id):
                    self.send_json_response({'success': True, 'message': 'Job deleted successfully'})
                else:
                    self.send_json_response({'success': False, 'message': 'Failed to delete job'}, 500)
            except ValueError:
                self.send_json_response({'error': 'Invalid job ID'}, 400)
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

    def handle_get_content(self):
        """Xử lý lấy nội dung trang"""
        try:
            # Extract page name from URL
            page_name = self.path.split('/')[-1]
            
            content = get_page_content(page_name)
            
            if content:
                self.send_json_response({'success': True, 'data': content})
            else:
                self.send_json_response({'success': False, 'message': 'Không tìm thấy nội dung'})
                
        except Exception as e:
            print(f"Get content error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'})
    
    def handle_save_content(self):
        """Xử lý lưu nội dung trang"""
        try:
            # Extract page name from URL
            page_name = self.path.split('/')[-1]
            
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if save_page_content(page_name, data):
                self.send_json_response({'success': True, 'message': 'Lưu thành công'})
            else:
                self.send_json_response({'success': False, 'message': 'Lỗi khi lưu dữ liệu'})
                
        except Exception as e:
            print(f"Save content error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'})

    def handle_save_job(self):
        """Xử lý lưu thông tin job"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if save_job(data):
                self.send_json_response({'success': True, 'message': 'Lưu đơn hàng thành công'})
            else:
                self.send_json_response({'success': False, 'message': 'Lỗi khi lưu đơn hàng'})
                
        except Exception as e:
            print(f"Save job error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'})

    def send_json_response(self, data, status_code=200):
        """Gửi response JSON"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

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