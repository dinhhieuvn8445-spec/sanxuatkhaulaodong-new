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
    // Check for URL parameters on page load (for country filtering from other pages)
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');
    const countryNameParam = urlParams.get('name');
    
    if (countryParam && countryNameParam) {
        // Set the country filter and perform search
        const countrySelect = document.querySelector('select[name="quoc_gia"]');
        if (countrySelect) {
            countrySelect.value = countryParam;
            
            // Wait a bit for the page to fully load, then perform search
            setTimeout(() => {
                performSearch();
                
                // Show notification about the filter
                showCountryFilterNotification(countryNameParam);
                
                // Scroll to results after search
                setTimeout(() => {
                    const resultsSection = document.querySelector('.job-listings');
                    if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
                
                // Clean up URL parameters
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }, 300);
        }
    }

    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    // Add reset button functionality
    const countrySelect = document.querySelector('select[name="quoc_gia"]');
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            if (this.value === '') {
                // Reset to show all jobs
                resetToAllJobs();
            }
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

    // Load more functionality removed - handled in index.html

    // View more candidates functionality
    const viewMoreBtn = document.querySelector('.btn-view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Removed alert message - functionality to be developed later
        });
    }

    // Job title links functionality - All jobs can show details
    const jobLinks = document.querySelectorAll('.job-title a');
    jobLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent job card to get the job ID
            const jobCard = this.closest('.job-card');
            const jobId = jobCard ? jobCard.getAttribute('data-job-id') : null;
            
            // Allow all jobs to show details
            if (jobId) {
                // Redirect to job detail page with job ID
                window.location.href = `job-detail.html?id=${jobId}`;
            }
        });
    });

    // Make all job cards clickable
    const allJobCards = document.querySelectorAll('.job-card');
    allJobCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const jobId = this.getAttribute('data-job-id');
            if (jobId) {
                window.location.href = `job-detail.html?id=${jobId}`;
            }
        });
    });

    // Country links functionality
    const countryLinks = document.querySelectorAll('.country-list a');
    countryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const countryText = this.textContent.trim();
            let countryValue = '';
            let countryName = '';
            
            // Map country names to filter values
            if (countryText.includes('TTS Nhật Bản')) {
                countryValue = 'nhat-ban';
                countryName = 'TTS Nhật Bản';
            } else if (countryText.includes('Kỹ sư Nhật Bản')) {
                countryValue = 'ky-su-nhat-ban';
                countryName = 'Kỹ sư Nhật Bản';
            } else if (countryText.includes('Đài Loan')) {
                countryValue = 'dai-loan';
                countryName = 'Đài Loan';
            } else if (countryText.includes('Singapore')) {
                countryValue = 'singapore';
                countryName = 'Singapore';
            } else if (countryText.includes('Tokutei Nhật')) {
                countryValue = 'tokutei-nhat';
                countryName = 'Tokutei Nhật';
            } else if (countryText.includes('Nga')) {
                countryValue = 'nga';
                countryName = 'Nga';
            } else if (countryText.includes('Rumani')) {
                countryValue = 'rumani';
                countryName = 'Rumani';
            } else if (countryText.includes('Bulgaria')) {
                countryValue = 'bulgaria';
                countryName = 'Bulgaria';
            } else if (countryText.includes('Serbia')) {
                countryValue = 'serbia';
                countryName = 'Serbia';
            } else if (countryText.includes('Hungary')) {
                countryValue = 'hungary';
                countryName = 'Hungary';
            } else if (countryText.includes('Pháp')) {
                countryValue = 'phap';
                countryName = 'Pháp';
            } else if (countryText.includes('Algeria')) {
                countryValue = 'algeria';
                countryName = 'Algeria';
            } else if (countryText.includes('Hy Lạp')) {
                countryValue = 'hy-lap';
                countryName = 'Hy Lạp';
            } else if (countryText.includes('Ba Lan')) {
                countryValue = 'ba-lan';
                countryName = 'Ba Lan';
            } else if (countryText.includes('Latvia')) {
                countryValue = 'latvia';
                countryName = 'Latvia';
            } else if (countryText.includes('Litva')) {
                countryValue = 'litva';
                countryName = 'Litva';
            } else if (countryText.includes('Tây Ban Nha')) {
                countryValue = 'tay-ban-nha';
                countryName = 'Tây Ban Nha';
            } else if (countryText.includes('Kỹ sư Đài Loan')) {
                countryValue = 'ky-su-dai-loan';
                countryName = 'Kỹ sư Đài Loan';
            } else if (countryText.includes('Ireland')) {
                countryValue = 'ireland';
                countryName = 'Ireland';
            } else if (countryText.includes('Áo')) {
                countryValue = 'ao';
                countryName = 'Áo';
            } else if (countryText.includes('Croatia')) {
                countryValue = 'croatia';
                countryName = 'Croatia';
            } else if (countryText.includes('Slovakia')) {
                countryValue = 'slovakia';
                countryName = 'Slovakia';
            } else if (countryText.includes('Đan Mạch')) {
                countryValue = 'dan-mach';
                countryName = 'Đan Mạch';
            } else if (countryText.includes('Ả rập xê út')) {
                countryValue = 'a-rap-xe-ut';
                countryName = 'Ả rập xê út';
            } else if (countryText.includes('Albania')) {
                countryValue = 'albania';
                countryName = 'Albania';
            } else if (countryText.includes('Dubai')) {
                countryValue = 'dubai';
                countryName = 'Dubai';
            } else if (countryText.includes('Trung Quốc')) {
                countryValue = 'trung-quoc';
                countryName = 'Trung Quốc';
            } else if (countryText.includes('Na Uy')) {
                countryValue = 'na-uy';
                countryName = 'Na Uy';
            } else if (countryText.includes('Nước khác')) {
                countryValue = 'nuoc-khac';
                countryName = 'Nước khác';
            }
            
            if (countryValue) {
                // Check if we're on the homepage and have search functionality
                const countrySelect = document.querySelector('select[name="quoc_gia"]');
                const isHomePage = window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname.endsWith('/');
                
                if (countrySelect && isHomePage) {
                    // On homepage, use existing search functionality
                    countrySelect.value = countryValue;
                    performSearch();
                    
                    // Scroll to results
                    const resultsSection = document.querySelector('.job-listings');
                    if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // On other pages, redirect to homepage with country filter
                    window.location.href = `index.html?country=${countryValue}&name=${encodeURIComponent(countryName)}`;
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

    // Contact icons functionality - Removed alerts, let individual handlers work

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

    // Add click tracking for job cards - Only first 3 have details
    document.addEventListener('click', function(e) {
        // Handle job card clicks (excluding buttons and links inside)
        if (e.target.matches('.job-card') || (e.target.closest('.job-card') && !e.target.matches('a, button, .consult-btn, .job-title a'))) {
            const jobCard = e.target.closest('.job-card');
            const jobId = jobCard ? jobCard.getAttribute('data-job-id') : null;
            
            if (jobId && (jobId === '1' || jobId === '2' || jobId === '3')) {
                // Redirect to job detail page with job ID
                window.location.href = `job-detail.html?id=${jobId}`;
            } else if (jobId) {
                alert('Đơn hàng này chưa có chi tiết. Vui lòng liên hệ tư vấn viên để biết thêm thông tin!');
            }
            console.log('Job card clicked:', jobId);
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
        views: "1611",
        isHot: true,
        image: "images/jobs/nga-job-1.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61558585135713",
        zalo: "https://zalo.me/qr/p/0981057683"
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
        views: "10205",
        isHot: false,
        image: "images/jobs/dai-loan-job-1.jpg",
        facebook: "https://www.facebook.com/profile.php?id=61553002468184",
        zalo: "https://zalo.me/qr/p/0968803554"
    },
    {
        id: 3,
        title: "[Phí thấp] Liên Bang Nga tuyển 25 Nam Nữ làm chế biến cá trong nhà xưởng.",
        country: "nga",
        countryName: "Nga",
        flag: "🇷🇺",
        salary: "600.00",
        currency: "Usd",
        gender: "Nam, Nữ",
        ageRange: "(1983 - 2007)",
        deadline: "Liên tục",
        consultant: "Mr Hải",
        phone: "0364370000",
        views: "12292",
        isHot: true,
        image: "images/jobs/nga-job-3.jpg",
        facebook: "https://www.facebook.com/tran.anh.hai.195277",
        zalo: "https://zalo.me/qr/p/0364370000"
    }
];

let currentJobsDisplayed = 3; // Initially showing 3 jobs

function loadMoreJobs() {
    // Placeholder function - không load gì cả
    console.log('Load more button clicked - ready for future implementation');
    
    // TODO: Thêm logic load thêm đơn hàng tại đây khi cần
    // Hiện tại chỉ giữ nguyên 3 đơn hàng đầu tiên
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
                                <a href="https://zalo.me/qr/p/qr/p/${job.phone}" target="_blank" class="zalo-icon">Zalo</a>
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
    // Redirect to job detail page with job ID parameter
    window.location.href = `job-detail.html?id=${jobId}`;
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

function resetToAllJobs() {
    const sectionTitle = document.querySelector('.section-title');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // Reset section title
    if (sectionTitle) {
        sectionTitle.textContent = 'Việc làm xuất khẩu lao động mới nhất';
    }
    
    // Show load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'block';
    }
    
    // Reload the original jobs from HTML (first 3 jobs)
    location.reload();
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
            // Check if filtering by country
            const countrySelect = document.querySelector('select[name="quoc_gia"]');
            const selectedCountry = countrySelect ? countrySelect.value : '';
            
            if (selectedCountry) {
                // Get country name for display
                let countryName = '';
                if (selectedCountry === 'nga') countryName = 'Nga';
                else if (selectedCountry === 'dai-loan') countryName = 'Đài Loan';
                else if (selectedCountry === 'nhat-ban') countryName = 'TTS Nhật Bản';
                else if (selectedCountry === 'singapore') countryName = 'Singapore';
                
                if (countryName) {
                    sectionTitle.textContent = `Tìm thấy ${jobs.length} việc làm tại ${countryName}`;
                } else {
                    sectionTitle.textContent = `Tìm thấy ${jobs.length} việc làm phù hợp`;
                }
            } else {
                sectionTitle.textContent = `Tìm thấy ${jobs.length} việc làm phù hợp`;
            }
        }
    }
    
    // Display filtered jobs
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);
    });
    
    // Add hover effects to new job cards
    const newJobCards = jobsContainer.querySelectorAll('.job-card');
    newJobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        // Make cards clickable
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const jobId = this.getAttribute('data-job-id');
            if (jobId) {
                window.location.href = `job-detail.html?id=${jobId}`;
            }
        });
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
    card.setAttribute('data-job-id', job.id);
    
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
    
    // Get proper job image - use local images for better reliability
    let jobImage = job.image;
    if (job.id === 1) {
        jobImage = "images/jobs/nga-job-1.jpg";
    } else if (job.id === 2) {
        // Use local image for Đài Loan job
        jobImage = "images/jobs/dai-loan-job-1.jpg";
    } else if (job.id === 3) {
        jobImage = "images/jobs/nga-job-1.jpg";
    }
    
    card.innerHTML = `
        <div class="job-image">
            <img src="${jobImage}" alt="Công việc tại ${job.countryName}">
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
                                <a href="javascript:void(0)" onclick="showZaloQR('${job.phone}', '${job.consultant}')" class="zalo-icon">Zalo</a>
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

// Show Zalo QR Code
function showZaloQR(phone, consultant) {
    // Create QR code URL using a QR code API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zalo.me/qr/p/${phone}`;
    
    // Create popup HTML
    const popupHTML = `
        <div class="zalo-popup-overlay" onclick="closeZaloQR()">
            <div class="zalo-popup" onclick="event.stopPropagation()">
                <div class="zalo-popup-header">
                    <h3>Liên hệ Zalo</h3>
                    <button class="close-btn" onclick="closeZaloQR()">&times;</button>
                </div>
                <div class="zalo-popup-content">
                    <div class="consultant-info">
                        <h4>Tư vấn viên: ${consultant}</h4>
                        <p>Số điện thoại: ${phone}</p>
                    </div>
                    <div class="qr-code-container">
                        <img src="${qrCodeUrl}" alt="Zalo QR Code" class="qr-code">
                        <p>Quét mã QR để chat Zalo</p>
                    </div>
                    <div class="zalo-actions">
                        <a href="https://zalo.me/qr/p/${phone}" target="_blank" class="zalo-direct-btn">
                            Mở Zalo trực tiếp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close Zalo QR popup
function closeZaloQR() {
    const popup = document.querySelector('.zalo-popup-overlay');
    if (popup) {
        popup.remove();
        document.body.style.overflow = 'auto';
    }
}

// Registration Form Handler
function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('consultationForm');
    const formData = new FormData(form);
    
    // Get form values
    const data = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        province: formData.get('province'),
        country: formData.get('country'),
        industry: formData.get('industry'),
        experience: formData.get('experience'),
        notes: formData.get('notes'),
        agreement: formData.get('agreement')
    };
    
    // Validate required fields
    if (!data.fullName || !data.phone || !data.age || !data.gender || !data.province || !data.country || !data.agreement) {
        showMessage('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'error');
        return;
    }
    
    // Validate phone number (Vietnamese format)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showMessage('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.', 'error');
        return;
    }
    
    // Validate email if provided
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Email không hợp lệ.', 'error');
            return;
        }
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage(`Bạn đã đăng ký thành công! Tư vấn viên của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`, 'success');
        
        // Reset form
        form.reset();
        
        // Log data for development (remove in production)
        console.log('Form submitted with data:', data);
        
        // Optional: Send data to server
        // sendToServer(data);
        
    }, 2000);
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message show' : 'error-message show';
    messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${message}`;
    
    // Insert message at the top of the form
    const form = document.getElementById('consultationForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Optional: Send data to server (implement as needed)
function sendToServer(data) {
    // Example implementation:
    /*
    fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Server response:', result);
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.', 'error');
    });
    */
}

// Function to show country filter notification
function showCountryFilterNotification(countryName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'country-filter-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-filter"></i>
            <span>Đang hiển thị công việc tại: <strong>${countryName}</strong></span>
            <button class="close-notification" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ed1c24;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles to head if not exists
    if (!document.querySelector('#country-filter-styles')) {
        const style = document.createElement('style');
        style.id = 'country-filter-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .close-notification {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                font-size: 16px;
            }
            .close-notification:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Candidate data for "Show more candidates" functionality
const candidateData = [
    // Initial candidates (already displayed)
    { id: 1, name: "Vũ Ngọc Điệp", details: "1990 - Hà Nội", visible: true },
    { id: 2, name: "Đặng Thị Thanh Phương", details: "2004", visible: true },
    { id: 3, name: "Lê Hoài Việt", details: "1987 - Đà Nẵng", visible: true },
    
    // Additional candidates to show when "Xem thêm" is clicked
    { id: 4, name: "Nguyễn Thị Mai", details: "1995 - Hải Phòng", visible: false },
    { id: 5, name: "Trần Văn Hùng", details: "1988 - Cần Thơ", visible: false },
    { id: 6, name: "Phạm Đức Anh", details: "1988 - Đà Nẵng", visible: false },
    { id: 7, name: "Lê Thị Mai", details: "1996 - Nghệ An", visible: false },
    { id: 8, name: "Hoàng Văn Tùng", details: "1990 - Thanh Hóa", visible: false },
    { id: 9, name: "Ngô Thị Hương", details: "1994 - Quảng Ninh", visible: false },
    { id: 10, name: "Đỗ Văn Hải", details: "1987 - Bắc Ninh", visible: false },
    { id: 11, name: "Bùi Thị Nga", details: "1993 - Thái Bình", visible: false },
    { id: 12, name: "Vương Văn Đức", details: "1991 - Nam Định", visible: false },
    { id: 13, name: "Đinh Thị Linh", details: "1989 - Hưng Yên", visible: false },
    { id: 14, name: "Trịnh Văn Khoa", details: "1995 - Vĩnh Phúc", visible: false },
    { id: 15, name: "Lý Thị Hoa", details: "1992 - Hà Nam", visible: false },
    { id: 16, name: "Phan Văn Long", details: "1986 - Ninh Bình", visible: false },
    { id: 17, name: "Chu Thị Yến", details: "1997 - Thái Nguyên", visible: false },
    { id: 18, name: "Dương Văn Phúc", details: "1990 - Lào Cai", visible: false }
];

let currentCandidateIndex = 3; // Start from index 3 (after initial 3 candidates)
const candidatesPerLoad = 5; // Show 5 more candidates each time

// Function to show more candidates
function showMoreCandidates() {
    const candidateList = document.querySelector('.candidate-list');
    const showMoreBtn = document.querySelector('.btn-view-more');
    
    if (!candidateList || !showMoreBtn) return;
    
    // Calculate how many candidates to show
    const endIndex = Math.min(currentCandidateIndex + candidatesPerLoad, candidateData.length);
    
    // Add new candidates to the list
    for (let i = currentCandidateIndex; i < endIndex; i++) {
        const candidate = candidateData[i];
        
        const candidateElement = document.createElement('li');
        candidateElement.innerHTML = `
            <div class="candidate-avatar"></div>
            <div class="candidate-info">
                <div class="candidate-name">${candidate.name}</div>
                <div class="candidate-details">${candidate.details}</div>
                <a href="#" class="candidate-link" onclick="showCandidateDetails(${candidate.id}); return false;">Thông tin chi tiết</a>
            </div>
        `;
        
        // Add fade-in animation
        candidateElement.style.opacity = '0';
        candidateElement.style.transform = 'translateY(20px)';
        candidateElement.style.transition = 'all 0.3s ease';
        
        candidateList.appendChild(candidateElement);
        
        // Trigger animation
        setTimeout(() => {
            candidateElement.style.opacity = '1';
            candidateElement.style.transform = 'translateY(0)';
        }, i * 100); // Stagger animation
    }
    
    // Update current index
    currentCandidateIndex = endIndex;
    
    // Hide "Xem thêm" button if all candidates are shown
    if (currentCandidateIndex >= candidateData.length) {
        showMoreBtn.style.display = 'none';
        
        // Add "Đã hiển thị tất cả ứng viên" message
        const allShownMessage = document.createElement('div');
        allShownMessage.className = 'all-candidates-shown';
        allShownMessage.innerHTML = '<i class="fas fa-check-circle"></i> Đã hiển thị tất cả ứng viên';
        allShownMessage.style.cssText = `
            text-align: center;
            color: #059669;
            font-size: 14px;
            margin-top: 15px;
            padding: 10px;
            background: #f0f9f4;
            border-radius: 6px;
            border: 1px solid #d1fae5;
        `;
        
        showMoreBtn.parentNode.insertBefore(allShownMessage, showMoreBtn);
    } else {
        // Update button text to show remaining count
        const remaining = candidateData.length - currentCandidateIndex;
        showMoreBtn.innerHTML = `Xem thêm ứng viên (${remaining})`;
    }
    
    return false; // Prevent default link behavior
}

// Candidate functionality is now called directly from HTML onclick event

// Detailed candidate data
const detailedCandidateData = {
    1: {
        name: "Vũ Ngọc Điệp",
        birthYear: "1990",
        address: "Hà Nội",
        gender: "Nam",
        education: "Đại học",
        experience: "5 năm kinh nghiệm làm việc trong ngành sản xuất",
        language: "Tiếng Nhật N3, Tiếng Anh cơ bản",
        desiredJob: "Vận hành máy móc, Sản xuất",
        desiredCountry: "Nhật Bản, Đài Loan",
        phone: "0987654321",
        email: "vudiep1990@email.com"
    },
    2: {
        name: "Đặng Thị Thanh Phương",
        birthYear: "2004",
        address: "Hồ Chí Minh",
        gender: "Nữ",
        education: "Trung cấp",
        experience: "1 năm kinh nghiệm làm việc tại nhà máy may",
        language: "Tiếng Anh cơ bản",
        desiredJob: "May mặc, Điện tử",
        desiredCountry: "Đài Loan, Singapore",
        phone: "0912345678",
        email: "phuong2004@email.com"
    },
    3: {
        name: "Lê Hoài Việt",
        birthYear: "1987",
        address: "Đà Nẵng",
        gender: "Nam",
        education: "Cao đẳng",
        experience: "8 năm kinh nghiệm trong ngành xây dựng",
        language: "Tiếng Nhật N4, Tiếng Anh trung bình",
        desiredJob: "Xây dựng, Hàn xì",
        desiredCountry: "Nhật Bản, Nga",
        phone: "0976543210",
        email: "viet1987@email.com"
    },
    4: {
        name: "Nguyễn Thị Mai",
        birthYear: "1995",
        address: "Hải Phòng",
        gender: "Nữ",
        education: "Đại học",
        experience: "3 năm kinh nghiệm làm việc văn phòng",
        language: "Tiếng Anh tốt, Tiếng Hàn cơ bản",
        desiredJob: "Văn phòng, Dịch vụ",
        desiredCountry: "Hàn Quốc, Singapore",
        phone: "0965432109",
        email: "mai1995@email.com"
    },
    5: {
        name: "Trần Văn Hùng",
        birthYear: "1988",
        address: "Cần Thơ",
        gender: "Nam",
        education: "Trung cấp",
        experience: "6 năm kinh nghiệm lái xe và vận chuyển",
        language: "Tiếng Anh cơ bản",
        desiredJob: "Lái xe, Vận chuyển",
        desiredCountry: "Đài Loan, Nga",
        phone: "0954321098",
        email: "hung1988@email.com"
    },
    6: {
        name: "Phạm Đức Anh",
        birthYear: "1988",
        address: "Đà Nẵng",
        gender: "Nam",
        education: "Cao đẳng",
        experience: "4 năm kinh nghiệm trong ngành cơ khí",
        language: "Tiếng Nhật N4",
        desiredJob: "Cơ khí, Sản xuất",
        desiredCountry: "Nhật Bản",
        phone: "0943210987",
        email: "anh1988@email.com"
    },
    7: {
        name: "Lê Thị Mai",
        birthYear: "1996",
        address: "Nghệ An",
        gender: "Nữ",
        education: "Trung cấp",
        experience: "2 năm kinh nghiệm làm việc tại nhà máy",
        language: "Tiếng Anh cơ bản",
        desiredJob: "Sản xuất, May mặc",
        desiredCountry: "Đài Loan, Singapore",
        phone: "0932109876",
        email: "mai1996@email.com"
    },
    8: {
        name: "Hoàng Văn Tùng",
        birthYear: "1990",
        address: "Thanh Hóa",
        gender: "Nam",
        education: "Đại học",
        experience: "5 năm kinh nghiệm IT",
        language: "Tiếng Anh tốt, Tiếng Nhật N3",
        desiredJob: "IT, Kỹ thuật",
        desiredCountry: "Nhật Bản, Singapore",
        phone: "0921098765",
        email: "tung1990@email.com"
    },
    9: {
        name: "Ngô Thị Hương",
        birthYear: "1994",
        address: "Quảng Ninh",
        gender: "Nữ",
        education: "Cao đẳng",
        experience: "3 năm kinh nghiệm dịch vụ khách hàng",
        language: "Tiếng Anh trung bình",
        desiredJob: "Dịch vụ, Văn phòng",
        desiredCountry: "Singapore, Hàn Quốc",
        phone: "0910987654",
        email: "huong1994@email.com"
    },
    10: {
        name: "Đỗ Văn Hải",
        birthYear: "1987",
        address: "Bắc Ninh",
        gender: "Nam",
        education: "Trung cấp",
        experience: "7 năm kinh nghiệm hàn xì",
        language: "Tiếng Nhật N4",
        desiredJob: "Hàn xì, Xây dựng",
        desiredCountry: "Nhật Bản, Nga",
        phone: "0909876543",
        email: "hai1987@email.com"
    }
};

// Function to show candidate details
function showCandidateDetails(candidateId) {
    const candidate = detailedCandidateData[candidateId];
    if (!candidate) {
        alert('Không tìm thấy thông tin chi tiết của ứng viên này!');
        return;
    }

    // Fill modal with candidate data
    document.getElementById('candidateName').textContent = candidate.name;
    document.getElementById('candidateBirthYear').textContent = candidate.birthYear;
    document.getElementById('candidateAddress').textContent = candidate.address;
    document.getElementById('candidateGender').textContent = candidate.gender;
    document.getElementById('candidateEducation').textContent = candidate.education;
    document.getElementById('candidateExperience').textContent = candidate.experience;
    document.getElementById('candidateLanguage').textContent = candidate.language;
    document.getElementById('candidateDesiredJob').textContent = candidate.desiredJob;
    document.getElementById('candidateDesiredCountry').textContent = candidate.desiredCountry;
    document.getElementById('candidatePhone').textContent = candidate.phone;
    document.getElementById('candidateEmail').textContent = candidate.email;

    // Show modal
    const modal = document.getElementById('candidateModal');
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to close candidate modal
function closeCandidateModal() {
    const modal = document.getElementById('candidateModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Function to contact candidate
function contactCandidate() {
    const phone = document.getElementById('candidatePhone').textContent;
    const name = document.getElementById('candidateName').textContent;
    
    if (confirm(`Bạn có muốn gọi điện cho ứng viên ${name} theo số ${phone}?`)) {
        window.open(`tel:${phone}`, '_self');
    }
}

// Function to recommend job to candidate
function recommendJob() {
    const name = document.getElementById('candidateName').textContent;
    alert(`Chức năng giới thiệu việc làm cho ứng viên ${name} sẽ được phát triển sau!`);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('candidateModal');
    if (event.target === modal) {
        closeCandidateModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCandidateModal();
    }
});

// Export functions for potential future use
window.WebsiteUtils = {
    formatCurrency,
    formatDate,
    loadMoreJobs,
    viewJobDetails,
    consultJob,
    performSearch,
    displaySearchResults,
    submitForm,
    showMessage,
    showCountryFilterNotification,
    showMoreCandidates,
    showCandidateDetails,
    closeCandidateModal,
    contactCandidate,
    recommendJob
};