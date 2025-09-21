// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentTab = 'home';
        this.init();
    }

    init() {
        this.loadUserInfo();
        this.loadTabContent(this.currentTab);
        this.setupFormHandlers();
    }

    // Load user information
    loadUserInfo() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.username) {
            document.getElementById('adminUsername').textContent = user.username;
        }
    }

    // Switch between tabs
    switchTab(tabName) {
        // Remove active class from all nav items and tab contents
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to selected tab
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    // Load content for specific tab
    async loadTabContent(tabName) {
        this.showLoading();
        
        try {
            const response = await fetch(`/api/admin/content/${tabName}`);
            if (response.ok) {
                const data = await response.json();
                this.populateForm(tabName, data);
            } else {
                console.log('No existing content found, using empty form');
            }
        } catch (error) {
            console.error('Error loading content:', error);
            this.showMessage('Lỗi khi tải nội dung', 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Populate form with data
    populateForm(tabName, data) {
        const form = document.getElementById(`${tabName}Form`);
        if (!form || !data) return;

        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key] || '';
            }
        });
    }

    // Setup form submit handlers
    setupFormHandlers() {
        const forms = ['homeForm', 'aboutForm', 'guideForm', 'consultationForm'];
        
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.saveContent(formId);
                });
            }
        });
    }

    // Save content
    async saveContent(formId) {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Determine tab name from form ID
        const tabName = formId.replace('Form', '');
        
        this.showLoading();

        try {
            const response = await fetch(`/api/admin/content/${tabName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showMessage('Lưu thành công!', 'success');
            } else {
                this.showMessage(result.message || 'Có lỗi xảy ra', 'error');
            }
        } catch (error) {
            console.error('Error saving content:', error);
            this.showMessage('Lỗi kết nối server', 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Reset form to original values
    resetForm(formId) {
        const form = document.getElementById(formId);
        const tabName = formId.replace('Form', '');
        
        if (confirm('Bạn có chắc muốn khôi phục về dữ liệu gốc?')) {
            this.loadTabContent(tabName);
        }
    }

    // Show loading overlay
    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }

    // Hide loading overlay
    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    // Show message
    showMessage(text, type = 'info') {
        const container = document.getElementById('messageContainer');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        message.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${text}</span>
        `;
        
        container.appendChild(message);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    }

    // Logout function
    logout() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('user');
            window.location.href = '/index.html';
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// Global functions for HTML onclick handlers
function switchTab(tabName) {
    window.adminDashboard.switchTab(tabName);
}

function resetForm(formId) {
    window.adminDashboard.resetForm(formId);
}

function logout() {
    window.adminDashboard.logout();
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.username || !user.is_admin) {
        alert('Bạn không có quyền truy cập trang này!');
        window.location.href = '/login.html';
    }
});

// Sample data for testing (will be replaced with real data from database)
const sampleData = {
    home: {
        title: 'Dịch vụ xuất khẩu lao động uy tín',
        subtitle: 'Dịch vụ làm nail và nối mi chuyên nghiệp - HỆ THỐNG HOẠT ĐỘNG TỐT!',
        description: 'chúng tôi chuyên bán thịt chó',
        buttonText: 'Đặt lịch ngay',
        buttonLink: 'Xem dịch vụ'
    },
    about: {
        title: 'Về chúng tôi',
        intro: 'Công ty chúng tôi chuyên cung cấp dịch vụ xuất khẩu lao động...',
        history: 'Được thành lập từ năm 2010...',
        mission: 'Sứ mệnh của chúng tôi là...',
        vision: 'Tầm nhìn của chúng tôi là...'
    },
    guide: {
        title: 'Hướng dẫn xuất khẩu lao động',
        intro: 'Quy trình xuất khẩu lao động gồm các bước sau...',
        steps: 'Bước 1: Đăng ký hồ sơ\nBước 2: Khám sức khỏe\nBước 3: Học nghề...',
        requirements: 'Hộ chiếu\nBằng cấp\nGiấy khám sức khỏe...',
        notes: 'Lưu ý quan trọng khi làm hồ sơ...'
    },
    consultation: {
        title: 'Tư vấn xuất khẩu lao động',
        intro: 'Chúng tôi cung cấp dịch vụ tư vấn chuyên nghiệp...',
        services: 'Tư vấn chọn nghề\nTư vấn chọn quốc gia\nTư vấn hồ sơ...',
        contact: 'Hotline: 0123456789\nEmail: info@example.com',
        faq: 'Q: Thời gian làm hồ sơ bao lâu?\nA: Khoảng 3-6 tháng...'
    }
};

// Load sample data if no real data available
function loadSampleData() {
    Object.keys(sampleData).forEach(tabName => {
        window.adminDashboard.populateForm(tabName, sampleData[tabName]);
    });
}