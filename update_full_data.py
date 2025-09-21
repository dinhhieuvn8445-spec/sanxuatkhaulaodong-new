#!/usr/bin/env python3
"""
Script to update database with comprehensive data for countries, jobs, and orders
"""

import sqlite3
import json
import random
from datetime import datetime, timedelta

def update_full_database():
    """Cập nhật database với dữ liệu đầy đủ"""
    try:
        # Kết nối database
        conn = sqlite3.connect('admin_content.db')
        cur = conn.cursor()
        
        # Xóa dữ liệu cũ
        cur.execute("DELETE FROM countries")
        cur.execute("DELETE FROM jobs")
        cur.execute("DELETE FROM orders")
        cur.execute("DELETE FROM applications")
        cur.execute("DELETE FROM partners")
        
        # Danh sách đầy đủ các quốc gia từ trang chủ
        countries_data = [
            # Châu Á - Thái Bình Dương
            ('TTS Nhật Bản', '/images/flags/japan.png'),
            ('Kỹ sư Nhật Bản', '/images/flags/japan.png'),
            ('Tokutei Nhật', '/images/flags/japan.png'),
            ('Đài Loan', '/images/flags/taiwan.png'),
            ('Kỹ sư Đài Loan', '/images/flags/taiwan.png'),
            ('Singapore', '/images/flags/singapore.png'),
            ('Trung Quốc', '/images/flags/china.png'),
            ('Hàn Quốc', '/images/flags/korea.png'),
            ('Malaysia', '/images/flags/malaysia.png'),
            ('Thái Lan', '/images/flags/thailand.png'),
            ('Philippines', '/images/flags/philippines.png'),
            ('Indonesia', '/images/flags/indonesia.png'),
            ('Úc', '/images/flags/australia.png'),
            ('New Zealand', '/images/flags/newzealand.png'),
            
            # Châu Âu
            ('Đức', '/images/flags/germany.png'),
            ('Pháp', '/images/flags/france.png'),
            ('Anh', '/images/flags/uk.png'),
            ('Ý', '/images/flags/italy.png'),
            ('Tây Ban Nha', '/images/flags/spain.png'),
            ('Hà Lan', '/images/flags/netherlands.png'),
            ('Bỉ', '/images/flags/belgium.png'),
            ('Thụy Sĩ', '/images/flags/switzerland.png'),
            ('Áo', '/images/flags/austria.png'),
            ('Thụy Điển', '/images/flags/sweden.png'),
            ('Na Uy', '/images/flags/norway.png'),
            ('Đan Mạch', '/images/flags/denmark.png'),
            ('Phần Lan', '/images/flags/finland.png'),
            ('Ireland', '/images/flags/ireland.png'),
            ('Ba Lan', '/images/flags/poland.png'),
            ('Séc', '/images/flags/czech.png'),
            ('Slovakia', '/images/flags/slovakia.png'),
            ('Hungary', '/images/flags/hungary.png'),
            ('Rumani', '/images/flags/romania.png'),
            ('Bulgaria', '/images/flags/bulgaria.png'),
            ('Croatia', '/images/flags/croatia.png'),
            ('Serbia', '/images/flags/serbia.png'),
            ('Hy Lạp', '/images/flags/greece.png'),
            ('Estonia', '/images/flags/estonia.png'),
            ('Latvia', '/images/flags/latvia.png'),
            ('Litva', '/images/flags/lithuania.png'),
            ('Albania', '/images/flags/albania.png'),
            
            # Châu Mỹ
            ('Hoa Kỳ', '/images/flags/usa.png'),
            ('Canada', '/images/flags/canada.png'),
            ('Mexico', '/images/flags/mexico.png'),
            ('Brazil', '/images/flags/brazil.png'),
            ('Argentina', '/images/flags/argentina.png'),
            ('Chile', '/images/flags/chile.png'),
            
            # Châu Phi & Trung Đông
            ('Ả Rập Xê Út', '/images/flags/saudi.png'),
            ('UAE', '/images/flags/uae.png'),
            ('Dubai', '/images/flags/uae.png'),
            ('Qatar', '/images/flags/qatar.png'),
            ('Kuwait', '/images/flags/kuwait.png'),
            ('Algeria', '/images/flags/algeria.png'),
            ('Nam Phi', '/images/flags/southafrica.png'),
            
            # Châu Âu Đông
            ('Nga', '/images/flags/russia.png'),
            ('Ukraine', '/images/flags/ukraine.png'),
            ('Belarus', '/images/flags/belarus.png'),
            
            # Khác
            ('Nước khác', '/images/flags/other.png')
        ]
        
        # Thêm các quốc gia
        for name, flag in countries_data:
            job_count = random.randint(0, 25)
            status = 'active' if job_count > 0 else 'inactive'
            cur.execute("""
                INSERT INTO countries (name, flag_url, job_count, status)
                VALUES (?, ?, ?, ?)
            """, (name, flag, job_count, status))
        
        # Lấy danh sách country_id
        cur.execute("SELECT id, name FROM countries WHERE job_count > 0")
        active_countries = cur.fetchall()
        
        # Danh sách ngành nghề
        job_categories = [
            'Công xưởng', 'Chế biến thực phẩm', 'Cơ khí', 'Điện tử', 'Xây dựng',
            'Nông nghiệp', 'May mặc', 'Da giày', 'Gỗ nội thất', 'Thủy sản',
            'Y tế - Dược phẩm', 'Chăm sóc người già', 'Nhà hàng - Khách sạn',
            'Làm đẹp - Spa', 'Giáo dục - Đào tạo', 'Vận tải - Logistics',
            'Bán hàng - Thương mại', 'Công nghệ thông tin', 'Tài chính - Ngân hàng',
            'Bảo hiểm', 'Bất động sản', 'Marketing - Quảng cáo', 'Thiết kế đồ họa',
            'Kiểm tra chất lượng', 'Bảo vệ - An ninh', 'Làm sạch - Vệ sinh',
            'Thú y', 'Làm vườn', 'Sửa chữa - Bảo dưỡng', 'Điện lạnh',
            'Hàn - Cắt kim loại', 'Sơn - Phủ mặt', 'Nhựa - Cao su', 'Hóa chất',
            'Dầu khí', 'Khai thác mỏ', 'In ấn - Xuất bản', 'Giải trí - Thể thao',
            'Du lịch', 'Môi trường', 'Năng lượng tái tạo', 'Hàng không', 'Hàng hải'
        ]
        
        # Tạo việc làm cho từng quốc gia
        job_titles = [
            'Công nhân sản xuất', 'Thợ hàn', 'Thợ cơ khí', 'Công nhân xây dựng',
            'Nhân viên chế biến thực phẩm', 'Công nhân may mặc', 'Thợ điện',
            'Nhân viên khách sạn', 'Phục vụ nhà hàng', 'Lái xe', 'Bảo vệ',
            'Nhân viên vệ sinh', 'Thợ sửa chữa', 'Công nhân nông nghiệp',
            'Nhân viên chăm sóc người già', 'Kỹ thuật viên', 'Thợ mộc',
            'Công nhân da giày', 'Nhân viên kho', 'Tài xế giao hàng',
            'Nhân viên bán hàng', 'Thợ sơn', 'Công nhân điện tử',
            'Nhân viên y tế', 'Giáo viên', 'Kế toán', 'Thông dịch viên',
            'Hướng dẫn viên du lịch', 'Nhân viên IT', 'Thiết kế đồ họa'
        ]
        
        total_jobs = 0
        for country_id, country_name in active_countries:
            num_jobs = random.randint(1, 15)
            for i in range(num_jobs):
                title = f"{random.choice(job_titles)} tại {country_name}"
                category = random.choice(job_categories)
                
                # Tạo mức lương theo quốc gia
                if 'Nhật' in country_name:
                    salary = f"{random.randint(25, 45)} triệu VNĐ"
                elif 'Hàn Quốc' in country_name:
                    salary = f"{random.randint(20, 35)} triệu VNĐ"
                elif 'Đài Loan' in country_name:
                    salary = f"{random.randint(18, 30)} triệu VNĐ"
                elif country_name in ['Đức', 'Úc', 'Canada', 'Thụy Sĩ']:
                    salary = f"{random.randint(35, 60)} triệu VNĐ"
                elif country_name in ['Nga', 'Ba Lan', 'Hungary']:
                    salary = f"{random.randint(15, 25)} triệu VNĐ"
                else:
                    salary = f"{random.randint(12, 40)} triệu VNĐ"
                
                # Tạo deadline
                deadline = datetime.now() + timedelta(days=random.randint(30, 180))
                
                description = f"Tuyển dụng {title.lower()} với mức lương hấp dẫn. Yêu cầu có kinh nghiệm làm việc trong ngành {category.lower()}."
                requirements = "- Tuổi từ 20-40\n- Sức khỏe tốt\n- Có kinh nghiệm làm việc\n- Có thể làm việc ca đêm\n- Chịu được áp lực công việc"
                
                status = random.choice(['active', 'active', 'active', 'inactive'])  # 75% active
                
                cur.execute("""
                    INSERT INTO jobs (title, country_id, salary_range, description, requirements, deadline, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (title, country_id, salary, description, requirements, deadline.strftime('%Y-%m-%d'), status))
                
                total_jobs += 1
        
        # Cập nhật lại job_count cho countries
        cur.execute("""
            UPDATE countries SET job_count = (
                SELECT COUNT(*) FROM jobs WHERE jobs.country_id = countries.id AND jobs.status = 'active'
            )
        """)
        
        # Tạo đơn hàng
        services = [
            'Tư vấn XKLĐ Nhật Bản', 'Tư vấn XKLĐ Hàn Quốc', 'Tư vấn XKLĐ Đài Loan',
            'Làm hồ sơ XKLĐ', 'Dịch thuật hồ sơ', 'Khám sức khỏe XKLĐ',
            'Học tiếng Nhật', 'Học tiếng Hàn', 'Học tiếng Trung',
            'Tư vấn visa', 'Làm hộ chiếu', 'Bảo hiểm XKLĐ',
            'Đào tạo kỹ năng', 'Tư vấn pháp lý', 'Hỗ trợ định cư'
        ]
        
        customer_names = [
            'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung',
            'Hoàng Văn Em', 'Vũ Thị Phương', 'Đặng Văn Giang', 'Bùi Thị Hoa',
            'Ngô Văn Inh', 'Lý Thị Kim', 'Đinh Văn Long', 'Tạ Thị Mai',
            'Dương Văn Nam', 'Cao Thị Oanh', 'Phan Văn Phúc', 'Lưu Thị Quỳnh',
            'Trịnh Văn Sơn', 'Hồ Thị Tâm', 'Võ Văn Uy', 'Đỗ Thị Vân'
        ]
        
        for i in range(150):  # Tạo 150 đơn hàng
            order_id = f"DH{str(i+1).zfill(4)}"
            customer = random.choice(customer_names)
            service = random.choice(services)
            amount = random.randint(1000000, 15000000)  # 1-15 triệu VNĐ
            
            # Tạo ngày tạo trong 6 tháng qua
            created_date = datetime.now() - timedelta(days=random.randint(1, 180))
            
            status = random.choice(['pending', 'processing', 'completed', 'cancelled'])
            
            # Email và phone
            email = f"{customer.lower().replace(' ', '').replace('ă', 'a').replace('â', 'a').replace('ê', 'e').replace('ô', 'o').replace('ư', 'u').replace('đ', 'd')}@gmail.com"
            phone = f"09{random.randint(10000000, 99999999)}"
            
            notes = f"Khách hàng quan tâm đến dịch vụ {service}. Đã tư vấn qua điện thoại."
            
            cur.execute("""
                INSERT INTO orders (id, customer_name, customer_email, customer_phone, service_type, amount, status, notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (order_id, customer, email, phone, service, amount, status, notes, created_date.strftime('%Y-%m-%d %H:%M:%S')))
        
        # Tạo hồ sơ ứng tuyển
        cur.execute("SELECT id, title FROM jobs WHERE status = 'active' LIMIT 50")
        active_jobs = cur.fetchall()
        
        applicant_names = [
            'Nguyễn Minh Anh', 'Trần Thị Bảo', 'Lê Văn Cường', 'Phạm Thị Diệu',
            'Hoàng Văn Đức', 'Vũ Thị Hương', 'Đặng Văn Hải', 'Bùi Thị Lan',
            'Ngô Văn Khoa', 'Lý Thị Linh', 'Đinh Văn Minh', 'Tạ Thị Nga',
            'Dương Văn Phong', 'Cao Thị Quỳnh', 'Phan Văn Sáng', 'Lưu Thị Thảo',
            'Trịnh Văn Tuấn', 'Hồ Thị Uyên', 'Võ Văn Vinh', 'Đỗ Thị Xuân'
        ]
        
        for i in range(200):  # Tạo 200 hồ sơ ứng tuyển
            if not active_jobs:
                break
                
            name = random.choice(applicant_names)
            job_id, job_title = random.choice(active_jobs)
            
            email = f"{name.lower().replace(' ', '').replace('ă', 'a').replace('â', 'a').replace('ê', 'e').replace('ô', 'o').replace('ư', 'u').replace('đ', 'd')}@gmail.com"
            phone = f"09{random.randint(10000000, 99999999)}"
            
            resume_url = f"/uploads/resumes/{name.replace(' ', '_').lower()}_cv.pdf"
            status = random.choice(['new', 'reviewing', 'approved', 'rejected'])
            
            created_date = datetime.now() - timedelta(days=random.randint(1, 90))
            notes = f"Ứng viên có kinh nghiệm làm việc trong ngành. Đã nộp hồ sơ cho vị trí {job_title}."
            
            cur.execute("""
                INSERT INTO applications (full_name, email, phone, job_id, resume_url, status, notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, email, phone, job_id, resume_url, status, notes, created_date.strftime('%Y-%m-%d %H:%M:%S')))
        
        # Thêm đối tác
        partners_data = [
            ('SULECO', '/images/logos/suleco.png', 'https://suleco.com.vn', 'Công ty Xuất khẩu Lao động SULECO'),
            ('ECOCOM', '/images/logos/ecocom.png', 'https://ecocom.com.vn', 'Công ty TNHH Xuất khẩu Lao động ECOCOM'),
            ('HTD Hà Nội', '/images/logos/htd.png', 'https://htd.com.vn', 'Công ty Cổ phần Xuất khẩu Lao động HTD'),
            ('ASIA', '/images/logos/asia.png', 'https://asia.com.vn', 'Công ty TNHH Xuất khẩu Lao động ASIA'),
            ('VIETGO', '/images/logos/vietgo.png', 'https://vietgo.com.vn', 'Công ty TNHH VIETGO'),
            ('GOLDEN GATE', '/images/logos/goldengate.png', 'https://goldengate.com.vn', 'Công ty TNHH Golden Gate'),
            ('SUNRISE', '/images/logos/sunrise.png', 'https://sunrise.com.vn', 'Công ty TNHH Sunrise'),
            ('PACIFIC', '/images/logos/pacific.png', 'https://pacific.com.vn', 'Công ty TNHH Pacific'),
            ('VIETNAM MANPOWER', '/images/logos/vnmanpower.png', 'https://vnmanpower.com', 'Công ty TNHH Vietnam Manpower'),
            ('GLOBAL LINK', '/images/logos/globallink.png', 'https://globallink.com.vn', 'Công ty TNHH Global Link')
        ]
        
        for name, logo, website, description in partners_data:
            status = random.choice(['active', 'active', 'inactive'])  # 67% active
            cur.execute("""
                INSERT INTO partners (name, logo_url, website, description, status)
                VALUES (?, ?, ?, ?, ?)
            """, (name, logo, website, description, status))
        
        conn.commit()
        
        # Thống kê
        cur.execute("SELECT COUNT(*) FROM countries")
        total_countries = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM countries WHERE status = 'active'")
        active_countries_count = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM jobs")
        total_jobs_count = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM jobs WHERE status = 'active'")
        active_jobs_count = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM orders")
        total_orders = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM applications")
        total_applications = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM partners")
        total_partners = cur.fetchone()[0]
        
        print("✅ Cập nhật database thành công!")
        print(f"📊 Thống kê:")
        print(f"   - Quốc gia: {total_countries} (Hoạt động: {active_countries_count})")
        print(f"   - Việc làm: {total_jobs_count} (Hoạt động: {active_jobs_count})")
        print(f"   - Đơn hàng: {total_orders}")
        print(f"   - Hồ sơ ứng tuyển: {total_applications}")
        print(f"   - Đối tác: {total_partners}")
        
    except Exception as e:
        print(f"❌ Lỗi khi cập nhật database: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

if __name__ == "__main__":
    update_full_database()