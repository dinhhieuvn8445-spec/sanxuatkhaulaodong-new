#!/usr/bin/env python3
"""
Script to create SQLite database for content management
"""

import sqlite3
import json
import os

def create_database():
    """Tạo database SQLite và các bảng cần thiết"""
    try:
        # Tạo database
        conn = sqlite3.connect('admin_content.db')
        cur = conn.cursor()
        
        # Tạo bảng users
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                is_admin BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Tạo bảng page_content
        cur.execute("""
            CREATE TABLE IF NOT EXISTS page_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                page_name TEXT UNIQUE NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Chèn dữ liệu mẫu cho các trang
        sample_data = [
            ('home', {
                'title': 'Dịch vụ xuất khẩu lao động uy tín',
                'subtitle': 'Dịch vụ làm nail và nối mi chuyên nghiệp - HỆ THỐNG HOẠT ĐỘNG TỐT!',
                'description': 'chúng tôi chuyên bán thịt chó',
                'buttonText': 'Đặt lịch ngay',
                'buttonLink': 'Xem dịch vụ'
            }),
            ('about', {
                'title': 'Về chúng tôi - Dương Oanh XKLĐ',
                'intro': 'Công ty chúng tôi chuyên cung cấp dịch vụ xuất khẩu lao động chất lượng cao, uy tín và đáng tin cậy.',
                'history': 'Được thành lập từ năm 2010, chúng tôi đã có hơn 13 năm kinh nghiệm trong lĩnh vực xuất khẩu lao động.',
                'mission': 'Sứ mệnh của chúng tôi là kết nối lao động Việt Nam với các cơ hội việc làm tốt nhất trên thế giới.',
                'vision': 'Tầm nhìn của chúng tôi là trở thành công ty xuất khẩu lao động hàng đầu Việt Nam.'
            }),
            ('guide', {
                'title': 'Hướng dẫn xuất khẩu lao động',
                'intro': 'Quy trình xuất khẩu lao động gồm các bước cơ bản sau đây, được thực hiện một cách chuyên nghiệp và minh bạch.',
                'steps': 'Bước 1: Đăng ký hồ sơ và tư vấn\nBước 2: Khám sức khỏe và làm hồ sơ y tế\nBước 3: Học nghề và đào tạo kỹ năng\nBước 4: Phỏng vấn với nhà tuyển dụng\nBước 5: Làm thủ tục visa và xuất cảnh',
                'requirements': 'Hộ chiếu còn hạn ít nhất 6 tháng\nBằng cấp học vấn (tối thiểu THCS)\nGiấy khám sức khỏe tổng quát\nGiấy chứng nhận không có tiền án tiền sự\nSơ yếu lý lịch có xác nhận',
                'notes': 'Lưu ý quan trọng: Tất cả giấy tờ phải được công chứng và hợp pháp hóa lãnh sự. Thời gian làm hồ sơ từ 3-6 tháng tùy theo quốc gia.'
            }),
            ('consultation', {
                'title': 'Tư vấn xuất khẩu lao động',
                'intro': 'Chúng tôi cung cấp dịch vụ tư vấn chuyên nghiệp, miễn phí cho tất cả ứng viên có nhu cầu xuất khẩu lao động.',
                'services': 'Tư vấn chọn nghề phù hợp với năng lực\nTư vấn chọn quốc gia và thị trường lao động\nTư vấn hồ sơ và thủ tục pháp lý\nTư vấn chi phí và thời gian\nHỗ trợ học nghề và ngoại ngữ',
                'contact': 'Hotline: 0123.456.789 (24/7)\nEmail: tuvandoanhxkld@gmail.com\nĐịa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM\nZalo: 0123456789',
                'faq': 'Q: Thời gian làm hồ sơ xuất khẩu lao động bao lâu?\nA: Thường từ 3-6 tháng tùy theo quốc gia và nghề nghiệp.\n\nQ: Chi phí xuất khẩu lao động là bao nhiêu?\nA: Chi phí dao động từ 80-150 triệu VNĐ tùy theo quốc gia.\n\nQ: Có cần biết ngoại ngữ không?\nA: Tùy theo công việc, một số nghề yêu cầu giao tiếp cơ bản.'
            })
        ]
        
        # Chèn dữ liệu mẫu
        for page_name, content in sample_data:
            cur.execute("""
                INSERT OR REPLACE INTO page_content (page_name, content, updated_at)
                VALUES (?, ?, CURRENT_TIMESTAMP)
            """, (page_name, json.dumps(content, ensure_ascii=False)))
        
        # Tạo user admin mặc định
        import bcrypt
        password_hash = bcrypt.hashpw('123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        cur.execute("""
            INSERT OR REPLACE INTO users (username, password_hash, is_admin)
            VALUES (?, ?, ?)
        """, ('duongoanh', password_hash, True))
        
        conn.commit()
        print("✅ Tạo database SQLite thành công!")
        print("✅ Đã chèn dữ liệu mẫu cho các trang!")
        print("✅ Tạo user admin (username: duongoanh, password: 123)")
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo database: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

if __name__ == "__main__":
    create_database()