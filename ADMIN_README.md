# 🎛️ Admin Dashboard - Hệ thống quản trị nội dung

## 📋 Tổng quan

Hệ thống Admin Dashboard cho phép bạn quản lý nội dung của website xuất khẩu lao động một cách dễ dàng và trực quan. Giao diện được thiết kế với màu sắc dark theme chuyên nghiệp, tương tự như hình mẫu bạn cung cấp.

## 🚀 Tính năng chính

### ✨ Giao diện quản trị
- **Dark theme** với màu sắc xanh dương chuyên nghiệp
- **Sidebar navigation** với 4 tab chính:
  - 🏠 Trang chủ
  - ℹ️ Giới thiệu  
  - 📖 Hướng dẫn
  - 💬 Tư vấn xklđ

### 📝 Quản lý nội dung
- **Chỉnh sửa trực tiếp** tất cả nội dung trang web
- **Lưu tự động** vào database SQLite
- **Giao diện form** thân thiện với người dùng
- **Validation** và thông báo lỗi rõ ràng

### 🔐 Bảo mật
- **Xác thực người dùng** với bcrypt
- **Phân quyền admin** 
- **Session management** với localStorage

## 🛠️ Cài đặt và sử dụng

### 1. Khởi tạo database
```bash
cd /workspace/sanxuatkhaulaodong
python3 create_sqlite_db.py
```

### 2. Khởi động server
```bash
python3 server.py
```

### 3. Truy cập hệ thống
- **Website chính**: https://work-2-vukxwwuhzgnzmibr.prod-runtime.all-hands.dev/
- **Trang đăng nhập**: https://work-2-vukxwwuhzgnzmibr.prod-runtime.all-hands.dev/login.html
- **Admin Dashboard**: https://work-2-vukxwwuhzgnzmibr.prod-runtime.all-hands.dev/admin.html
- **Demo nội dung**: https://work-2-vukxwwuhzgnzmibr.prod-runtime.all-hands.dev/demo-content.html

### 4. Thông tin đăng nhập
```
Username: duongoanh
Password: 123
```

## 📁 Cấu trúc file

```
sanxuatkhaulaodong/
├── admin.html              # Trang admin dashboard
├── admin-styles.css        # CSS cho admin dashboard
├── admin.js               # JavaScript cho admin dashboard
├── login.html             # Trang đăng nhập admin
├── demo-content.html      # Trang demo hiển thị nội dung
├── server.py              # Server Python với API endpoints
├── create_sqlite_db.py    # Script tạo database
├── admin_content.db       # Database SQLite
└── ...
```

## 🎨 Giao diện

### Header
- Logo và tiêu đề "Dashboard Quản trị"
- Thông tin user đang đăng nhập
- Nút đăng xuất

### Sidebar
- Navigation menu với 4 tab chính
- Highlight tab đang active
- Icons Font Awesome cho mỗi mục

### Main Content
- Form chỉnh sửa cho từng trang
- Các trường input/textarea tương ứng
- Nút "Lưu thay đổi" và "Khôi phục"

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập admin

### Content Management
- `GET /api/admin/content/{page}` - Lấy nội dung trang
- `POST /api/admin/content/{page}` - Lưu nội dung trang

Trong đó `{page}` có thể là: `home`, `about`, `guide`, `consultation`

## 📊 Database Schema

### Bảng `users`
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bảng `page_content`
```sql
CREATE TABLE page_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_name TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,  -- JSON format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Cách sử dụng

### 1. Đăng nhập
1. Truy cập `/login.html`
2. Nhập username: `duongoanh`, password: `123`
3. Click "Đăng nhập"

### 2. Chỉnh sửa nội dung
1. Chọn tab muốn chỉnh sửa (Trang chủ, Giới thiệu, Hướng dẫn, Tư vấn xklđ)
2. Điền/sửa nội dung trong các trường
3. Click "Lưu thay đổi"
4. Hệ thống sẽ hiển thị thông báo thành công

### 3. Xem kết quả
- Truy cập `/demo-content.html` để xem nội dung đã cập nhật
- Nội dung sẽ được hiển thị real-time từ database

## 🎨 Tùy chỉnh giao diện

### Màu sắc chính
- **Background**: `#1a1d29` (Dark blue)
- **Sidebar**: `#2c3e50` (Blue gray)
- **Primary**: `#3498db` (Blue)
- **Text**: `#ffffff` (White)

### Font chữ
- **Font family**: Roboto
- **Weights**: 300, 400, 500, 700

## 🔄 Tích hợp với website chính

Để tích hợp nội dung từ admin dashboard vào website chính, sử dụng JavaScript để gọi API:

```javascript
// Lấy nội dung trang chủ
fetch('/api/admin/content/home')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Cập nhật nội dung trang
      document.getElementById('title').textContent = data.data.title;
      document.getElementById('subtitle').textContent = data.data.subtitle;
      // ...
    }
  });
```

## 🚨 Lưu ý quan trọng

1. **Backup database**: Thường xuyên backup file `admin_content.db`
2. **Bảo mật**: Thay đổi mật khẩu admin mặc định trong production
3. **HTTPS**: Sử dụng HTTPS trong môi trường production
4. **Validation**: Kiểm tra dữ liệu đầu vào trước khi lưu

## 🆘 Troubleshooting

### Lỗi kết nối database
```bash
# Kiểm tra file database có tồn tại
ls -la admin_content.db

# Tạo lại database nếu cần
python3 create_sqlite_db.py
```

### Lỗi đăng nhập
```bash
# Kiểm tra user admin trong database
sqlite3 admin_content.db "SELECT * FROM users;"
```

### Server không khởi động
```bash
# Kiểm tra port có bị chiếm
netstat -tulpn | grep :12001

# Kill process nếu cần
pkill -f "python3 server.py"
```

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Log server trong file `server.log`
2. Console browser (F12) để xem lỗi JavaScript
3. Network tab để kiểm tra API calls

---

**Chúc bạn sử dụng hệ thống thành công! 🎉**