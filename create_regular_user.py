#!/usr/bin/env python3
import psycopg2
import bcrypt

def create_regular_user():
    try:
        # Kết nối đến database
        conn = psycopg2.connect(
            host="localhost",
            database="sanxuatkhaulaodong",
            user="postgres",
            password="postgres"
        )
        cur = conn.cursor()
        
        # Mã hóa mật khẩu
        password = "123"
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Thêm tài khoản người dùng thông thường
        cur.execute("""
            INSERT INTO users (username, password_hash, email, is_admin) 
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (username) DO UPDATE SET
            password_hash = EXCLUDED.password_hash,
            is_admin = EXCLUDED.is_admin
        """, ("user1", password_hash, "user1@example.com", False))
        
        conn.commit()
        print("Tài khoản người dùng thông thường 'user1' đã được tạo thành công!")
        print("Username: user1")
        print("Password: 123")
        print("Role: Regular User")
        
        # Kiểm tra tài khoản đã tạo
        cur.execute("SELECT username, is_admin FROM users WHERE username = %s", ("user1",))
        result = cur.fetchone()
        if result:
            print(f"Xác nhận: {result[0]} - Admin: {result[1]}")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Lỗi khi tạo tài khoản người dùng: {e}")

if __name__ == "__main__":
    create_regular_user()