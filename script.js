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
            alert('Xem thêm việc làm - Chức năng này sẽ được phát triển sau!');
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

// Export functions for potential future use
window.WebsiteUtils = {
    formatCurrency,
    formatDate
};