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
            performSearch();
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
            const countryText = this.textContent.trim();
            let countryValue = '';
            
            // Map country names to filter values
            if (countryText.includes('TTS Nhật Bản')) {
                countryValue = 'nhat-ban';
            } else if (countryText.includes('Kỹ sư Nhật Bản')) {
                countryValue = 'ky-su-nhat-ban';
            } else if (countryText.includes('Đài Loan')) {
                countryValue = 'dai-loan';
            } else if (countryText.includes('Singapore')) {
                countryValue = 'singapore';
            } else if (countryText.includes('Tokutei Nhật')) {
                countryValue = 'tokutei-nhat';
            } else if (countryText.includes('Nga')) {
                countryValue = 'nga';
            } else if (countryText.includes('Rumani')) {
                countryValue = 'rumani';
            } else if (countryText.includes('Bulgaria')) {
                countryValue = 'bulgaria';
            } else if (countryText.includes('Serbia')) {
                countryValue = 'serbia';
            } else if (countryText.includes('Hungary')) {
                countryValue = 'hungary';
            } else if (countryText.includes('Pháp')) {
                countryValue = 'phap';
            } else if (countryText.includes('Algeria')) {
                countryValue = 'algeria';
            } else if (countryText.includes('Hy Lạp')) {
                countryValue = 'hy-lap';
            } else if (countryText.includes('Ba Lan')) {
                countryValue = 'ba-lan';
            } else if (countryText.includes('Latvia')) {
                countryValue = 'latvia';
            } else if (countryText.includes('Litva')) {
                countryValue = 'litva';
            } else if (countryText.includes('Tây Ban Nha')) {
                countryValue = 'tay-ban-nha';
            } else if (countryText.includes('Kỹ sư Đài Loan')) {
                countryValue = 'ky-su-dai-loan';
            } else if (countryText.includes('Ireland')) {
                countryValue = 'ireland';
            } else if (countryText.includes('Áo')) {
                countryValue = 'ao';
            } else if (countryText.includes('Croatia')) {
                countryValue = 'croatia';
            } else if (countryText.includes('Slovakia')) {
                countryValue = 'slovakia';
            } else if (countryText.includes('Đan Mạch')) {
                countryValue = 'dan-mach';
            } else if (countryText.includes('Ả rập xê út')) {
                countryValue = 'a-rap-xe-ut';
            } else if (countryText.includes('Albania')) {
                countryValue = 'albania';
            } else if (countryText.includes('Dubai')) {
                countryValue = 'dubai';
            } else if (countryText.includes('Trung Quốc')) {
                countryValue = 'trung-quoc';
            } else if (countryText.includes('Na Uy')) {
                countryValue = 'na-uy';
            } else if (countryText.includes('Nước khác')) {
                countryValue = 'nuoc-khac';
            }
            
            if (countryValue) {
                // Set the country filter and perform search
                const countrySelect = document.querySelector('select[name="quoc_gia"]');
                if (countrySelect) {
                    countrySelect.value = countryValue;
                    performSearch();
                    
                    // Scroll to results
                    const resultsSection = document.querySelector('.job-listings');
                    if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
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

// All job data including initial jobs
const allJobs = [
    {
        id: 1,
        title: "Liên Bang Nga tuyển 10 nam thợ vận hành máy đúc [Phí thấp].",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "870.00",
        currency: "Usd",
        gender: "Nam",
        ageRange: "(1975 - 2005)",
        deadline: "30/09/2025",
        consultant: "Năm Châu IMS",
        phone: "0981057683",
        views: "1303",
        isHot: true,
        image: "images/jobs/nga-job-1.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61558585135713",
        zalo: "https://zalo.me/0981057683"
    },
    {
        id: 2,
        title: "[Đơn miễn phí] Tập Đoàn Điện Tử Fomosa Đài Loan tuyển 150 nam nữ.",
        country: "dai-loan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(2002 - 2007)",
        deadline: "01/10/2025",
        consultant: "Phạm Xuân Trường",
        phone: "0968803554",
        views: "9090",
        isHot: false,
        image: "images/jobs/dai-loan-job-1.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61553002468184",
        zalo: "https://zalo.me/0968803554"
    },
    {
        id: 3,
        title: "Tuyển 10 nam nữ tốt nghiệp ngành kinh tế làm nhân viên trong khách sạn 4* tại Nhật bản.",
        country: "nhat-ban",
        countryName: "TTS Nhật Bản",
        flag: "🇯🇵",
        salary: "21.00",
        currency: "Man",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2004)",
        deadline: "25/09/2025",
        consultant: "Mr. Tấn",
        phone: "0356111283",
        views: "2137",
        isHot: true,
        image: "images/jobs/nhat-ban-job-1.jpg",
        facebook: "https://www.facebook.com/buitanxkld",
        zalo: "https://zalo.me/0356111283"
    },
    {
        id: 4,
        title: "Nga tuyển 15 nam thợ hàn lương cao [Phí thấp].",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "950.00",
        currency: "Usd",
        gender: "Nam",
        ageRange: "(1980 - 2005)",
        deadline: "15/10/2025",
        consultant: "Công ty XKLĐ Việt Nga",
        phone: "0987654321",
        views: "2456",
        isHot: true,
        image: "images/jobs/nga-job-1.jpg",
        facebook: "https://www.facebook.com/vietnga",
        zalo: "https://zalo.me/0987654321"
    },
    {
        id: 5,
        title: "Liên Bang Nga tuyển 20 nữ chế biến thực phẩm.",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "800.00",
        currency: "Usd",
        gender: "Nữ",
        ageRange: "(1985 - 2007)",
        deadline: "20/10/2025",
        consultant: "Trung tâm XKLĐ Nga",
        phone: "0912345678",
        views: "1876",
        isHot: false,
        image: "images/jobs/nga-job-1.jpg",
        facebook: "https://www.facebook.com/xkldnga",
        zalo: "https://zalo.me/0912345678"
    },
    {
        id: 6,
        title: "Singapore tuyển 25 nam xây dựng lương cao",
        country: "singapore",
        countryName: "Singapore",
        flag: "🇸🇬",
        salary: "1,200",
        currency: "SGD",
        gender: "Nam",
        ageRange: "(1985 - 2005)",
        deadline: "25/10/2025",
        consultant: "Singapore Jobs",
        phone: "0901234567",
        views: "3456",
        isHot: true,
        image: "images/jobs/singapore-job-1.jpg",
        facebook: "https://www.facebook.com/singaporejobs",
        zalo: "https://zalo.me/0901234567"
    },
    {
        id: 7,
        title: "Rumani tuyển 30 nam nữ công nghiệp",
        country: "rumani",
        countryName: "Rumani",
        flag: "🇷🇴",
        salary: "800",
        currency: "EUR",
        gender: "Nam, Nữ",
        ageRange: "(1980 - 2006)",
        deadline: "30/10/2025",
        consultant: "Romania Work",
        phone: "0987123456",
        views: "2345",
        isHot: false,
        image: "images/jobs/rumani-job-1.jpg",
        facebook: "https://www.facebook.com/romaniawork",
        zalo: "https://zalo.me/0987123456"
    },
    {
        id: 8,
        title: "Bulgaria tuyển 20 nữ chế biến thực phẩm",
        country: "bulgaria",
        countryName: "Bulgaria",
        flag: "🇧🇬",
        salary: "650",
        currency: "EUR",
        gender: "Nữ",
        ageRange: "(1985 - 2007)",
        deadline: "15/11/2025",
        consultant: "Bulgaria Jobs",
        phone: "0976543210",
        views: "1876",
        isHot: false,
        image: "images/jobs/bulgaria-job-1.jpg",
        facebook: "https://www.facebook.com/bulgariajobs",
        zalo: "https://zalo.me/0976543210"
    },
    {
        id: 9,
        title: "Hungary tuyển 15 nam cơ khí",
        country: "hungary",
        countryName: "Hungary",
        flag: "🇭🇺",
        salary: "750",
        currency: "EUR",
        gender: "Nam",
        ageRange: "(1982 - 2004)",
        deadline: "20/11/2025",
        consultant: "Hungary Work",
        phone: "0965432109",
        views: "2987",
        isHot: true,
        image: "images/jobs/hungary-job-1.jpg",
        facebook: "https://www.facebook.com/hungarywork",
        zalo: "https://zalo.me/0965432109"
    },
    {
        id: 10,
        title: "Pháp tuyển 10 nam nữ nhà hàng khách sạn",
        country: "phap",
        countryName: "Pháp",
        flag: "🇫🇷",
        salary: "1,500",
        currency: "EUR",
        gender: "Nam, Nữ",
        ageRange: "(1990 - 2006)",
        deadline: "05/12/2025",
        consultant: "France Jobs",
        phone: "0954321098",
        views: "4567",
        isHot: true,
        image: "images/jobs/phap-job-1.jpg",
        facebook: "https://www.facebook.com/francejobs",
        zalo: "https://zalo.me/0954321098"
    },
    {
        id: 11,
        title: "Hy Lạp tuyển 18 nam nữ nông nghiệp",
        country: "hy-lap",
        countryName: "Hy Lạp",
        flag: "🇬🇷",
        salary: "700",
        currency: "EUR",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2005)",
        deadline: "10/12/2025",
        consultant: "Greece Work",
        phone: "0943210987",
        views: "3210",
        isHot: false,
        image: "images/jobs/hy-lap-job-1.jpg",
        facebook: "https://www.facebook.com/greecework",
        zalo: "https://zalo.me/0943210987"
    },
    {
        id: 12,
        title: "Ba Lan tuyển 22 nam xây dựng",
        country: "ba-lan",
        countryName: "Ba Lan",
        flag: "🇵🇱",
        salary: "850",
        currency: "EUR",
        gender: "Nam",
        ageRange: "(1980 - 2003)",
        deadline: "15/12/2025",
        consultant: "Poland Jobs",
        phone: "0932109876",
        views: "2876",
        isHot: true,
        image: "images/jobs/ba-lan-job-1.jpg",
        facebook: "https://www.facebook.com/polandjobs",
        zalo: "https://zalo.me/0932109876"
    },
    {
        id: 13,
        title: "[Phí thấp] Liên Bang Nga tuyển 25 Nam Nữ làm chế biến cá trong nhà xưởng",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "600.00",
        currency: "USD",
        gender: "Nam, Nữ",
        ageRange: "(1983 - 2007)",
        deadline: "Liên tục",
        consultant: "Mr Hải",
        phone: "0364370000",
        views: "12124",
        isHot: true,
        image: "images/jobs/nga-job-3.jpg",
        facebook: "https://www.facebook.com/tran.anh.hai.195277",
        zalo: "https://zalo.me/0364370000"
    },
    {
        id: 14,
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
        views: "279",
        isHot: true,
        image: "images/jobs/bulgaria-job-1.jpg",
        facebook: "https://www.facebook.com/bulgariajobs",
        zalo: "https://zalo.me/0362046120"
    },
    {
        id: 15,
        title: "Tuyển 06 Nam Nữ trồng, chăm sóc, thu hoạch rau tại Đài Viên, Đài Bắc [Lấy đến 40 tuổi]",
        country: "dai-loan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2004)",
        deadline: "01/10/2025",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "13814",
        isHot: true,
        image: "images/jobs/dai-loan-job-2.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61553090643077",
        zalo: "https://zalo.me/0975109764"
    },
    {
        id: 16,
        title: "[Đơn truyền thống] Tuyển 20 nữ làm bánh mì, bánh ngọt tại Osaka, Nhật Bản",
        country: "nhat-ban",
        countryName: "TTS Nhật Bản",
        flag: "🇯🇵",
        salary: "185,000",
        currency: "Yên",
        gender: "Nữ",
        ageRange: "(1995 - 2007)",
        deadline: "22/09/2025",
        consultant: "Mr. Tấn",
        phone: "0356111283",
        views: "3946",
        isHot: false,
        image: "images/jobs/nhat-ban-job-2.jpg",
        facebook: "https://www.facebook.com/buitanxkld",
        zalo: "https://zalo.me/0356111283"
    },
    {
        id: 17,
        title: "Nhà máy Mỹ Đề tuyển 05 nữ làm bánh mì, bánh ngọt tại Đài Loan",
        country: "dai-loan",
        countryName: "Đài Loan",
        flag: "🇹🇼",
        salary: "28,590",
        currency: "Đài tệ",
        gender: "Nữ",
        ageRange: "(1985 - 2004)",
        deadline: "Liên tục",
        consultant: "Đinh Khắc Thịnh",
        phone: "0975109764",
        views: "3434",
        isHot: true,
        image: "images/jobs/dai-loan-job-3.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61553090643077",
        zalo: "https://zalo.me/0975109764"
    },
    {
        id: 18,
        title: "Nhà máy may mặc Liên Bang Nga cần tuyển 70 nam nữ công nhân Việt Nam",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "110,000",
        currency: "Rub",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2007)",
        deadline: "Liên tục",
        consultant: "Mr Hải",
        phone: "0364370000",
        views: "645",
        isHot: true,
        image: "images/jobs/nga-job-4.jpg",
        facebook: "https://www.facebook.com/tran.anh.hai.195277",
        zalo: "https://zalo.me/0364370000"
    },
    {
        id: 19,
        title: "Slovakia CN nhà máy + Thợ hàn - Sẵn lịch lăn tay T9-T11!",
        country: "slovakia",
        countryName: "Slovakia",
        flag: "🇸🇰",
        salary: "1058 - 1200",
        currency: "Euro",
        gender: "Nam, Nữ",
        ageRange: "(1985 - 2007)",
        deadline: "Liên tục",
        consultant: "Phương Mỹ Linh",
        phone: "0362046120",
        views: "2913",
        isHot: true,
        image: "images/jobs/slovakia-job-1.jpg",
        facebook: "https://www.facebook.com/slovakiajobs",
        zalo: "https://zalo.me/0362046120"
    },
    {
        id: 20,
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
        image: "images/jobs/singapore-job-2.jpg",
        facebook: "https://www.facebook.com/tran.anh.hai.195277",
        zalo: "https://zalo.me/0364370000"
    },
    {
        id: 21,
        title: "Hy Lạp - Công nhân vườn ươm giống - LCB 880 euro",
        country: "hy-lap",
        countryName: "Hy Lạp",
        flag: "🇬🇷",
        salary: "880",
        currency: "Euro",
        gender: "Nam, Nữ",
        ageRange: "(1990 - 2000)",
        deadline: "Liên tục",
        consultant: "Phương Mỹ Linh",
        phone: "0362046120",
        views: "1724",
        isHot: false,
        image: "images/jobs/hy-lap-job-1.jpg",
        facebook: "https://www.facebook.com/greecework",
        zalo: "https://zalo.me/0362046120"
    },
    {
        id: 22,
        title: "Công nhân chế biển sản phẩm ô Liu - Làm việc tại Hy Lạp",
        country: "hy-lap",
        countryName: "Hy Lạp",
        flag: "🇬🇷",
        salary: "880.00",
        currency: "Euro",
        gender: "Nam, Nữ",
        ageRange: "(1980 - 2005)",
        deadline: "Liên tục",
        consultant: "Phương Mỹ Linh",
        phone: "0362046120",
        views: "4156",
        isHot: false,
        image: "images/jobs/hy-lap-job-2.jpg",
        facebook: "https://www.facebook.com/greecework",
        zalo: "https://zalo.me/0362046120"
    },
    {
        id: 23,
        title: "Xây dựng - Algieria",
        country: "algeria",
        countryName: "Algeria",
        flag: "🇩🇿",
        salary: "900.00",
        currency: "USD",
        gender: "Nam",
        ageRange: "(1973 - 1997)",
        deadline: "09/10/2025",
        consultant: "Đào Như Ngọc",
        phone: "0865983982",
        views: "1372",
        isHot: false,
        image: "images/jobs/algeria-job-1.jpg",
        facebook: "https://www.facebook.com/algeriajobs",
        zalo: "https://zalo.me/0865983982"
    },
    {
        id: 24,
        title: "Đóng tàu Vard - Rumani",
        country: "rumani",
        countryName: "Rumani",
        flag: "🇷🇴",
        salary: "750.00",
        currency: "USD",
        gender: "Nam",
        ageRange: "(1975 - 2007)",
        deadline: "17/09/2025",
        consultant: "Đào Như Ngọc",
        phone: "0865983982",
        views: "1067",
        isHot: false,
        image: "images/jobs/rumani-job-2.jpg",
        facebook: "https://www.facebook.com/romaniawork",
        zalo: "https://zalo.me/0865983982"
    },
    {
        id: 25,
        title: "Tuyển 25 nam thợ làm coppha, sắt thép tại Singapore (Lương cơ bản 6$ sing/giờ)",
        country: "singapore",
        countryName: "Singapore",
        flag: "🇸🇬",
        salary: "1,056",
        currency: "Đô Sing",
        gender: "Nam",
        ageRange: "(1981 - 2007)",
        deadline: "30/09/2025",
        consultant: "Ms. Tâm",
        phone: "0966708161",
        views: "3482",
        isHot: true,
        image: "images/jobs/singapore-job-3.jpg",
        facebook: "https://www.facebook.com/singaporejobs",
        zalo: "https://zalo.me/0966708161"
    }
];

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

// Search functionality
function performSearch() {
    const countrySelect = document.querySelector('select[name="quoc_gia"]');
    const industrySelect = document.querySelector('select[name="nganh_nghe"]');
    const locationSelect = document.querySelector('select[name="noi_tuyen"]');
    const genderSelect = document.querySelector('select[name="gioi_tinh"]');
    const yearSelect = document.querySelector('select[name="nam_sinh"]');
    
    const selectedCountry = countrySelect ? countrySelect.value : '';
    const selectedIndustry = industrySelect ? industrySelect.value : '';
    const selectedLocation = locationSelect ? locationSelect.value : '';
    const selectedGender = genderSelect ? genderSelect.value : '';
    const selectedYear = yearSelect ? yearSelect.value : '';
    
    console.log('Search filters:', {
        country: selectedCountry,
        industry: selectedIndustry,
        location: selectedLocation,
        gender: selectedGender,
        year: selectedYear
    });
    
    // Filter jobs based on selected criteria
    let filteredJobs = allJobs;
    
    if (selectedCountry && selectedCountry !== '') {
        filteredJobs = filteredJobs.filter(job => job.country === selectedCountry);
    }
    
    if (selectedGender && selectedGender !== '') {
        filteredJobs = filteredJobs.filter(job => {
            if (selectedGender === 'nam') {
                return job.gender.toLowerCase().includes('nam');
            } else if (selectedGender === 'nu') {
                return job.gender.toLowerCase().includes('nữ');
            }
            return true;
        });
    }
    
    // Display filtered results
    displaySearchResults(filteredJobs);
}

function displaySearchResults(jobs) {
    const jobsContainer = document.querySelector('.job-grid');
    const sectionTitle = document.querySelector('.section-title');
    
    if (!jobsContainer) {
        console.log('Jobs container not found');
        return;
    }
    
    // Clear existing jobs
    jobsContainer.innerHTML = '';
    
    // Update section title
    if (sectionTitle) {
        if (jobs.length === 0) {
            sectionTitle.textContent = 'Không tìm thấy việc làm phù hợp';
        } else {
            sectionTitle.textContent = `Tìm thấy ${jobs.length} việc làm phù hợp`;
        }
    }
    
    // Display filtered jobs
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);
    });
    
    // Hide load more button when showing search results
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    
    // Get flag image based on country
    let flagImage = 'images/flags/russia.png'; // default
    if (job.country === 'dai-loan') {
        flagImage = 'images/flags/taiwan.png';
    } else if (job.country === 'nhat-ban') {
        flagImage = 'images/flags/japan.png';
    } else if (job.country === 'singapore') {
        flagImage = 'images/flags/singapore.png';
    } else if (job.country === 'rumani') {
        flagImage = 'images/flags/romania.png';
    } else if (job.country === 'bulgaria') {
        flagImage = 'images/flags/bulgaria.png';
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
                                <a href="${job.zalo || '#'}" target="_blank" class="zalo-icon">Zalo</a>
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

// Export functions for potential future use
window.WebsiteUtils = {
    formatCurrency,
    formatDate,
    loadMoreJobs,
    viewJobDetails,
    consultJob,
    performSearch,
    displaySearchResults
};