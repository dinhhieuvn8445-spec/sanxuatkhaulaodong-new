// Basic JavaScript functionality for the website

// Page Navigation Function
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    return false; // Prevent default link behavior
}

document.addEventListener('DOMContentLoaded', function() {
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Tìm kiếm đơn hàng - Chức năng này sẽ được phát triển sau!');
        });
    }

    // Consult buttons functionality
    const consultBtns = document.querySelectorAll('.consult-btn');
    consultBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Tư vấn giúp tôi - Chức năng này sẽ được phát triển sau!');
        });
    });

    // Login buttons functionality
    const loginBtns = document.querySelectorAll('.btn-success, .btn-primary');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Ứng viên')) {
                alert('Đăng nhập ứng viên - Chức năng này sẽ được phát triển sau!');
            } else if (this.textContent.includes('Nhà tuyển dụng')) {
                alert('Đăng nhập nhà tuyển dụng - Chức năng này sẽ được phát triển sau!');
            }
        });
    });

    // Load more functionality
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loadMoreJobs();
        });
    }

    // View more candidates functionality
    const viewMoreBtn = document.querySelector('.btn-view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Xem thêm ứng viên - Chức năng này sẽ được phát triển sau!');
        });
    }

    // Job title links functionality
    const jobLinks = document.querySelectorAll('.job-title a');
    jobLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chi tiết công việc - Chức năng này sẽ được phát triển sau!');
        });
    });

    // Country links functionality
    const countryLinks = document.querySelectorAll('.country-list a');
    countryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const countryName = this.textContent.trim().split(' ')[0];
            alert(`Xem việc làm tại ${countryName} - Chức năng này sẽ được phát triển sau!`);
        });
    });

    // Basic page functionality

    // Footer links functionality
    const footerLinks = document.querySelectorAll('.footer-col a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            alert(`Chuyển đến trang ${linkText} - Chức năng này sẽ được phát triển sau!`);
        });
    });

    // Social media links functionality
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Kết nối mạng xã hội - Chức năng này sẽ được phát triển sau!');
        });
    });

    // Contact icons functionality
    const contactIcons = document.querySelectorAll('.contact-icons a');
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('zalo-icon')) {
                alert('Liên hệ qua Zalo - Chức năng này sẽ được phát triển sau!');
            } else if (this.classList.contains('facebook-icon')) {
                alert('Liên hệ qua Facebook - Chức năng này sẽ được phát triển sau!');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation for job cards
    const jobCards = document.querySelectorAll('.job-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    jobCards.forEach(card => {
        observer.observe(card);
    });

    // Add search functionality to form selects
    const formSelects = document.querySelectorAll('.form-select');
    formSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Selected: ${this.name} = ${this.value}`);
        });
    });

    // Add hover effects to job cards
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });

    // Add click tracking for analytics (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.job-card, .job-card *')) {
            console.log('Job card clicked');
        }
        if (e.target.matches('.consult-btn')) {
            console.log('Consult button clicked');
        }
        if (e.target.matches('.country-list a')) {
            console.log('Country link clicked');
        }
    });

    console.log('Website loaded successfully!');
});

// Utility functions
function formatCurrency(amount, currency) {
    return `${amount.toLocaleString()} ${currency}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Additional job data for "Load More" functionality
const additionalJobs = [
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553002468184"
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553090643077"
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553090643077"
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/544/medium/250711164151-nhat-ban-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553002468184"
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/4562/medium/250711164151-dai-loan-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553090643077"
    },
    {
        id: 9,
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
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7624/medium/250711164151-singapore-1107-4.png",
        facebook: "https://www.facebook.com/profile.php?id=61553002468184"
    },
    {
        id: 10,
        title: "Đơn hàng tổng hợp - Bulgaria cho người không kinh nghiệm, không ngôn ngữ, không tay nghề",
        country: "bulgaria",
        countryName: "Bulgaria",
        flag: "🇧🇬",
        salary: "600-800",
        currency: "Usd",
        gender: "Nam, Nữ",
        ageRange: "(1980 - 2007)",
        deadline: "Liên tục",
        consultant: "Phương Mỹ Linh",
        phone: "0362046120",
        views: "2928",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/8537/medium/250916103222-white-and-grey-clean-informative-job-post-facebook-post.png"
    },
    {
        id: 11,
        title: "Đóng tàu Vard - Rumani",
        country: "romania",
        countryName: "Rumani",
        flag: "🇷🇴",
        salary: "750.00",
        currency: "Usd",
        gender: "Nam",
        ageRange: "(1975 - 2007)",
        deadline: "17/09/2025",
        consultant: "Đào Như Ngọc",
        phone: "0865983982",
        views: "1067",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/8537/medium/250916103222-white-and-grey-clean-informative-job-post-facebook-post.png"
    },
    {
        id: 12,
        title: "Gấp gấp: 08 nam xây dựng sẵn giấy tờ chỉ cần quay video thể lực, không cần pv",
        country: "taiwan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28.59",
        currency: "Đài tệ",
        gender: "Nam",
        ageRange: "(1982 - 2005)",
        deadline: "Liên tục",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "750",
        isHot: false,
        image: "https://sanxuatkhaulaodong.com/upload/gallery/7398/medium/250711164151-dai-loan-1107-4.png"
    }
];

let currentJobsDisplayed = 3; // Initially showing 3 jobs

function loadMoreJobs() {
    const jobsContainer = document.querySelector('.job-grid');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    if (!jobsContainer) {
        console.log('Jobs container not found');
        return;
    }
    
    // Show 3 more jobs each time
    const jobsToShow = additionalJobs.slice(currentJobsDisplayed - 3, currentJobsDisplayed + 3);
    
    console.log(`Loading ${jobsToShow.length} more jobs`);
    
    jobsToShow.forEach(job => {
        const jobCard = createJobCardForHomepage(job);
        jobsContainer.appendChild(jobCard);
    });
    
    currentJobsDisplayed += 3;
    
    // Hide "Load More" button if no more jobs
    if (currentJobsDisplayed >= additionalJobs.length + 3) {
        loadMoreBtn.style.display = 'none';
    }
}

function createJobCardForHomepage(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    
    // Get flag image based on country
    let flagImage = 'https://sanxuatkhaulaodong.com/upload/2023/10/2-co-dai-loan-medium.png'; // default
    if (job.country === 'bulgaria') {
        flagImage = 'https://sanxuatkhaulaodong.com/upload/2022/11/8-co-bulgari-medium.png';
    } else if (job.country === 'japan') {
        flagImage = 'https://sanxuatkhaulaodong.com/upload/2023/10/2-co-nhat-ban-medium.png';
    } else if (job.country === 'singapore') {
        flagImage = 'https://sanxuatkhaulaodong.com/upload/2023/10/2-co-singapore-medium.png';
    } else if (job.country === 'romania') {
        flagImage = 'https://sanxuatkhaulaodong.com/upload/2023/10/2-co-rumani-medium.png';
    }
    
    card.innerHTML = `
        <div class="job-image">
            <img src="${job.image}" alt="Job Image">
            <div class="job-flag">
                <img src="${flagImage}" alt="${job.countryName}">
            </div>
            ${job.isHot ? '<div class="job-hot">HOT</div>' : ''}
        </div>
        <div class="job-content">
            <div class="job-salary">${job.salary} <span class="currency">${job.currency}</span>/tháng</div>
            <div class="job-requirements">${job.gender} ${job.ageRange}</div>
            <div class="job-deadline">Tuyển: ${job.deadline}</div>
            <h3 class="job-title">
                <a href="#" onclick="viewJobDetails(${job.id})">${job.title}</a>
            </h3>
            <div class="job-recruiter">
                <div class="recruiter-info">
                    <div class="recruiter-avatar"></div>
                    <div class="recruiter-details">
                        <div class="recruiter-name">Tư vấn: ${job.consultant}</div>
                        <div class="recruiter-contact">
                            <div class="phone">
                                <a href="tel:${job.phone}" class="phone-icon">📞</a>
                                ${job.phone}
                            </div>
                            <div class="contact-icons">
                                <a href="https://zalo.me/qr/p/${job.phone}" target="_blank" class="zalo-icon">Zalo</a>
                                <a href="${job.facebook || '#'}" target="_blank" class="facebook-icon">f</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="job-footer">
                <span class="consult-btn" onclick="consultJob(${job.id})">TƯ VẤN GIÚP TÔI</span>
                <span class="view-count"><i class="fa fa-eye"></i> ${job.views}</span>
            </div>
        </div>
    `;

    return card;
}

function viewJobDetails(jobId) {
    alert(`Chi tiết công việc ID: ${jobId}\n\nChức năng này sẽ được phát triển sau!`);
}

function consultJob(jobId) {
    alert(`Tư vấn cho công việc ID: ${jobId}\n\nChức năng này sẽ được phát triển sau!`);
}

// Export functions for potential future use
window.WebsiteUtils = {
    formatCurrency,
    formatDate,
    loadMoreJobs,
    viewJobDetails,
    consultJob
};