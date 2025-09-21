// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentTab = 'dashboard';
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
        // Special handling for dashboard and table-based tabs
        if (tabName === 'dashboard') {
            this.loadDashboardStats();
            return;
        }
        
        if (['countries', 'jobs', 'orders', 'applications', 'partners', 'users'].includes(tabName)) {
            this.loadTableData(tabName);
            return;
        }
        
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
        const forms = ['headerForm', 'homeForm', 'aboutForm', 'guideForm', 'consultationForm', 'footerForm', 'settingsForm'];
        
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

// Add new methods to AdminDashboard class
AdminDashboard.prototype.loadDashboardStats = async function() {
    try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (response.ok) {
            const stats = await response.json();
            document.getElementById('totalJobs').textContent = stats.totalJobs || '0';
            document.getElementById('totalApplications').textContent = stats.totalApplications || '0';
            document.getElementById('totalCountries').textContent = stats.totalCountries || '0';
            document.getElementById('totalUsers').textContent = stats.totalUsers || '0';
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Fallback to default values
        document.getElementById('totalJobs').textContent = '0';
        document.getElementById('totalApplications').textContent = '0';
        document.getElementById('totalCountries').textContent = '0';
        document.getElementById('totalUsers').textContent = '0';
    }
};

AdminDashboard.prototype.loadTableData = async function(tableName) {
    const tableBody = document.querySelector(`#${tableName}Table tbody`);
    if (!tableBody) return;
    
    try {
        const response = await fetch(`/api/admin/${tableName}`);
        if (response.ok) {
            const data = await response.json();
            tableBody.innerHTML = '';
            
            data.forEach((item, index) => {
                const row = this.createTableRow(tableName, item, index + 1);
                tableBody.appendChild(row);
            });
        } else {
            console.error(`Failed to load ${tableName} data`);
            tableBody.innerHTML = '<tr><td colspan="100%" style="text-align: center; color: #e74c3c;">Không thể tải dữ liệu</td></tr>';
        }
    } catch (error) {
        console.error(`Error loading ${tableName} data:`, error);
        tableBody.innerHTML = '<tr><td colspan="100%" style="text-align: center; color: #e74c3c;">Lỗi khi tải dữ liệu</td></tr>';
    }
};

AdminDashboard.prototype.createTableRow = function(tableName, item, index) {
    const row = document.createElement('tr');
    
    switch(tableName) {
        case 'countries':
            row.innerHTML = `
                <td>${index}</td>
                <td>${item.name}</td>
                <td><img src="${item.flag_url}" alt="${item.name}" class="country-flag"></td>
                <td>${item.job_count}</td>
                <td><span class="status-badge status-${item.status}">${item.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="editCountry(${item.id})">Sửa</button>
                    <button class="btn-sm btn-delete" onclick="deleteCountry(${item.id})">Xóa</button>
                </td>
            `;
            break;
        case 'jobs':
            row.innerHTML = `
                <td>${index}</td>
                <td>${item.title}</td>
                <td>${item.country_name || 'N/A'}</td>
                <td>${item.salary_range}</td>
                <td>${item.deadline}</td>
                <td><span class="status-badge status-${item.status}">${item.status === 'active' ? 'Đang tuyển' : 'Tạm dừng'}</span></td>
                <td>
                    <button class="btn-sm btn-view" onclick="viewJob(${item.id})">Xem</button>
                    <button class="btn-sm btn-edit" onclick="editJob(${item.id})">Sửa</button>
                    <button class="btn-sm btn-delete" onclick="deleteJob(${item.id})">Xóa</button>
                </td>
            `;
            break;
        case 'orders':
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.customer_name}</td>
                <td>${item.service_type}</td>
                <td>${new Intl.NumberFormat('vi-VN').format(item.amount)} VNĐ</td>
                <td>${new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                <td><span class="status-badge status-${item.status}">${this.getStatusText(item.status)}</span></td>
                <td>
                    <button class="btn-sm btn-view" onclick="viewOrder('${item.id}')">Xem</button>
                    <button class="btn-sm btn-edit" onclick="editOrder('${item.id}')">Sửa</button>
                </td>
            `;
            break;
        case 'applications':
            row.innerHTML = `
                <td>${index}</td>
                <td>${item.full_name}</td>
                <td>${item.job_title || 'N/A'}</td>
                <td>${new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                <td><span class="status-badge status-${item.status}">${this.getStatusText(item.status)}</span></td>
                <td>
                    <button class="btn-sm btn-view" onclick="viewApplication(${item.id})">Xem</button>
                    <button class="btn-sm btn-approve" onclick="approveApplication(${item.id})">Duyệt</button>
                    <button class="btn-sm btn-delete" onclick="rejectApplication(${item.id})">Từ chối</button>
                </td>
            `;
            break;
        case 'partners':
            row.innerHTML = `
                <td>${index}</td>
                <td><img src="${item.logo_url}" alt="${item.name}" class="image-preview"></td>
                <td>${item.name}</td>
                <td><a href="${item.website}" target="_blank">${item.website}</a></td>
                <td><span class="status-badge status-${item.status}">${item.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="editPartner(${item.id})">Sửa</button>
                    <button class="btn-sm btn-delete" onclick="deletePartner(${item.id})">Xóa</button>
                </td>
            `;
            break;
        case 'users':
            row.innerHTML = `
                <td>${index}</td>
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td>${new Date(item.created_at).toLocaleDateString('vi-VN')}</td>
                <td><span class="status-badge status-${item.status}">${item.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="editUser(${item.id})">Sửa</button>
                    <button class="btn-sm btn-delete" onclick="deleteUser(${item.id})">Xóa</button>
                </td>
            `;
            break;
    }
    
    return row;
};

AdminDashboard.prototype.getStatusText = function(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy',
        'new': 'Mới',
        'reviewing': 'Đang xem xét',
        'approved': 'Đã duyệt',
        'rejected': 'Từ chối',
        'active': 'Hoạt động',
        'inactive': 'Tạm dừng'
    };
    return statusMap[status] || status;
};

// Global functions for table actions
function addCountry() {
    alert('Chức năng thêm quốc gia sẽ được phát triển');
}

function editCountry(id) {
    alert(`Chỉnh sửa quốc gia ID: ${id}`);
}

function deleteCountry(id) {
    if (confirm('Bạn có chắc chắn muốn xóa quốc gia này?')) {
        alert(`Đã xóa quốc gia ID: ${id}`);
    }
}

function addJob() {
    alert('Chức năng thêm việc làm sẽ được phát triển');
}

function viewJob(id) {
    alert(`Xem chi tiết việc làm ID: ${id}`);
}

function editJob(id) {
    alert(`Chỉnh sửa việc làm ID: ${id}`);
}

function deleteJob(id) {
    if (confirm('Bạn có chắc chắn muốn xóa việc làm này?')) {
        alert(`Đã xóa việc làm ID: ${id}`);
    }
}

function viewOrder(id) {
    alert(`Xem chi tiết đơn hàng: ${id}`);
}

function editOrder(id) {
    alert(`Chỉnh sửa đơn hàng: ${id}`);
}

function viewApplication(id) {
    alert(`Xem hồ sơ ứng tuyển ID: ${id}`);
}

function approveApplication(id) {
    if (confirm('Bạn có chắc chắn muốn duyệt hồ sơ này?')) {
        alert(`Đã duyệt hồ sơ ID: ${id}`);
    }
}

function rejectApplication(id) {
    if (confirm('Bạn có chắc chắn muốn từ chối hồ sơ này?')) {
        alert(`Đã từ chối hồ sơ ID: ${id}`);
    }
}

function addPartner() {
    alert('Chức năng thêm đối tác sẽ được phát triển');
}

function editPartner(id) {
    alert(`Chỉnh sửa đối tác ID: ${id}`);
}

function deletePartner(id) {
    if (confirm('Bạn có chắc chắn muốn xóa đối tác này?')) {
        alert(`Đã xóa đối tác ID: ${id}`);
    }
}

function addUser() {
    alert('Chức năng thêm người dùng sẽ được phát triển');
}

function editUser(id) {
    alert(`Chỉnh sửa người dùng ID: ${id}`);
}

function deleteUser(id) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        alert(`Đã xóa người dùng ID: ${id}`);
    }
}