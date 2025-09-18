// Jobs page functionality

// Sample job data (similar to the original website)
const jobsData = [
    {
        id: 1,
        title: "Tuyển 06 Nam Nữ trồng, chăm sóc, thu hoạch rau tại Đài Viên, Đài Bắc [Lấy đến 40 tuổi]",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2004)",
        deadline: "01/10/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "13798",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 2,
        title: "Nhà máy Mỹ Đề tuyển 05 nữ làm bánh mì, bánh ngọt tại Đài Loan",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nữ",
        ageRange: "(1985 - 2004)",
        deadline: "Liên tục",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "3424",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 3,
        title: "[Đơn miễn phí] Tập Đoàn Điện Tử Fomosa Đài Loan tuyển 150 nam nữ",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(2002 - 2007)",
        deadline: "01/10/2025",
        consultant: "Phạm Xuân Trường",
        phone: "0968803554",
        views: "9051",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/1541/medium/250906173259-dai-loan-0609.png"
    },
    {
        id: 4,
        title: "Tuyển 08 Nam Nữ sản xuất bánh kẹo tại Đài Trung, Đài Loan",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(1990 - 2006)",
        deadline: "30/09/2025",
        consultant: "Mr. Trường",
        phone: "0918705886",
        views: "36795",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 5,
        title: "Tuyển 12 Nam Nữ chế biến thuỷ sản tại Vân Lâm, Đài Trung",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Triệu",
        gender: "Nam, Nữ",
        ageRange: "(1987 - 2006)",
        deadline: "29/09/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "13166",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 6,
        title: "Tuyển 20 Nữ điện tử làm việc tại Đào Viên, Đài Loan",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nữ",
        ageRange: "(1990 - 2007)",
        deadline: "30/09/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "20112",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 7,
        title: "[Đơn truyền thống] Tuyển 20 nữ làm bánh mì, bánh ngọt tại Osaka, Nhật Bản",
        country: "japan",
        countryName: "TTS Nhật Bản",
        flag: "🇯🇵",
        salary: "185,000",
        currency: "Yên",
        gender: "Nữ",
        ageRange: "(1995 - 2007)",
        deadline: "22/09/2025",
        consultant: "Mr. Tấn",
        phone: "0356111283",
        views: "3872",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/544/medium/250711164151-nhat-ban-1107-4.png"
    },
    {
        id: 8,
        title: "Tuyển 10 Nam Nữ sản xuất linh kiện ô tô tại Đài Loan [Phí thấp]",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(1987 - 2004)",
        deadline: "30/09/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "20463",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 9,
        title: "Tuyển 20 Nam Nữ giặt là tại Tân Bắc, Đài Loan. Tăng ca 3 - 4h/ngày",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1989 - 2000)",
        deadline: "03/10/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "4027",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 10,
        title: "Tuyển sll nhân viên hộ lý làm việc tại các viện dưỡng lão của Đài Loan",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28.59",
        currency: "Đài tệ",
        gender: "",
        ageRange: "(1983 - 1997)",
        deadline: "Liên tục",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "711",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 11,
        title: "Tuyển 45 nam thợ xây dựng lương cao làm việc tại Singapore",
        country: "singapore",
        countryName: "Singapore",
        flag: "🇸🇬",
        salary: "1,056",
        currency: "Đô Sing",
        gender: "Nam",
        ageRange: "(1981 - 2007)",
        deadline: "30/09/2025",
        consultant: "Mr Hải",
        phone: "0364370000",
        views: "11997",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7624/medium/250711164151-singapore-1107-4.png"
    },
    {
        id: 12,
        title: "Tuyển gấp 01 nam quản lý tại Đài Loan [35.000 đài tệ + trợ cấp.]",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "35,000",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1985 - 2000)",
        deadline: "Liên tục",
        consultant: "Phạm Xuân Trường",
        phone: "0968803554",
        views: "166",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/1541/medium/250906173259-dai-loan-0609.png"
    },
    {
        id: 13,
        title: "Thợ Giặt Là Bulgaria- Đơn truyền thống TN tốt",
        country: "bulgaria",
        countryName: "Bulgaria",
        flag: "🇧🇬",
        salary: "24-30",
        currency: "Triệu",
        gender: "Nam, Nữ",
        ageRange: "(1980 - 2005)",
        deadline: "Liên tục",
        consultant: "Phương Mỹ Linh",
        phone: "0362046120",
        views: "212",
        isHot: true,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/8537/medium/250916103222-white-and-grey-clean-informative-job-post-facebook-post.png"
    },
    {
        id: 14,
        title: "Gấp gấp: 08 nam xây dựng sẵn giáy tờ chỉ cần quay video thể lực, không cần pv",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28.59",
        currency: "Đài tệ",
        gender: "",
        ageRange: "(1982 - 2005)",
        deadline: "Liên tục",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "750",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 15,
        title: "Tuyển 30 Thợ Xây Dựng Công Trình Đài Bắc",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1980 - 2000)",
        deadline: "Liên tục",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "11432",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 16,
        title: "Tuyển 15 nữ hộ lý làm việc tại viện dưỡng lão Đài Nam",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "22.00",
        currency: "Triệu",
        gender: "Nữ",
        ageRange: "(1987 - 2000)",
        deadline: "26/09/2025",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "3498",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 17,
        title: "Tuyển 05 nam làm việc trong nhà máy sản xuất bao bì tại Tân Trúc, Đài Bắc",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1987 - 2004)",
        deadline: "06/10/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "6636",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 18,
        title: "Tuyển 03 Nam làm cơ khí tại Tân Bắc, Đài Bắc [Làm thêm nhiều]",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1985 - 2004)",
        deadline: "10/10/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "4909",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 19,
        title: "Đơn Đài loan miễn phí MG",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "25.00",
        currency: "Triệu",
        gender: "Nam, Nữ",
        ageRange: "(1990 - 2007)",
        deadline: "26/09/2026",
        consultant: "Nguyễn Xuân Đạo",
        phone: "0965887491",
        views: "1004",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/6572/medium/250711164151-dai-loan-1107-4.png"
    },
    {
        id: 20,
        title: "Cần gấp 03 nam làm xưởng cơ khí, thao tác máy CNC",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "",
        ageRange: "(1990 - 2003)",
        deadline: "Liên tục",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "513",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    }
];

let currentPage = 1;
let itemsPerPage = 20;
let filteredJobs = [...jobsData];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
    setupEventListeners();
});

function setupEventListeners() {
    // Search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterJobs();
        });
    }

    // Filter selects
    const filterSelects = document.querySelectorAll('.form-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterJobs);
    });

    // Country navigation
    const countryLinks = document.querySelectorAll('[data-country]');
    countryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const country = this.getAttribute('data-country');
            filterByCountry(country);
        });
    });

    // Pagination
    const pageButtons = document.querySelectorAll('.btn-page');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.textContent);
            if (!isNaN(page)) {
                currentPage = page;
                loadJobs();
                updatePagination();
            }
        });
    });

    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                loadJobs();
                updatePagination();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadJobs();
                updatePagination();
            }
        });
    }
}

function filterJobs() {
    const formData = new FormData(document.querySelector('.search-form'));
    const filters = {
        country: formData.get('country'),
        industry: formData.get('industry'),
        location: formData.get('location'),
        gender: formData.get('gender'),
        birth_year: formData.get('birth_year')
    };

    filteredJobs = jobsData.filter(job => {
        if (filters.country && job.country !== filters.country) return false;
        if (filters.gender && filters.gender === 'male' && !job.gender.includes('Nam')) return false;
        if (filters.gender && filters.gender === 'female' && !job.gender.includes('Nữ')) return false;
        return true;
    });

    currentPage = 1;
    loadJobs();
    updateJobsCount();
    updatePagination();
}

function filterByCountry(country) {
    // Reset form
    document.querySelector('.search-form').reset();
    
    // Set country filter
    const countrySelect = document.querySelector('select[name="country"]');
    if (countrySelect) {
        countrySelect.value = country;
    }

    filteredJobs = jobsData.filter(job => job.country === country);
    currentPage = 1;
    loadJobs();
    updateJobsCount();
    updatePagination();
}

function loadJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);

    container.innerHTML = '';

    jobsToShow.forEach(job => {
        const jobCard = createJobCard(job);
        container.appendChild(jobCard);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    
    // Get consultant initials for avatar
    const consultantInitials = job.consultant.split(' ').map(name => name[0]).join('').toUpperCase();
    
    card.innerHTML = `
        <div class="job-header">
            <div class="consultant-info">
                <div class="consultant-avatar">${consultantInitials}</div>
                <div class="consultant-details">
                    <div class="consultant-name">Tư vấn: ${job.consultant}</div>
                    <div class="consultant-phone">${job.phone}</div>
                </div>
            </div>
            <div class="contact-icons">
                <a href="https://zalo.me/${job.phone}" class="zalo-icon" target="_blank">Z</a>
                <a href="#" class="facebook-icon" target="_blank">f</a>
            </div>
        </div>
        
        <div class="job-image">
            <img src="${job.image}" alt="Job Image" />
            <div class="job-country-flag ${job.country}">
                ${job.flag} ${job.countryName}
            </div>
        </div>
        
        <div class="job-salary-info">
            ${job.salary} ${job.currency}/tháng
        </div>
        
        <div class="job-requirements">
            ${job.gender} ${job.ageRange}
        </div>
        
        <div class="job-deadline">
            Tuyển: ${job.deadline}
        </div>
        
        <div class="job-content">
            <h3 class="job-title">
                <a href="#" onclick="viewJobDetails(${job.id})">${job.title}</a>
            </h3>
            
            <div class="job-consultant">
                <div class="consultant-avatar-small">${consultantInitials}</div>
                <div class="consultant-info-small">
                    <div class="consultant-name-small">Tư vấn: ${job.consultant}</div>
                    <div class="consultant-phone-small">${job.phone}</div>
                </div>
                <div class="contact-icons">
                    <a href="https://zalo.me/${job.phone}" class="zalo-icon" target="_blank">Z</a>
                    <a href="#" class="facebook-icon" target="_blank">f</a>
                </div>
            </div>
            
            <div class="job-actions">
                <button class="btn-consult" onclick="consultJob(${job.id})">TƯ VẤN GIÚP TÔI</button>
                <div class="job-views">
                    <i class="fas fa-eye"></i>
                    <span>${job.views}</span>
                </div>
            </div>
        </div>
    `;

    return card;
}

function updateJobsCount() {
    const countElement = document.getElementById('jobs-count');
    if (countElement) {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, filteredJobs.length);
        countElement.innerHTML = `Hiển thị <strong>${startIndex}-${endIndex}</strong> đơn hàng từ tổng số <strong>${filteredJobs.length}</strong> đơn hàng`;
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }

    // Update page numbers
    const pageButtons = document.querySelectorAll('.btn-page');
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === currentPage) {
            btn.classList.add('active');
        }
    });
}

function viewJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        alert(`Chi tiết công việc: ${job.title}\n\nChức năng này sẽ được phát triển sau!`);
    }
}

function consultJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        alert(`Tư vấn cho công việc: ${job.title}\n\nLiên hệ: ${job.consultant} - ${job.phone}\n\nChức năng này sẽ được phát triển sau!`);
    }
}

// Initialize page
updateJobsCount();
updatePagination();