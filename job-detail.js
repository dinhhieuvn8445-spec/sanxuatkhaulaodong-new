// Job Detail Page JavaScript Functions

// Function to handle phone call
function callPhone(phoneNumber) {
    if (confirm(`Bạn có muốn gọi điện thoại đến số ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// Function to open Zalo chat
function openZalo(phoneNumber) {
    const zaloUrl = `https://zalo.me/${phoneNumber}`;
    window.open(zaloUrl, '_blank');
}

// Function to open Facebook profile
function openFacebook(facebookUrl) {
    if (facebookUrl && facebookUrl !== '#') {
        window.open(facebookUrl, '_blank');
    } else {
        alert('Thông tin Facebook chưa được cập nhật.');
    }
}

// Function to show consultation modal
function showConsultation() {
    const modal = document.createElement('div');
    modal.className = 'consultation-modal-overlay';
    modal.innerHTML = `
        <div class="consultation-modal">
            <div class="modal-header">
                <h3><i class="fas fa-user-tie"></i> Đăng ký tư vấn miễn phí</h3>
                <button class="close-btn" onclick="closeConsultationModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="consultationForm" onsubmit="submitConsultation(event)">
                    <div class="form-group">
                        <label for="consultName">Họ và tên *</label>
                        <input type="text" id="consultName" name="consultName" required placeholder="Nhập họ và tên của bạn">
                    </div>
                    <div class="form-group">
                        <label for="consultPhone">Số điện thoại *</label>
                        <input type="tel" id="consultPhone" name="consultPhone" required placeholder="Nhập số điện thoại">
                    </div>
                    <div class="form-group">
                        <label for="consultEmail">Email</label>
                        <input type="email" id="consultEmail" name="consultEmail" placeholder="Nhập email của bạn">
                    </div>
                    <div class="form-group">
                        <label for="consultMessage">Nội dung tư vấn</label>
                        <textarea id="consultMessage" name="consultMessage" rows="4" placeholder="Nhập nội dung bạn muốn tư vấn..."></textarea>
                    </div>
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-paper-plane"></i> Gửi yêu cầu tư vấn
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to close consultation modal
function closeConsultationModal() {
    const modal = document.querySelector('.consultation-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to submit consultation form
function submitConsultation(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('consultName'),
        phone: formData.get('consultPhone'),
        email: formData.get('consultEmail'),
        message: formData.get('consultMessage')
    };
    
    // Validate phone number
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.');
        return;
    }
    
    // Simulate form submission
    alert(`Cảm ơn ${data.name}! Chúng tôi sẽ liên hệ với bạn qua số ${data.phone} trong thời gian sớm nhất.`);
    closeConsultationModal();
}

// Function to show employer info
function showEmployerInfo() {
    const modal = document.createElement('div');
    modal.className = 'info-modal-overlay';
    modal.innerHTML = `
        <div class="info-modal">
            <div class="modal-header">
                <h3><i class="fas fa-building"></i> Thông tin nhà tuyển dụng</h3>
                <button class="close-btn" onclick="closeInfoModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="employer-info">
                    <h4>Công ty: Vùng Ryazan, g Sasovo, ul.Pushkin, 21</h4>
                    <p><strong>Quốc gia:</strong> Liên Bang Nga</p>
                    <p><strong>Địa chỉ:</strong> Vùng Ryazan, g Sasovo, ul.Pushkin, 21</p>
                    <p><strong>Ngành nghề:</strong> Sản xuất, Cơ khí</p>
                    <p><strong>Quy mô:</strong> 100-500 nhân viên</p>
                    <p><strong>Mô tả:</strong> Công ty chuyên sản xuất các sản phẩm đúc kim loại, có nhiều năm kinh nghiệm trong lĩnh vực này.</p>
                    
                    <div class="employer-benefits">
                        <h5>Quyền lợi nhân viên:</h5>
                        <ul>
                            <li>Lương cạnh tranh theo năng lực</li>
                            <li>Bảo hiểm y tế đầy đủ</li>
                            <li>Chỗ ở miễn phí</li>
                            <li>Hỗ trợ vé máy bay</li>
                            <li>Môi trường làm việc an toàn</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to close info modal
function closeInfoModal() {
    const modal = document.querySelector('.info-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to show candidate notes
function showCandidateNotes() {
    const modal = document.createElement('div');
    modal.className = 'notes-modal-overlay';
    modal.innerHTML = `
        <div class="notes-modal">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-triangle"></i> Lưu ý dành cho ứng viên</h3>
                <button class="close-btn" onclick="closeNotesModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="candidate-notes">
                    <div class="warning-box">
                        <h4>⚠️ Những điều cần lưu ý:</h4>
                        <ul>
                            <li><strong>Không đóng phí trước:</strong> Không đóng bất kỳ khoản phí nào trước khi có hợp đồng chính thức.</li>
                            <li><strong>Xác minh thông tin:</strong> Luôn xác minh thông tin công ty và nhà tuyển dụng.</li>
                            <li><strong>Hợp đồng rõ ràng:</strong> Đảm bảo hợp đồng lao động được ký kết đầy đủ, rõ ràng.</li>
                            <li><strong>Bảo hiểm:</strong> Kiểm tra các chế độ bảo hiểm và quyền lợi.</li>
                            <li><strong>Liên hệ chính thức:</strong> Chỉ liên hệ qua các kênh chính thức của công ty.</li>
                        </ul>
                    </div>
                    
                    <div class="requirements-box">
                        <h4>📋 Yêu cầu chuẩn bị:</h4>
                        <ul>
                            <li>Hộ chiếu còn hạn tối thiểu 18 tháng</li>
                            <li>Bằng cấp, chứng chỉ liên quan</li>
                            <li>Giấy khám sức khỏe</li>
                            <li>Lý lịch tư pháp</li>
                            <li>Ảnh 4x6 (10 tấm)</li>
                        </ul>
                    </div>
                    
                    <div class="contact-box">
                        <h4>📞 Liên hệ hỗ trợ:</h4>
                        <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:</p>
                        <p><strong>Hotline:</strong> 1900-xxxx</p>
                        <p><strong>Email:</strong> support@company.com</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to close notes modal
function closeNotesModal() {
    const modal = document.querySelector('.notes-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to report employer
function reportEmployer() {
    const modal = document.createElement('div');
    modal.className = 'report-modal-overlay';
    modal.innerHTML = `
        <div class="report-modal">
            <div class="modal-header">
                <h3><i class="fas fa-flag"></i> Báo cáo nhà tuyển dụng</h3>
                <button class="close-btn" onclick="closeReportModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="reportForm" onsubmit="submitReport(event)">
                    <div class="form-group">
                        <label for="reportReason">Lý do báo cáo *</label>
                        <select id="reportReason" name="reportReason" required>
                            <option value="">Chọn lý do báo cáo</option>
                            <option value="fraud">Lừa đảo</option>
                            <option value="fake_job">Tin tuyển dụng giả</option>
                            <option value="inappropriate">Nội dung không phù hợp</option>
                            <option value="spam">Spam</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reportDetails">Chi tiết báo cáo *</label>
                        <textarea id="reportDetails" name="reportDetails" rows="4" required placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="reporterName">Họ và tên</label>
                        <input type="text" id="reporterName" name="reporterName" placeholder="Nhập họ và tên của bạn">
                    </div>
                    <div class="form-group">
                        <label for="reporterEmail">Email liên hệ</label>
                        <input type="email" id="reporterEmail" name="reporterEmail" placeholder="Nhập email để chúng tôi phản hồi">
                    </div>
                    <button type="submit" class="submit-btn report-submit">
                        <i class="fas fa-paper-plane"></i> Gửi báo cáo
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to close report modal
function closeReportModal() {
    const modal = document.querySelector('.report-modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to submit report
function submitReport(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        reason: formData.get('reportReason'),
        details: formData.get('reportDetails'),
        name: formData.get('reporterName'),
        email: formData.get('reporterEmail')
    };
    
    if (!data.reason || !data.details) {
        alert('Vui lòng điền đầy đủ thông tin báo cáo.');
        return;
    }
    
    // Simulate report submission
    alert('Cảm ơn bạn đã gửi báo cáo. Chúng tôi sẽ xem xét và xử lý trong thời gian sớm nhất.');
    closeReportModal();
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to buttons
    const phoneBtn = document.querySelector('.btn-phone');
    const zaloBtn = document.querySelector('.btn-zalo');
    const facebookBtn = document.querySelector('.btn-facebook');
    const consultBtn = document.querySelector('.btn-consult');
    const infoBtn = document.querySelector('.btn-info');
    const saveBtn = document.querySelector('.btn-save');
    const reportBtn = document.querySelector('.btn-report');
    
    if (consultBtn) {
        consultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showConsultation();
        });
    }
    
    if (infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmployerInfo();
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCandidateNotes();
        });
    }
    
    if (reportBtn) {
        reportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            reportEmployer();
        });
    }
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            callPhone('0981057683');
        });
    }
    
    if (zaloBtn) {
        zaloBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openZalo('0981057683');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openFacebook('https://www.facebook.com/profile.php?id=61558585135713');
        });
    }
});