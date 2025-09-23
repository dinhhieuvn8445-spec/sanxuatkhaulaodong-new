#!/usr/bin/env python3
"""
Script to update database with comprehensive list of countries for labor export
"""

import sqlite3
import json

def update_countries_database():
    """Cập nhật database với danh sách quốc gia đầy đủ cho xuất khẩu lao động"""
    try:
        # Kết nối database
        conn = sqlite3.connect('admin_content.db')
        cur = conn.cursor()
        
        # Xóa dữ liệu cũ
        cur.execute("DELETE FROM countries")
        
        # Danh sách đầy đủ các quốc gia xuất khẩu lao động phổ biến
        countries_data = [
            # Châu Á - Thái Bình Dương (các quốc gia chính)
            ('Nhật Bản', '/images/flags/japan.png', 150, 'active'),
            ('Đài Loan', '/images/flags/taiwan.png', 120, 'active'),
            ('Hàn Quốc', '/images/flags/korea.png', 95, 'active'),
            ('Singapore', '/images/flags/singapore.png', 45, 'active'),
            ('Malaysia', '/images/flags/malaysia.png', 35, 'active'),
            ('Thái Lan', '/images/flags/thailand.png', 25, 'active'),
            ('Trung Quốc', '/images/flags/china.png', 30, 'active'),
            ('Philippines', '/images/flags/philippines.png', 15, 'active'),
            ('Indonesia', '/images/flags/indonesia.png', 12, 'active'),
            ('Úc', '/images/flags/australia.png', 40, 'active'),
            ('New Zealand', '/images/flags/newzealand.png', 20, 'active'),
            
            # Châu Âu (các quốc gia chính)
            ('Đức', '/images/flags/germany.png', 85, 'active'),
            ('Pháp', '/images/flags/france.png', 35, 'active'),
            ('Anh', '/images/flags/uk.png', 55, 'active'),
            ('Ý', '/images/flags/italy.png', 25, 'active'),
            ('Tây Ban Nha', '/images/flags/spain.png', 20, 'active'),
            ('Hà Lan', '/images/flags/netherlands.png', 30, 'active'),
            ('Bỉ', '/images/flags/belgium.png', 15, 'active'),
            ('Thụy Sĩ', '/images/flags/switzerland.png', 25, 'active'),
            ('Áo', '/images/flags/austria.png', 18, 'active'),
            ('Na Uy', '/images/flags/norway.png', 22, 'active'),
            ('Thụy Điển', '/images/flags/sweden.png', 20, 'active'),
            ('Phần Lan', '/images/flags/finland.png', 15, 'active'),
            ('Đan Mạch', '/images/flags/denmark.png', 18, 'active'),
            ('Ba Lan', '/images/flags/poland.png', 12, 'active'),
            ('Séc', '/images/flags/czech.png', 10, 'active'),
            ('Hungary', '/images/flags/hungary.png', 8, 'active'),
            ('Slovakia', '/images/flags/slovakia.png', 6, 'active'),
            ('Romania', '/images/flags/romania.png', 8, 'active'),
            ('Bulgaria', '/images/flags/bulgaria.png', 5, 'active'),
            ('Croatia', '/images/flags/croatia.png', 4, 'active'),
            ('Slovenia', '/images/flags/slovenia.png', 3, 'active'),
            ('Estonia', '/images/flags/estonia.png', 2, 'active'),
            ('Latvia', '/images/flags/latvia.png', 2, 'active'),
            ('Lithuania', '/images/flags/lithuania.png', 3, 'active'),
            ('Ireland', '/images/flags/ireland.png', 12, 'active'),
            ('Bồ Đào Nha', '/images/flags/portugal.png', 8, 'active'),
            ('Hy Lạp', '/images/flags/greece.png', 5, 'active'),
            ('Cyprus', '/images/flags/cyprus.png', 3, 'active'),
            ('Malta', '/images/flags/malta.png', 2, 'active'),
            ('Luxembourg', '/images/flags/luxembourg.png', 4, 'active'),
            
            # Bắc Mỹ
            ('Mỹ', '/images/flags/usa.png', 75, 'active'),
            ('Canada', '/images/flags/canada.png', 65, 'active'),
            
            # Trung Đông
            ('UAE', '/images/flags/uae.png', 45, 'active'),
            ('Saudi Arabia', '/images/flags/saudi.png', 35, 'active'),
            ('Qatar', '/images/flags/qatar.png', 25, 'active'),
            ('Kuwait', '/images/flags/kuwait.png', 20, 'active'),
            ('Bahrain', '/images/flags/bahrain.png', 15, 'active'),
            ('Oman', '/images/flags/oman.png', 12, 'active'),
            ('Israel', '/images/flags/israel.png', 8, 'active'),
            ('Jordan', '/images/flags/jordan.png', 5, 'active'),
            ('Lebanon', '/images/flags/lebanon.png', 3, 'active'),
            
            # Châu Phi
            ('Nam Phi', '/images/flags/south-africa.png', 8, 'active'),
            ('Algeria', '/images/flags/algeria.png', 5, 'active'),
            ('Morocco', '/images/flags/morocco.png', 4, 'active'),
            ('Egypt', '/images/flags/egypt.png', 6, 'active'),
            ('Libya', '/images/flags/libya.png', 3, 'active'),
            ('Tunisia', '/images/flags/tunisia.png', 2, 'active'),
            
            # Nam Mỹ
            ('Brazil', '/images/flags/brazil.png', 12, 'active'),
            ('Argentina', '/images/flags/argentina.png', 8, 'active'),
            ('Chile', '/images/flags/chile.png', 6, 'active'),
            ('Peru', '/images/flags/peru.png', 4, 'active'),
            ('Colombia', '/images/flags/colombia.png', 5, 'active'),
            ('Ecuador', '/images/flags/ecuador.png', 3, 'active'),
            ('Uruguay', '/images/flags/uruguay.png', 2, 'active'),
            ('Paraguay', '/images/flags/paraguay.png', 1, 'active'),
            
            # Châu Á khác
            ('Nga', '/images/flags/russia.png', 25, 'active'),
            ('Kazakhstan', '/images/flags/kazakhstan.png', 8, 'active'),
            ('Uzbekistan', '/images/flags/uzbekistan.png', 5, 'active'),
            ('Kyrgyzstan', '/images/flags/kyrgyzstan.png', 3, 'active'),
            ('Tajikistan', '/images/flags/tajikistan.png', 2, 'active'),
            ('Turkmenistan', '/images/flags/turkmenistan.png', 1, 'active'),
            ('Azerbaijan', '/images/flags/azerbaijan.png', 3, 'active'),
            ('Georgia', '/images/flags/georgia.png', 2, 'active'),
            ('Armenia', '/images/flags/armenia.png', 1, 'active'),
            ('Mongolia', '/images/flags/mongolia.png', 2, 'active'),
            ('Ấn Độ', '/images/flags/india.png', 15, 'active'),
            ('Bangladesh', '/images/flags/bangladesh.png', 8, 'active'),
            ('Pakistan', '/images/flags/pakistan.png', 6, 'active'),
            ('Sri Lanka', '/images/flags/sri-lanka.png', 4, 'active'),
            ('Nepal', '/images/flags/nepal.png', 3, 'active'),
            ('Myanmar', '/images/flags/myanmar.png', 5, 'active'),
            ('Cambodia', '/images/flags/cambodia.png', 3, 'active'),
            ('Laos', '/images/flags/laos.png', 2, 'active'),
            ('Brunei', '/images/flags/brunei.png', 1, 'active'),
            ('Maldives', '/images/flags/maldives.png', 1, 'active'),
        ]
        
        # Chèn dữ liệu quốc gia
        for name, flag_url, job_count, status in countries_data:
            cur.execute("""
                INSERT INTO countries (name, flag_url, job_count, status, created_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, (name, flag_url, job_count, status))
        
        conn.commit()
        print(f"✅ Đã cập nhật {len(countries_data)} quốc gia vào database!")
        print("✅ Danh sách bao gồm các quốc gia chính cho xuất khẩu lao động")
        
        # Hiển thị một số quốc gia mẫu
        cur.execute("SELECT name, job_count FROM countries ORDER BY job_count DESC LIMIT 10")
        top_countries = cur.fetchall()
        print("\n🔝 Top 10 quốc gia có nhiều việc làm nhất:")
        for i, (name, count) in enumerate(top_countries, 1):
            print(f"   {i}. {name}: {count} việc làm")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi cập nhật database: {e}")
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    update_countries_database()