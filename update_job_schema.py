#!/usr/bin/env python3
"""
Script to update jobs table schema with detailed job information fields
"""

import sqlite3
import json

def update_job_schema():
    """Cập nhật schema bảng jobs với các trường chi tiết"""
    try:
        conn = sqlite3.connect('admin_content.db')
        cur = conn.cursor()
        
        # Thêm các cột mới cho chi tiết việc làm
        new_columns = [
            ('job_code', 'TEXT'),  # Mã đơn hàng
            ('location', 'TEXT'),  # Tỉnh, khu vực
            ('company', 'TEXT'),   # Công ty, nghiệp đoàn
            ('quantity', 'INTEGER DEFAULT 1'),  # Số lượng tuyển
            ('gender_requirement', 'TEXT'),  # Yêu cầu giới tính
            ('age_min', 'INTEGER'),  # Tuổi tối thiểu
            ('age_max', 'INTEGER'),  # Tuổi tối đa
            ('work_hours', 'TEXT'),  # Thời gian làm việc
            ('overtime_pay', 'TEXT'),  # Lương làm thêm
            ('accommodation', 'TEXT'),  # Chỗ ở
            ('meals', 'TEXT'),  # Ăn uống
            ('insurance', 'TEXT'),  # Bảo hiểm
            ('contract_duration', 'TEXT'),  # Thời hạn hợp đồng
            ('job_description', 'TEXT'),  # Mô tả công việc chi tiết
            ('job_requirements', 'TEXT'),  # Yêu cầu công việc chi tiết
            ('benefits', 'TEXT'),  # Quyền lợi
            ('working_conditions', 'TEXT'),  # Điều kiện làm việc
            ('application_process', 'TEXT'),  # Quy trình ứng tuyển
            ('documents_required', 'TEXT'),  # Hồ sơ yêu cầu
            ('training_provided', 'TEXT'),  # Đào tạo cung cấp
            ('language_requirement', 'TEXT'),  # Yêu cầu ngoại ngữ
            ('additional_notes', 'TEXT'),  # Ghi chú thêm
        ]
        
        # Kiểm tra và thêm từng cột nếu chưa tồn tại
        for column_name, column_type in new_columns:
            try:
                cur.execute(f"ALTER TABLE jobs ADD COLUMN {column_name} {column_type}")
                print(f"✅ Đã thêm cột: {column_name}")
            except sqlite3.OperationalError as e:
                if "duplicate column name" in str(e):
                    print(f"⚠️  Cột {column_name} đã tồn tại")
                else:
                    print(f"❌ Lỗi khi thêm cột {column_name}: {e}")
        
        # Thêm dữ liệu mẫu cho một số job hiện có
        sample_jobs = [
            {
                'id': 1,
                'job_code': 'RU001',
                'location': 'Toàn quốc',
                'company': 'Vùng Ryazan, g Sasovo, ul.Pushkin, 21',
                'quantity': 10,
                'gender_requirement': 'Nam',
                'age_min': 20,
                'age_max': 45,
                'work_hours': '8 giờ/ngày, 5 ngày/tuần',
                'overtime_pay': '150% lương cơ bản',
                'accommodation': 'Công ty cung cấp chỗ ở miễn phí',
                'meals': 'Hỗ trợ 50% chi phí ăn uống',
                'insurance': 'Bảo hiểm y tế và tai nạn lao động',
                'contract_duration': '2 năm',
                'job_description': 'Vận hành máy đúc kim loại, kiểm tra chất lượng sản phẩm, bảo trì thiết bị cơ bản',
                'job_requirements': 'Có kinh nghiệm làm việc với máy móc, khỏe mạnh, có trách nhiệm',
                'benefits': 'Lương cao, môi trường làm việc an toàn, cơ hội học hỏi công nghệ mới',
                'working_conditions': 'Làm việc trong nhà máy hiện đại, có điều hòa không khí',
                'application_process': 'Nộp hồ sơ → Phỏng vấn → Khám sức khỏe → Ký hợp đồng',
                'documents_required': 'Hộ chiếu, bằng cấp, giấy khám sức khỏe, sơ yếu lý lịch',
                'training_provided': 'Đào tạo kỹ thuật 2 tuần trước khi làm việc',
                'language_requirement': 'Tiếng Nga cơ bản (sẽ được đào tạo)',
                'additional_notes': 'Ưu tiên ứng viên có kinh nghiệm cơ khí'
            }
        ]
        
        # Cập nhật dữ liệu mẫu
        for job_data in sample_jobs:
            job_id = job_data.pop('id')
            
            # Tạo câu lệnh UPDATE
            set_clauses = []
            values = []
            for key, value in job_data.items():
                set_clauses.append(f"{key} = ?")
                values.append(value)
            
            if set_clauses:
                values.append(job_id)
                update_query = f"UPDATE jobs SET {', '.join(set_clauses)} WHERE id = ?"
                cur.execute(update_query, values)
                print(f"✅ Đã cập nhật dữ liệu mẫu cho job ID: {job_id}")
        
        conn.commit()
        print("✅ Cập nhật schema bảng jobs thành công!")
        
        # Hiển thị schema mới
        cur.execute("PRAGMA table_info(jobs)")
        columns = cur.fetchall()
        print("\n📋 Schema bảng jobs sau khi cập nhật:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")
        
    except Exception as e:
        print(f"❌ Lỗi khi cập nhật schema: {e}")
        return False
    finally:
        if conn:
            conn.close()
    
    return True

if __name__ == "__main__":
    update_job_schema()