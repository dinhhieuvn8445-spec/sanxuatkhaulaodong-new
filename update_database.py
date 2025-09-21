#!/usr/bin/env python3
"""
Script to update SQLite database with new tables and data for enhanced admin features
"""

import sqlite3
import json
import os

def update_database():
    """Cập nhật database với các bảng và dữ liệu mới"""
    try:
        # Kết nối database
        conn = sqlite3.connect('admin_content.db')
        cur = conn.cursor()
        
        # Tạo bảng countries (quốc gia)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS countries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                flag_url TEXT,
                job_count INTEGER DEFAULT 0,
                status TEXT DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Tạo bảng jobs (việc làm)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                country_id INTEGER,
                salary_range TEXT,
                description TEXT,
                requirements TEXT,
                deadline DATE,
                status TEXT DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (country_id) REFERENCES countries (id)
            )
        """)
        
        # Tạo bảng orders (đơn hàng)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                customer_name TEXT NOT NULL,
                customer_email TEXT,
                customer_phone TEXT,
                service_type TEXT NOT NULL,
                amount DECIMAL(10,2),
                status TEXT DEFAULT 'pending',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Tạo bảng applications (hồ sơ ứng tuyển)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                job_id INTEGER,
                resume_url TEXT,
                status TEXT DEFAULT 'new',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (job_id) REFERENCES jobs (id)
            )
        """)
        
        # Tạo bảng partners (đối tác)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS partners (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                logo_url TEXT,
                website TEXT,
                description TEXT,
                status TEXT DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Thêm dữ liệu mẫu cho header
        header_data = {
            'logo': '/images/logos/duong-oanh-logo-new.svg',
            'companyName': 'Dương Oanh Xuất Khẩu Lao Động',
            'slogan': 'Uy tín - Chất lượng - Hiệu quả',
            'hotline': '0123.456.789',
            'email': 'info@duongoanh.com',
            'address': '123 Đường ABC, Quận XYZ, TP.HCM',
            'banner': '/images/banners/header-banner.jpg'
        }
        
        cur.execute("""
            INSERT OR REPLACE INTO page_content (page_name, content, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        """, ('header', json.dumps(header_data, ensure_ascii=False)))
        
        # Thêm dữ liệu mẫu cho footer
        footer_data = {
            'companyInfo': 'Công ty TNHH Dương Oanh chuyên cung cấp dịch vụ xuất khẩu lao động uy tín, chất lượng cao với hơn 10 năm kinh nghiệm.',
            'contact': 'Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM\nĐiện thoại: 0123.456.789\nEmail: info@duongoanh.com',
            'services': 'Xuất khẩu lao động Nhật Bản\nXuất khẩu lao động Hàn Quốc\nXuất khẩu lao động Đài Loan\nTư vấn và hỗ trợ',
            'social': '{"facebook": "https://facebook.com/duongoanh", "zalo": "0123456789", "youtube": "https://youtube.com/duongoanh"}',
            'copyright': '© 2024 Dương Oanh XKLĐ. Tất cả quyền được bảo lưu.'
        }
        
        cur.execute("""
            INSERT OR REPLACE INTO page_content (page_name, content, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        """, ('footer', json.dumps(footer_data, ensure_ascii=False)))
        
        # Thêm dữ liệu mẫu cho settings
        settings_data = {
            'siteName': 'Dương Oanh Xuất Khẩu Lao Động',
            'siteDescription': 'Công ty xuất khẩu lao động uy tín, chuyên cung cấp dịch vụ tư vấn và hỗ trợ xuất khẩu lao động sang Nhật Bản, Hàn Quốc, Đài Loan',
            'siteKeywords': 'xuất khẩu lao động, xklđ, việc làm nước ngoài, Nhật Bản, Hàn Quốc, Đài Loan',
            'maintenanceMode': '0',
            'analyticsCode': ''
        }
        
        cur.execute("""
            INSERT OR REPLACE INTO page_content (page_name, content, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
        """, ('settings', json.dumps(settings_data, ensure_ascii=False)))
        
        # Thêm dữ liệu mẫu cho countries
        countries_data = [
            ('Nhật Bản', '/images/flags/japan.png'),
            ('Hàn Quốc', '/images/flags/korea.png'),
            ('Đài Loan', '/images/flags/taiwan.png'),
            ('Singapore', '/images/flags/singapore.png'),
            ('Malaysia', '/images/flags/malaysia.png'),
            ('Úc', '/images/flags/australia.png'),
            ('Canada', '/images/flags/canada.png'),
            ('Đức', '/images/flags/germany.png')
        ]
        
        for name, flag in countries_data:
            cur.execute("""
                INSERT OR IGNORE INTO countries (name, flag_url, job_count, status)
                VALUES (?, ?, ?, 'active')
            """, (name, flag, 0))
        
        # Thêm dữ liệu mẫu cho partners
        partners_data = [
            ('Công ty ECOCOM', '/images/logos/ecocom.png', 'https://ecocom.com.vn'),
            ('Công ty SULECO', '/images/logos/suleco.png', 'https://suleco.com.vn'),
            ('Công ty HTD', '/images/logos/htd.png', 'https://htd.com.vn'),
            ('Công ty ASIA', '/images/logos/asia.png', 'https://asia.com.vn')
        ]
        
        for name, logo, website in partners_data:
            cur.execute("""
                INSERT OR IGNORE INTO partners (name, logo_url, website, status)
                VALUES (?, ?, ?, 'active')
            """, (name, logo, website))
        
        conn.commit()
        print("✅ Cập nhật database thành công!")
        print("✅ Đã thêm các bảng mới: countries, jobs, orders, applications, partners")
        print("✅ Đã thêm dữ liệu mẫu cho header, footer, settings")
        print("✅ Đã thêm dữ liệu mẫu cho countries và partners")
        
    except Exception as e:
        print(f"❌ Lỗi khi cập nhật database: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

if __name__ == "__main__":
    update_database()