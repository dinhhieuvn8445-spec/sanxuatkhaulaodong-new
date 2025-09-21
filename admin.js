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
        
        // Special handling for home tab - load header, home, and footer data
        if (tabName === 'home') {
            this.showLoading();
            try {
                // Load header data
                const headerResponse = await fetch('/api/admin/content/header');
                if (headerResponse.ok) {
                    const headerData = await headerResponse.json();
                    this.populateForm('header', headerData);
                }
                
                // Load home data
                const homeResponse = await fetch('/api/admin/content/home');
                if (homeResponse.ok) {
                    const homeData = await homeResponse.json();
                    this.populateForm('home', homeData);
                }
                
                // Load footer data
                const footerResponse = await fetch('/api/admin/content/footer');
                if (footerResponse.ok) {
                    const footerData = await footerResponse.json();
                    this.populateForm('footer', footerData);
                }
            } catch (error) {
                console.error('Error loading home tab content:', error);
                this.showMessage('Lỗi khi tải nội dung', 'error');
            } finally {
                this.hideLoading();
            }
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
            // Format salary display
            let salaryDisplay = 'Chưa cập nhật';
            if (item.salary_amount && item.salary_currency) {
                salaryDisplay = `${item.salary_amount} ${item.salary_currency}/${item.salary_period || 'tháng'}`;
            }
            
            // Format country display
            let countryDisplay = item.country || 'Chưa cập nhật';
            if (item.country_flag) {
                countryDisplay = `${item.country_flag} ${item.country}`;
            }
            
            // Format consultant display
            let consultantDisplay = item.consultant_name || 'Chưa cập nhật';
            if (item.consultant_phone) {
                consultantDisplay += ` (${item.consultant_phone})`;
            }
            
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${countryDisplay}</td>
                <td>${salaryDisplay}</td>
                <td>${item.requirements || 'Chưa cập nhật'}</td>
                <td>${item.deadline || 'Chưa cập nhật'}</td>
                <td>${consultantDisplay}</td>
                <td>${item.view_count || 0}</td>
                <td><span class="status-badge status-${item.is_active ? 'active' : 'inactive'}">${item.status_badge || (item.is_active ? 'Đang tuyển' : 'Tạm dừng')}</span></td>
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
    showJobForm();
}

async function viewJob(id) {
    try {
        const response = await fetch(`/api/admin/jobs/${id}`);
        const job = await response.json();
        
        if (job.error) {
            alert('Không tìm thấy đơn hàng');
            return;
        }
        
        showJobForm(job, true); // true = view mode
    } catch (error) {
        console.error('Error viewing job:', error);
        alert('Lỗi khi tải thông tin đơn hàng');
    }
}

async function editJob(id) {
    try {
        const response = await fetch(`/api/admin/jobs/${id}`);
        const job = await response.json();
        
        if (job.error) {
            alert('Không tìm thấy đơn hàng');
            return;
        }
        
        showJobForm(job, false); // false = edit mode
    } catch (error) {
        console.error('Error loading job for edit:', error);
        alert('Lỗi khi tải thông tin đơn hàng');
    }
}

async function deleteJob(id) {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        try {
            const response = await fetch(`/api/admin/jobs/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            
            if (result.success) {
                alert('Đã xóa đơn hàng thành công');
                // Reload jobs table
                adminDashboard.loadTableData('jobs');
            } else {
                alert('Lỗi khi xóa đơn hàng: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Lỗi khi xóa đơn hàng');
        }
    }
}

function showJobForm(jobData = null, viewMode = false) {
    const modal = document.getElementById('jobModal');
    const form = document.getElementById('jobForm');
    const modalTitle = document.getElementById('jobModalTitle');
    
    // Set modal title
    if (viewMode) {
        modalTitle.textContent = 'Chi tiết đơn hàng';
    } else if (jobData) {
        modalTitle.textContent = 'Chỉnh sửa đơn hàng';
    } else {
        modalTitle.textContent = 'Thêm đơn hàng mới';
    }
    
    // Reset form
    form.reset();
    
    // Fill form if editing
    if (jobData) {
        document.getElementById('jobId').value = jobData.id || '';
        document.getElementById('jobTitle').value = jobData.title || '';
        document.getElementById('jobCountry').value = jobData.country || '';
        document.getElementById('jobCountryFlag').value = jobData.country_flag || '';
        document.getElementById('jobSalaryAmount').value = jobData.salary_amount || '';
        document.getElementById('jobSalaryCurrency').value = jobData.salary_currency || '';
        document.getElementById('jobSalaryPeriod').value = jobData.salary_period || '';
        document.getElementById('jobRequirements').value = jobData.requirements || '';
        document.getElementById('jobDeadline').value = jobData.deadline || '';
        document.getElementById('jobImageUrl').value = jobData.image_url || '';
        document.getElementById('jobStatusBadge').value = jobData.status_badge || '';
        document.getElementById('jobConsultantName').value = jobData.consultant_name || '';
        document.getElementById('jobConsultantPhone').value = jobData.consultant_phone || '';
        document.getElementById('jobConsultantZalo').value = jobData.consultant_zalo || '';
        document.getElementById('jobConsultantFacebook').value = jobData.consultant_facebook || '';
        document.getElementById('jobViewCount').value = jobData.view_count || 0;
        document.getElementById('jobIsActive').checked = jobData.is_active == 1;
    }
    
    // Disable form if view mode
    const formElements = form.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        element.disabled = viewMode;
    });
    
    // Show/hide save button
    const saveButton = document.querySelector('#jobModal .btn-primary');
    if (saveButton) {
        saveButton.style.display = viewMode ? 'none' : 'inline-block';
    }
    
    // Show modal
    modal.style.display = 'block';
}

async function saveJob() {
    const form = document.getElementById('jobForm');
    const formData = new FormData(form);
    
    // Convert FormData to JSON with proper field mapping
    const jobData = {};
    const fieldMapping = {
        'jobId': 'id',
        'jobTitle': 'title',
        'jobCountry': 'country',
        'jobCountryFlag': 'country_flag',
        'jobSalaryAmount': 'salary_amount',
        'jobSalaryCurrency': 'salary_currency',
        'jobSalaryPeriod': 'salary_period',
        'jobRequirements': 'requirements',
        'jobDeadline': 'deadline',
        'jobImageUrl': 'image_url',
        'jobStatusBadge': 'status_badge',
        'jobConsultantName': 'consultant_name',
        'jobConsultantPhone': 'consultant_phone',
        'jobConsultantZalo': 'consultant_zalo',
        'jobConsultantFacebook': 'consultant_facebook',
        'jobViewCount': 'view_count'
    };
    
    for (let [key, value] of formData.entries()) {
        if (key === 'jobIsActive') {
            jobData['is_active'] = value === 'on' ? 1 : 0;
        } else if (fieldMapping[key]) {
            jobData[fieldMapping[key]] = value;
        }
    }
    
    // Handle checkbox for is_active
    if (!formData.has('jobIsActive')) {
        jobData['is_active'] = 0;
    }
    
    try {
        const response = await fetch('/api/admin/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Lưu đơn hàng thành công');
            closeJobModal();
            // Reload jobs table
            adminDashboard.loadTableData('jobs');
        } else {
            alert('Lỗi khi lưu đơn hàng: ' + result.message);
        }
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Lỗi khi lưu đơn hàng');
    }
}

function closeJobModal() {
    document.getElementById('jobModal').style.display = 'none';
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

// ===== DRAG & DROP IMAGE UPLOAD FUNCTIONALITY =====
class ImageUploadManager {
    constructor() {
        this.dragDropArea = null;
        this.fileInput = null;
        this.imagePreview = null;
        this.uploadProgress = null;
        this.currentImageUrl = '';
        this.init();
    }

    init() {
        this.setupDragDropArea();
        this.setupFileInput();
        this.setupUrlInput();
    }

    setupDragDropArea() {
        this.dragDropArea = document.getElementById('dragDropArea');
        this.imagePreview = document.getElementById('imagePreview');
        this.uploadProgress = document.getElementById('uploadProgress');

        if (!this.dragDropArea) return;

        // Drag and drop events
        this.dragDropArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dragDropArea.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.dragDropArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.dragDropArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // Click to browse
        this.dragDropArea.addEventListener('click', this.handleClick.bind(this));
        
        // Browse link click
        const browseLink = this.dragDropArea.querySelector('.browse-link');
        if (browseLink) {
            browseLink.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFileDialog();
            });
        }
    }

    setupFileInput() {
        this.fileInput = document.getElementById('imageFileInput');
        if (!this.fileInput) return;

        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    setupUrlInput() {
        const urlInput = document.getElementById('jobImageUrl');
        if (!urlInput) return;

        urlInput.addEventListener('input', this.handleUrlInput.bind(this));
        urlInput.addEventListener('blur', this.validateUrl.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dragDropArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Only remove drag-over if we're leaving the drag area completely
        if (!this.dragDropArea.contains(e.relatedTarget)) {
            this.dragDropArea.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dragDropArea.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFiles(files);
        }
    }

    handleClick(e) {
        // Don't trigger file dialog if clicking on input or buttons
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        this.openFileDialog();
    }

    openFileDialog() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            this.handleFiles(files);
        }
    }

    handleFiles(files) {
        const file = files[0];
        
        // Validate file type
        if (!this.isValidImageFile(file)) {
            this.showError('Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, GIF, WebP)');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('Kích thước file không được vượt quá 5MB');
            return;
        }

        this.uploadFile(file);
    }

    isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type);
    }

    async uploadFile(file) {
        try {
            // Show upload progress
            this.showUploadProgress();
            
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('image', file);
            
            // Start upload progress animation
            this.simulateUploadProgress();
            
            // Upload to server
            const response = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Complete progress animation
                await this.completeUploadProgress();
                
                // Show preview with server URL
                this.showImagePreview(result.image_url);
                
                // Update the URL input
                const urlInput = document.getElementById('jobImageUrl');
                if (urlInput) {
                    urlInput.value = result.image_url;
                }
                
                this.currentImageUrl = result.image_url;
                this.hideUploadProgress();
                
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            
        } catch (error) {
            console.error('Upload error:', error);
            this.showError(error.message || 'Có lỗi xảy ra khi tải lên hình ảnh');
            this.hideUploadProgress();
        }
    }

    simulateUploadProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 95) {
                clearInterval(interval);
            }
        }, 100);
    }

    completeUploadProgress() {
        return new Promise(resolve => {
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = '100%';
            
            setTimeout(resolve, 300);
        });
    }

    waitForUpload() {
        return new Promise(resolve => {
            setTimeout(() => {
                const progressFill = document.getElementById('progressFill');
                const progressText = document.getElementById('progressText');
                
                if (progressFill) progressFill.style.width = '100%';
                if (progressText) progressText.textContent = '100%';
                
                setTimeout(resolve, 300);
            }, 1500);
        });
    }

    handleUrlInput(e) {
        const url = e.target.value.trim();
        if (url && this.isValidUrl(url)) {
            this.showImagePreview(url);
            this.currentImageUrl = url;
        } else if (!url) {
            this.hideImagePreview();
        }
    }

    validateUrl(e) {
        const url = e.target.value.trim();
        if (url && !this.isValidUrl(url)) {
            this.showError('URL hình ảnh không hợp lệ');
            e.target.focus();
        }
    }

    isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    showImagePreview(imageUrl) {
        const dragDropContent = this.dragDropArea.querySelector('.drag-drop-content');
        const previewImg = document.getElementById('previewImg');
        
        if (previewImg) {
            previewImg.src = imageUrl;
            previewImg.onload = () => {
                dragDropContent.style.display = 'none';
                this.imagePreview.style.display = 'block';
            };
            previewImg.onerror = () => {
                this.showError('Không thể tải hình ảnh từ URL này');
                this.hideImagePreview();
            };
        }
    }

    hideImagePreview() {
        const dragDropContent = this.dragDropArea.querySelector('.drag-drop-content');
        if (dragDropContent) dragDropContent.style.display = 'block';
        if (this.imagePreview) this.imagePreview.style.display = 'none';
        this.currentImageUrl = '';
    }

    showUploadProgress() {
        if (this.uploadProgress) {
            this.uploadProgress.style.display = 'block';
        }
    }

    hideUploadProgress() {
        if (this.uploadProgress) {
            this.uploadProgress.style.display = 'none';
        }
    }

    showError(message) {
        // Remove any existing error state
        this.dragDropArea.classList.remove('drag-error');
        
        // Add error state
        this.dragDropArea.classList.add('drag-error');
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'upload-error';
        errorDiv.style.cssText = `
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: #e74c3c;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
        `;
        errorDiv.textContent = message;
        
        this.dragDropArea.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            this.dragDropArea.classList.remove('drag-error');
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

// Global function to remove image
function removeImage() {
    const imageUploadManager = window.imageUploadManager;
    if (imageUploadManager) {
        imageUploadManager.hideImagePreview();
        
        // Clear the URL input
        const urlInput = document.getElementById('jobImageUrl');
        if (urlInput) {
            urlInput.value = '';
        }
        
        // Clear file input
        const fileInput = document.getElementById('imageFileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    }
}

// ===== LOGO & BANNER UPLOAD MANAGERS =====
class LogoUploadManager extends ImageUploadManager {
    constructor() {
        super();
        this.dragDropArea = document.getElementById('logoDropArea');
        this.fileInput = document.getElementById('logoFileInput');
        this.imagePreview = document.getElementById('logoPreview');
        this.uploadProgress = document.getElementById('logoUploadProgress');
        this.hiddenInput = document.getElementById('headerLogo');
        this.previewImg = document.getElementById('logoPreviewImg');
        this.progressFill = document.getElementById('logoProgressFill');
        this.progressText = document.getElementById('logoProgressText');
        this.init();
    }

    init() {
        if (!this.dragDropArea) return;
        this.setupDragDropArea();
        this.setupFileInput();
    }

    setupDragDropArea() {
        // Drag and drop events
        this.dragDropArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dragDropArea.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.dragDropArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.dragDropArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // Click to browse
        this.dragDropArea.addEventListener('click', this.handleClick.bind(this));
        
        // Browse link click
        const browseLink = this.dragDropArea.querySelector('.browse-link');
        if (browseLink) {
            browseLink.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFileDialog();
            });
        }
    }

    async uploadFile(file) {
        try {
            this.showUploadProgress();
            this.simulateUploadProgress();
            
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                await this.completeUploadProgress();
                this.showImagePreview(result.image_url);
                
                if (this.hiddenInput) {
                    this.hiddenInput.value = result.image_url;
                }
                
                this.currentImageUrl = result.image_url;
                this.hideUploadProgress();
                this.dragDropArea.classList.add('upload-success');
                
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            
        } catch (error) {
            console.error('Logo upload error:', error);
            this.showError(error.message || 'Có lỗi xảy ra khi tải lên logo');
            this.hideUploadProgress();
        }
    }

    showImagePreview(imageUrl) {
        const dragDropContent = this.dragDropArea.querySelector('.drag-drop-content');
        
        if (this.previewImg) {
            this.previewImg.src = imageUrl;
            this.previewImg.onload = () => {
                dragDropContent.style.display = 'none';
                this.imagePreview.style.display = 'block';
            };
            this.previewImg.onerror = () => {
                this.showError('Không thể tải logo từ URL này');
                this.hideImagePreview();
            };
        }
    }

    simulateUploadProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            
            if (this.progressFill) this.progressFill.style.width = progress + '%';
            if (this.progressText) this.progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 95) {
                clearInterval(interval);
            }
        }, 100);
    }

    completeUploadProgress() {
        return new Promise(resolve => {
            if (this.progressFill) this.progressFill.style.width = '100%';
            if (this.progressText) this.progressText.textContent = '100%';
            setTimeout(resolve, 300);
        });
    }
}

class BannerUploadManager extends ImageUploadManager {
    constructor() {
        super();
        this.dragDropArea = document.getElementById('bannerDropArea');
        this.fileInput = document.getElementById('bannerFileInput');
        this.imagePreview = document.getElementById('bannerPreview');
        this.uploadProgress = document.getElementById('bannerUploadProgress');
        this.hiddenInput = document.getElementById('headerBanner');
        this.previewImg = document.getElementById('bannerPreviewImg');
        this.progressFill = document.getElementById('bannerProgressFill');
        this.progressText = document.getElementById('bannerProgressText');
        this.init();
    }

    init() {
        if (!this.dragDropArea) return;
        this.setupDragDropArea();
        this.setupFileInput();
    }

    setupDragDropArea() {
        // Drag and drop events
        this.dragDropArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dragDropArea.addEventListener('dragenter', this.handleDragEnter.bind(this));
        this.dragDropArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.dragDropArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // Click to browse
        this.dragDropArea.addEventListener('click', this.handleClick.bind(this));
        
        // Browse link click
        const browseLink = this.dragDropArea.querySelector('.browse-link');
        if (browseLink) {
            browseLink.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFileDialog();
            });
        }
    }

    async uploadFile(file) {
        try {
            this.showUploadProgress();
            this.simulateUploadProgress();
            
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                await this.completeUploadProgress();
                this.showImagePreview(result.image_url);
                
                if (this.hiddenInput) {
                    this.hiddenInput.value = result.image_url;
                }
                
                this.currentImageUrl = result.image_url;
                this.hideUploadProgress();
                this.dragDropArea.classList.add('upload-success');
                
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            
        } catch (error) {
            console.error('Banner upload error:', error);
            this.showError(error.message || 'Có lỗi xảy ra khi tải lên banner');
            this.hideUploadProgress();
        }
    }

    showImagePreview(imageUrl) {
        const dragDropContent = this.dragDropArea.querySelector('.drag-drop-content');
        
        if (this.previewImg) {
            this.previewImg.src = imageUrl;
            this.previewImg.onload = () => {
                dragDropContent.style.display = 'none';
                this.imagePreview.style.display = 'block';
            };
            this.previewImg.onerror = () => {
                this.showError('Không thể tải banner từ URL này');
                this.hideImagePreview();
            };
        }
    }

    simulateUploadProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            
            if (this.progressFill) this.progressFill.style.width = progress + '%';
            if (this.progressText) this.progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 95) {
                clearInterval(interval);
            }
        }, 100);
    }

    completeUploadProgress() {
        return new Promise(resolve => {
            if (this.progressFill) this.progressFill.style.width = '100%';
            if (this.progressText) this.progressText.textContent = '100%';
            setTimeout(resolve, 300);
        });
    }
}

// Global functions for remove buttons
function removeLogo() {
    const logoManager = window.logoUploadManager;
    if (logoManager) {
        logoManager.hideImagePreview();
        logoManager.dragDropArea.classList.remove('upload-success');
        
        const hiddenInput = document.getElementById('headerLogo');
        if (hiddenInput) hiddenInput.value = '';
        
        const fileInput = document.getElementById('logoFileInput');
        if (fileInput) fileInput.value = '';
    }
}

function removeBanner() {
    const bannerManager = window.bannerUploadManager;
    if (bannerManager) {
        bannerManager.hideImagePreview();
        bannerManager.dragDropArea.classList.remove('upload-success');
        
        const hiddenInput = document.getElementById('headerBanner');
        if (hiddenInput) hiddenInput.value = '';
        
        const fileInput = document.getElementById('bannerFileInput');
        if (fileInput) fileInput.value = '';
    }
}

// Initialize image upload managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure all elements are rendered
    setTimeout(() => {
        window.imageUploadManager = new ImageUploadManager();
        window.logoUploadManager = new LogoUploadManager();
        window.bannerUploadManager = new BannerUploadManager();
    }, 500);
});