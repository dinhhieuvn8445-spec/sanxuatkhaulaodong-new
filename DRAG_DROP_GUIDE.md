# 🖼️ Hướng dẫn sử dụng tính năng Kéo thả hình ảnh (Drag & Drop)

## 📋 Tổng quan

Tính năng kéo thả hình ảnh đã được tích hợp vào admin panel, cho phép bạn upload hình ảnh một cách dễ dàng và trực quan khi quản lý đơn hàng việc làm.

## 🚀 Tính năng chính

### ✨ Giao diện kéo thả
- **Vùng kéo thả** với hiệu ứng thị giác chuyên nghiệp
- **Animation** khi kéo file vào vùng upload
- **Feedback** trực quan với màu sắc thay đổi
- **Progress bar** hiển thị tiến trình upload

### 📁 Hỗ trợ nhiều cách upload
1. **Kéo thả file** trực tiếp vào vùng upload
2. **Click để chọn file** từ máy tính
3. **Nhập URL** hình ảnh trực tiếp

### 🔒 Validation và bảo mật
- **Kiểm tra định dạng**: Chỉ chấp nhận JPG, PNG, GIF, WebP
- **Giới hạn kích thước**: Tối đa 5MB
- **Validation phía server**: Đảm bảo an toàn dữ liệu

## 🛠️ Cách sử dụng

### 1. Truy cập Admin Panel
```
URL: https://work-2-eiklgetjqllccahe.prod-runtime.all-hands.dev/admin.html
Username: duongoanh
Password: 123
```

### 2. Quản lý việc làm
1. Chọn tab **"Việc làm"** trong sidebar
2. Click **"Thêm đơn hàng mới"** hoặc chỉnh sửa đơn hàng có sẵn
3. Tìm phần **"Hình ảnh đơn hàng"**

### 3. Upload hình ảnh

#### Phương pháp 1: Kéo thả (Drag & Drop)
1. Mở file explorer trên máy tính
2. Chọn hình ảnh muốn upload
3. **Kéo và thả** file vào vùng upload
4. Chờ upload hoàn tất và xem preview

#### Phương pháp 2: Click để chọn
1. Click vào vùng upload hoặc text **"chọn file"**
2. Chọn hình ảnh từ dialog box
3. Chờ upload hoàn tất

#### Phương pháp 3: Nhập URL
1. Nhập URL hình ảnh vào ô input
2. Hệ thống sẽ tự động preview hình ảnh
3. Kiểm tra hình ảnh hiển thị đúng

## 🎨 Giao diện và trải nghiệm

### Trạng thái vùng upload
- **Bình thường**: Viền nét đứt màu xám, nền xanh đậm
- **Hover**: Viền chuyển màu xanh, nền sáng hơn
- **Drag over**: Viền xanh lá, hiệu ứng phóng to, animation pulse
- **Error**: Viền đỏ, nền đỏ, hiển thị thông báo lỗi

### Progress indicator
- **Progress bar**: Thanh tiến trình với gradient xanh
- **Percentage**: Hiển thị phần trăm hoàn thành
- **Animation**: Smooth transition và visual feedback

### Image preview
- **Preview**: Hiển thị hình ảnh đã upload
- **Remove button**: Nút xóa hình ảnh (icon X)
- **Responsive**: Tự động điều chỉnh kích thước

## 📊 Thông số kỹ thuật

### Định dạng hỗ trợ
- **JPEG/JPG**: Định dạng phổ biến nhất
- **PNG**: Hỗ trợ trong suốt
- **GIF**: Hỗ trợ animation
- **WebP**: Định dạng hiện đại, dung lượng nhỏ

### Giới hạn
- **Kích thước tối đa**: 5MB
- **Số lượng file**: 1 file mỗi lần
- **Kích thước hiển thị**: 200px height, auto width

### API Endpoints
- **Upload**: `POST /api/admin/upload-image`
- **Response**: JSON với URL hình ảnh
- **Storage**: `/images/uploads/` directory

## 🔧 Xử lý lỗi

### Lỗi thường gặp và cách khắc phục

#### 1. "Vui lòng chọn file hình ảnh hợp lệ"
- **Nguyên nhân**: File không phải định dạng hình ảnh
- **Khắc phục**: Chọn file JPG, PNG, GIF hoặc WebP

#### 2. "Kích thước file không được vượt quá 5MB"
- **Nguyên nhân**: File quá lớn
- **Khắc phục**: Nén hình ảnh hoặc chọn file khác

#### 3. "URL hình ảnh không hợp lệ"
- **Nguyên nhân**: URL không đúng định dạng
- **Khắc phục**: Kiểm tra URL có bắt đầu bằng http:// hoặc https://

#### 4. "Không thể tải hình ảnh từ URL này"
- **Nguyên nhân**: URL không tồn tại hoặc không truy cập được
- **Khắc phục**: Kiểm tra URL trong trình duyệt trước

## 🎯 Tips sử dụng hiệu quả

### 1. Chuẩn bị hình ảnh
- **Kích thước**: Nên sử dụng hình ảnh có tỷ lệ 16:9 hoặc 4:3
- **Chất lượng**: Độ phân giải tối thiểu 800x600px
- **Dung lượng**: Nén hình ảnh để giảm thời gian upload

### 2. Tối ưu workflow
- **Batch processing**: Chuẩn bị nhiều hình ảnh trước khi upload
- **Naming convention**: Đặt tên file có ý nghĩa
- **Backup**: Lưu trữ hình ảnh gốc ở nơi khác

### 3. Kiểm tra chất lượng
- **Preview**: Luôn kiểm tra preview trước khi lưu
- **Mobile view**: Kiểm tra hiển thị trên mobile
- **Loading speed**: Đảm bảo hình ảnh load nhanh

## 🔄 Tích hợp với hệ thống

### Database
- URL hình ảnh được lưu trong trường `image_url`
- File được lưu trong thư mục `/images/uploads/`
- Tên file được tạo unique bằng UUID

### Frontend integration
- Tự động cập nhật URL input khi upload thành công
- Sync với form data khi submit
- Validation real-time

### Backend processing
- Multipart form data parsing
- File type validation
- Secure file storage
- Error handling

## 📱 Responsive Design

### Desktop
- Vùng upload kích thước lớn (200px height)
- Icon và text rõ ràng
- Hover effects mượt mà

### Tablet
- Vùng upload vừa phải
- Touch-friendly interface
- Optimized spacing

### Mobile
- Vùng upload nhỏ gọn (150px height)
- Icon nhỏ hơn (36px)
- Text size điều chỉnh

## 🚨 Lưu ý quan trọng

### Bảo mật
1. **File validation**: Luôn kiểm tra định dạng file
2. **Size limits**: Không upload file quá lớn
3. **Malware scan**: Cân nhắc scan virus cho file upload

### Performance
1. **Image optimization**: Nén hình ảnh trước khi upload
2. **CDN**: Cân nhắc sử dụng CDN cho hình ảnh
3. **Caching**: Implement browser caching

### Backup
1. **Regular backup**: Backup thư mục uploads định kỳ
2. **Version control**: Không commit hình ảnh vào git
3. **Cloud storage**: Cân nhắc lưu trữ cloud

## 🆘 Troubleshooting

### Server không phản hồi
```bash
# Kiểm tra server status
curl -I http://localhost:12001/api/admin/upload-image

# Restart server nếu cần
pkill -f "python.*server.py"
python3 server.py
```

### Thư mục uploads không tồn tại
```bash
# Tạo thư mục uploads
mkdir -p images/uploads
chmod 755 images/uploads
```

### JavaScript không load
- Kiểm tra console browser (F12)
- Đảm bảo admin.js được load
- Clear browser cache

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser (F12)
2. Xem server logs trong `server.log`
3. Thử refresh trang và upload lại
4. Kiểm tra kết nối internet

---

**Chúc bạn sử dụng tính năng drag & drop thành công! 🎉**