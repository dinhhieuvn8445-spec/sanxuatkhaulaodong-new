#!/usr/bin/env python3
"""
Script to create content management tables for the admin dashboard
"""

import psycopg2
import sys

def create_content_tables():
    """Tạo các bảng để quản lý nội dung trang web"""
    try:
        # Kết nối database
        conn = psycopg2.connect(
            host="localhost",
            database="sanxuatkhaulaodong",
            user="postgres",
            password="postgres"
        )
        cur = conn.cursor()
        
        # Tạo bảng page_content để lưu nội dung các trang
        cur.execute("""
            CREATE TABLE IF NOT EXISTS page_content (
                id SERIAL PRIMARY KEY,
                page_name VARCHAR(50) NOT NULL UNIQUE,
                content JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Tạo trigger để tự động cập nhật updated_at
        cur.execute("""
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        """)
        
        cur.execute("""
            DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
            CREATE TRIGGER update_page_content_updated_at
                BEFORE UPDATE ON page_content
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
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
                INSERT INTO page_content (page_name, content)
                VALUES (%s, %s)
                ON CONFLICT (page_name) DO UPDATE SET
                content = EXCLUDED.content,
                updated_at = CURRENT_TIMESTAMP
            """, (page_name, psycopg2.extras.Json(content)))
        
        conn.commit()
        print("✅ Tạo bảng content thành công!")
        print("✅ Đã chèn dữ liệu mẫu cho các trang!")
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo bảng: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

if __name__ == "__main__":
    create_content_tables()