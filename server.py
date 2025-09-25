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
import uuid
import mimetypes
import cgi

# Set the port
PORT = 12000

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

def get_country_by_id(country_id):
    """Lấy thông tin quốc gia theo ID"""
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM countries WHERE id = ?", (country_id,))
        row = cur.fetchone()
        return dict(row) if row else None
    except Exception as e:
        print(f"Error getting country by ID: {e}")
        return None
    finally:
        conn.close()

def save_country(country_data):
    """Lưu thông tin quốc gia (thêm mới hoặc cập nhật)"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        
        if 'id' in country_data and country_data['id']:
            # Cập nhật quốc gia hiện có
            cur.execute("""
                UPDATE countries SET
                    name = ?, flag_url = ?, job_count = ?, status = ?
                WHERE id = ?
            """, (
                country_data.get('name'), country_data.get('flag_url'),
                country_data.get('job_count', 0), country_data.get('status', 'active'),
                country_data['id']
            ))
        else:
            # Thêm quốc gia mới
            cur.execute("""
                INSERT INTO countries (name, flag_url, job_count, status, created_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, (
                country_data.get('name'), country_data.get('flag_url'),
                country_data.get('job_count', 0), country_data.get('status', 'active')
            ))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving country: {e}")
        return False
    finally:
        conn.close()

def delete_country(country_id):
    """Xóa quốc gia"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM countries WHERE id = ?", (country_id,))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error deleting country: {e}")
        return False
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
    """Lưu thông tin job (thêm mới hoặc cập nhật) với đầy đủ các trường chi tiết"""
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
                    job_code = ?, location = ?, company = ?, quantity = ?,
                    gender_requirement = ?, age_min = ?, age_max = ?, work_hours = ?,
                    overtime_pay = ?, accommodation = ?, meals = ?, insurance = ?,
                    contract_duration = ?, job_description = ?, job_requirements = ?,
                    benefits = ?, working_conditions = ?, application_process = ?,
                    documents_required = ?, training_provided = ?, language_requirement = ?,
                    additional_notes = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            """, (
                job_data.get('title'), job_data.get('country'), job_data.get('country_flag'),
                job_data.get('salary_amount'), job_data.get('salary_currency'), job_data.get('salary_period'),
                job_data.get('requirements'), job_data.get('deadline'), job_data.get('image_url'),
                job_data.get('status_badge'), job_data.get('consultant_name'), job_data.get('consultant_phone'),
                job_data.get('consultant_zalo'), job_data.get('consultant_facebook'), job_data.get('view_count'),
                job_data.get('is_active', 1),
                # New detailed fields
                job_data.get('job_code'), job_data.get('location'), job_data.get('company'), 
                job_data.get('quantity'), job_data.get('gender_requirement'), job_data.get('age_min'),
                job_data.get('age_max'), job_data.get('work_hours'), job_data.get('overtime_pay'),
                job_data.get('accommodation'), job_data.get('meals'), job_data.get('insurance'),
                job_data.get('contract_duration'), job_data.get('job_description'), job_data.get('job_requirements'),
                job_data.get('benefits'), job_data.get('working_conditions'), job_data.get('application_process'),
                job_data.get('documents_required'), job_data.get('training_provided'), job_data.get('language_requirement'),
                job_data.get('additional_notes'), job_data['id']
            ))
        else:
            # Thêm job mới
            cur.execute("""
                INSERT INTO jobs (
                    title, country, country_flag, salary_amount, salary_currency, salary_period,
                    requirements, deadline, image_url, status_badge, consultant_name,
                    consultant_phone, consultant_zalo, consultant_facebook, view_count, is_active,
                    job_code, location, company, quantity, gender_requirement, age_min, age_max,
                    work_hours, overtime_pay, accommodation, meals, insurance, contract_duration,
                    job_description, job_requirements, benefits, working_conditions, application_process,
                    documents_required, training_provided, language_requirement, additional_notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                job_data.get('title'), job_data.get('country'), job_data.get('country_flag'),
                job_data.get('salary_amount'), job_data.get('salary_currency'), job_data.get('salary_period'),
                job_data.get('requirements'), job_data.get('deadline'), job_data.get('image_url'),
                job_data.get('status_badge'), job_data.get('consultant_name'), job_data.get('consultant_phone'),
                job_data.get('consultant_zalo'), job_data.get('consultant_facebook'), 
                job_data.get('view_count', 0), job_data.get('is_active', 1),
                # New detailed fields
                job_data.get('job_code'), job_data.get('location'), job_data.get('company'), 
                job_data.get('quantity'), job_data.get('gender_requirement'), job_data.get('age_min'),
                job_data.get('age_max'), job_data.get('work_hours'), job_data.get('overtime_pay'),
                job_data.get('accommodation'), job_data.get('meals'), job_data.get('insurance'),
                job_data.get('contract_duration'), job_data.get('job_description'), job_data.get('job_requirements'),
                job_data.get('benefits'), job_data.get('working_conditions'), job_data.get('application_process'),
                job_data.get('documents_required'), job_data.get('training_provided'), job_data.get('language_requirement'),
                job_data.get('additional_notes')
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
        cur.execute("SELECT COUNT(*) FROM jobs")
        total_jobs = cur.fetchone()[0]
        
        # Đếm hồ sơ ứng tuyển
        cur.execute("SELECT COUNT(*) FROM applications")
        total_applications = cur.fetchone()[0]
        
        # Đếm quốc gia
        cur.execute("SELECT COUNT(*) FROM countries")
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

def handle_image_upload(file_data, filename):
    """Xử lý upload hình ảnh"""
    try:
        # Tạo thư mục uploads nếu chưa có
        uploads_dir = Path('images/uploads')
        uploads_dir.mkdir(parents=True, exist_ok=True)
        
        # Tạo tên file unique
        file_extension = Path(filename).suffix.lower()
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = uploads_dir / unique_filename
        
        # Lưu file
        with open(file_path, 'wb') as f:
            f.write(file_data)
        
        # Trả về URL của file
        return f"/images/uploads/{unique_filename}"
        
    except Exception as e:
        print(f"Error uploading image: {e}")
        return None

def is_valid_image_type(filename):
    """Kiểm tra loại file hình ảnh hợp lệ"""
    valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    return Path(filename).suffix.lower() in valid_extensions

def save_customer_registration(customer_data):
    """Lưu thông tin đăng ký khách hàng"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO customer_registrations 
            (full_name, phone, email, age, gender, province, country, industry, experience, notes, form_type, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        """, (
            customer_data.get('fullName') or customer_data.get('name'),
            customer_data.get('phone'),
            customer_data.get('email'),
            customer_data.get('age'),
            customer_data.get('gender'),
            customer_data.get('province'),
            customer_data.get('country'),
            customer_data.get('industry'),
            customer_data.get('experience'),
            customer_data.get('notes'),
            customer_data.get('form_type', 'consultation')
        ))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving customer registration: {e}")
        return False
    finally:
        conn.close()

def get_customer_registrations():
    """Lấy danh sách đăng ký khách hàng"""
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT * FROM customer_registrations 
            ORDER BY created_at DESC
        """)
        return [dict(row) for row in cur.fetchall()]
    except Exception as e:
        print(f"Error getting customer registrations: {e}")
        return []
    finally:
        conn.close()

def delete_customer_registration(registration_id):
    """Xóa đăng ký khách hàng"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM customer_registrations WHERE id = ?", (registration_id,))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error deleting customer registration: {e}")
        return False
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
        elif self.path == '/api/customer-registration':
            self.handle_customer_registration()
        elif self.path.startswith('/api/admin/content/'):
            self.handle_save_content()
        elif self.path == '/api/admin/jobs':
            self.handle_save_job()
        elif self.path == '/api/admin/countries':
            self.handle_save_country()
        elif self.path == '/api/admin/upload-image':
            self.handle_image_upload_request()
        elif self.path == '/api/admin/upload-logo':
            self.handle_logo_upload_request()
        elif self.path == '/api/admin/upload-banner':
            self.handle_banner_upload_request()
        else:
            self.send_error(404)
    
    def do_GET(self):
        """Handle GET requests"""
        if self.path.startswith('/api/admin/content/'):
            self.handle_get_content()
        elif self.path == '/api/admin/countries':
            self.send_json_response(get_countries_data())
        elif self.path.startswith('/api/admin/countries/'):
            # Get country by ID: /api/admin/countries/123
            country_id = self.path.split('/')[-1]
            try:
                country_id = int(country_id)
                country = get_country_by_id(country_id)
                if country:
                    self.send_json_response(country)
                else:
                    self.send_json_response({'error': 'Country not found'}, 404)
            except ValueError:
                self.send_json_response({'error': 'Invalid country ID'}, 400)
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
        elif self.path == '/api/admin/customer-registrations':
            self.send_json_response(get_customer_registrations())
        elif self.path == '/api/admin/dashboard/stats':
            self.send_json_response(get_dashboard_stats())
        else:
            # Serve index.html for root path
            if self.path == '/':
                self.path = '/index.html'
            return super().do_GET()

    def do_DELETE(self):
        """Handle DELETE requests"""
        if self.path.startswith('/api/admin/countries/'):
            # Delete country by ID: /api/admin/countries/123
            country_id = self.path.split('/')[-1]
            try:
                country_id = int(country_id)
                if delete_country(country_id):
                    self.send_json_response({'success': True, 'message': 'Country deleted successfully'})
                else:
                    self.send_json_response({'success': False, 'message': 'Failed to delete country'}, 500)
            except ValueError:
                self.send_json_response({'error': 'Invalid country ID'}, 400)
        elif self.path.startswith('/api/admin/jobs/'):
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
        elif self.path.startswith('/api/admin/customer-registrations/'):
            # Delete customer registration by ID: /api/admin/customer-registrations/123
            registration_id = self.path.split('/')[-1]
            try:
                registration_id = int(registration_id)
                if delete_customer_registration(registration_id):
                    self.send_json_response({'success': True, 'message': 'Customer registration deleted successfully'})
                else:
                    self.send_json_response({'success': False, 'message': 'Failed to delete customer registration'}, 500)
            except ValueError:
                self.send_json_response({'error': 'Invalid registration ID'}, 400)
        else:
            self.send_error(404)

    def do_PUT(self):
        """Xử lý PUT requests"""
        if self.path.startswith('/api/admin/jobs/'):
            # Update job by ID: /api/admin/jobs/123
            job_id = self.path.split('/')[-1]
            try:
                job_id = int(job_id)
                
                # Read request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                job_data = json.loads(post_data.decode('utf-8'))
                
                # Add job ID to data
                job_data['id'] = job_id
                
                # Save job
                if save_job(job_data):
                    self.send_json_response({'success': True, 'message': 'Job updated successfully'})
                else:
                    self.send_json_response({'success': False, 'message': 'Failed to update job'}, 500)
                    
            except ValueError:
                self.send_json_response({'error': 'Invalid job ID'}, 400)
            except json.JSONDecodeError:
                self.send_json_response({'error': 'Invalid JSON data'}, 400)
            except Exception as e:
                print(f"Error updating job: {e}")
                self.send_json_response({'error': 'Internal server error'}, 500)
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

    def handle_customer_registration(self):
        """Xử lý đăng ký khách hàng"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Validate required fields
            required_fields = ['phone', 'age', 'gender']
            name_field = data.get('fullName') or data.get('name')
            
            if not name_field:
                self.send_json_response({'success': False, 'message': 'Họ và tên là bắt buộc'})
                return
                
            for field in required_fields:
                if not data.get(field):
                    field_names = {
                        'phone': 'Số điện thoại',
                        'age': 'Tuổi', 
                        'gender': 'Giới tính'
                    }
                    self.send_json_response({'success': False, 'message': f'{field_names[field]} là bắt buộc'})
                    return
            
            # Validate phone number format
            import re
            phone = data.get('phone', '').replace(' ', '').replace('-', '')
            phone_pattern = r'^(0|\+84)[3|5|7|8|9][0-9]{8}$'
            if not re.match(phone_pattern, phone):
                self.send_json_response({'success': False, 'message': 'Số điện thoại không hợp lệ'})
                return
            
            # Validate email if provided
            email = data.get('email')
            if email:
                email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
                if not re.match(email_pattern, email):
                    self.send_json_response({'success': False, 'message': 'Email không hợp lệ'})
                    return
            
            # Save to database
            if save_customer_registration(data):
                self.send_json_response({
                    'success': True, 
                    'message': 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.'
                })
            else:
                self.send_json_response({'success': False, 'message': 'Lỗi khi lưu thông tin. Vui lòng thử lại.'})
                
        except json.JSONDecodeError:
            self.send_json_response({'success': False, 'message': 'Dữ liệu không hợp lệ'})
        except Exception as e:
            print(f"Customer registration error: {e}")
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

    def handle_save_country(self):
        """Xử lý lưu thông tin quốc gia"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if save_country(data):
                self.send_json_response({'success': True, 'message': 'Lưu quốc gia thành công'})
            else:
                self.send_json_response({'success': False, 'message': 'Lỗi khi lưu quốc gia'})
                
        except Exception as e:
            print(f"Save country error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'})

    def handle_image_upload_request(self):
        """Xử lý upload hình ảnh"""
        try:
            # Parse multipart form data
            content_type = self.headers.get('Content-Type', '')
            if not content_type.startswith('multipart/form-data'):
                self.send_json_response({'success': False, 'message': 'Invalid content type'}, 400)
                return
            
            # Get content length
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_json_response({'success': False, 'message': 'No data received'}, 400)
                return
            
            # Read the form data
            form_data = self.rfile.read(content_length)
            
            # Parse multipart data
            boundary = content_type.split('boundary=')[1].encode()
            parts = form_data.split(b'--' + boundary)
            
            for part in parts:
                if b'Content-Disposition: form-data' in part and b'filename=' in part:
                    # Extract filename
                    lines = part.split(b'\r\n')
                    for line in lines:
                        if b'Content-Disposition' in line:
                            filename_start = line.find(b'filename="') + 10
                            filename_end = line.find(b'"', filename_start)
                            filename = line[filename_start:filename_end].decode('utf-8')
                            break
                    
                    # Validate file type
                    if not is_valid_image_type(filename):
                        self.send_json_response({
                            'success': False, 
                            'message': 'Loại file không hợp lệ. Chỉ chấp nhận JPG, PNG, GIF, WebP'
                        }, 400)
                        return
                    
                    # Extract file data
                    file_data_start = part.find(b'\r\n\r\n') + 4
                    file_data = part[file_data_start:-2]  # Remove trailing \r\n
                    
                    # Check file size (max 5MB)
                    if len(file_data) > 5 * 1024 * 1024:
                        self.send_json_response({
                            'success': False, 
                            'message': 'Kích thước file không được vượt quá 5MB'
                        }, 400)
                        return
                    
                    # Upload file
                    image_url = handle_image_upload(file_data, filename)
                    if image_url:
                        self.send_json_response({
                            'success': True, 
                            'message': 'Upload thành công',
                            'image_url': image_url
                        })
                    else:
                        self.send_json_response({
                            'success': False, 
                            'message': 'Lỗi khi lưu file'
                        }, 500)
                    return
            
            self.send_json_response({'success': False, 'message': 'Không tìm thấy file'}, 400)
            
        except Exception as e:
            print(f"Image upload error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server'}, 500)

    def handle_logo_upload_request(self):
        """Xử lý upload logo riêng biệt"""
        try:
            # Parse multipart form data
            content_type = self.headers.get('Content-Type', '')
            if not content_type.startswith('multipart/form-data'):
                self.send_json_response({'success': False, 'message': 'Invalid content type'}, 400)
                return

            # Get content length
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_json_response({'success': False, 'message': 'No data received'}, 400)
                return

            # Read the form data
            form_data = self.rfile.read(content_length)

            # Parse multipart data
            boundary = content_type.split('boundary=')[1].encode()
            parts = form_data.split(b'--' + boundary)

            for part in parts:
                if b'Content-Disposition: form-data' in part and b'filename=' in part:
                    # Extract filename
                    lines = part.split(b'\r\n')
                    for line in lines:
                        if b'Content-Disposition' in line:
                            filename_start = line.find(b'filename="') + 10
                            filename_end = line.find(b'"', filename_start)
                            filename = line[filename_start:filename_end].decode('utf-8')
                            break

                    # Validate file type
                    if not is_valid_image_type(filename):
                        self.send_json_response({
                            'success': False,
                            'message': 'Loại file không hợp lệ. Chỉ chấp nhận JPG, PNG, GIF, WebP'
                        }, 400)
                        return

                    # Extract file data
                    file_data_start = part.find(b'\r\n\r\n') + 4
                    file_data = part[file_data_start:-2]  # Remove trailing \r\n

                    # Check file size (max 5MB)
                    if len(file_data) > 5 * 1024 * 1024:
                        self.send_json_response({
                            'success': False,
                            'message': 'Kích thước file không được vượt quá 5MB'
                        }, 400)
                        return

                    # Upload logo với prefix đặc biệt
                    logo_filename = f"logo_{filename}"
                    image_url = handle_image_upload(file_data, logo_filename)
                    if image_url:
                        self.send_json_response({
                            'success': True,
                            'message': 'Upload logo thành công',
                            'image_url': image_url,
                            'type': 'logo'
                        })
                    else:
                        self.send_json_response({
                            'success': False,
                            'message': 'Lỗi khi lưu logo'
                        }, 500)
                    return

            self.send_json_response({'success': False, 'message': 'Không tìm thấy file logo'}, 400)

        except Exception as e:
            print(f"Logo upload error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server khi upload logo'}, 500)

    def handle_banner_upload_request(self):
        """Xử lý upload banner riêng biệt"""
        try:
            # Parse multipart form data
            content_type = self.headers.get('Content-Type', '')
            if not content_type.startswith('multipart/form-data'):
                self.send_json_response({'success': False, 'message': 'Invalid content type'}, 400)
                return

            # Get content length
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_json_response({'success': False, 'message': 'No data received'}, 400)
                return

            # Read the form data
            form_data = self.rfile.read(content_length)

            # Parse multipart data
            boundary = content_type.split('boundary=')[1].encode()
            parts = form_data.split(b'--' + boundary)

            for part in parts:
                if b'Content-Disposition: form-data' in part and b'filename=' in part:
                    # Extract filename
                    lines = part.split(b'\r\n')
                    for line in lines:
                        if b'Content-Disposition' in line:
                            filename_start = line.find(b'filename="') + 10
                            filename_end = line.find(b'"', filename_start)
                            filename = line[filename_start:filename_end].decode('utf-8')
                            break

                    # Validate file type
                    if not is_valid_image_type(filename):
                        self.send_json_response({
                            'success': False,
                            'message': 'Loại file không hợp lệ. Chỉ chấp nhận JPG, PNG, GIF, WebP'
                        }, 400)
                        return

                    # Extract file data
                    file_data_start = part.find(b'\r\n\r\n') + 4
                    file_data = part[file_data_start:-2]  # Remove trailing \r\n

                    # Check file size (max 5MB)
                    if len(file_data) > 5 * 1024 * 1024:
                        self.send_json_response({
                            'success': False,
                            'message': 'Kích thước file không được vượt quá 5MB'
                        }, 400)
                        return

                    # Upload banner với prefix đặc biệt
                    banner_filename = f"banner_{filename}"
                    image_url = handle_image_upload(file_data, banner_filename)
                    if image_url:
                        self.send_json_response({
                            'success': True,
                            'message': 'Upload banner thành công',
                            'image_url': image_url,
                            'type': 'banner'
                        })
                    else:
                        self.send_json_response({
                            'success': False,
                            'message': 'Lỗi khi lưu banner'
                        }, 500)
                    return

            self.send_json_response({'success': False, 'message': 'Không tìm thấy file banner'}, 400)

        except Exception as e:
            print(f"Banner upload error: {e}")
            self.send_json_response({'success': False, 'message': 'Lỗi server khi upload banner'}, 500)

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