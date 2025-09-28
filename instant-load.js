// Instant load - No delay, no flicker
console.log('🚀 INSTANT LOAD SCRIPT');

// Synchronous fetch to get current logo/banner immediately
function getImageUrlSync(endpoint) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint, false); // Synchronous
        xhr.send();
        
        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            if (result && result.data) {
                let data = result.data;
                while (data && data.data) {
                    data = data.data;
                }
                return data.logo || data.banner;
            }
        }
    } catch (error) {
        console.error('Sync fetch error:', error);
    }
    return null;
}

// Get current URLs immediately
const currentLogo = getImageUrlSync('/api/admin/content/header');
const currentBanner = getImageUrlSync('/api/admin/content/home');

console.log('🎯 Current URLs:', { currentLogo, currentBanner });

// Store for immediate use
window.INSTANT_LOGO = currentLogo;
window.INSTANT_BANNER = currentBanner;

// Apply immediately when DOM elements are available
function applyInstantImages() {
    // Logo
    if (window.INSTANT_LOGO) {
        const headerLogo = document.querySelector('.header-left .logo img');
        const footerLogo = document.querySelector('.footer-logo img');
        
        if (headerLogo && headerLogo.src !== window.INSTANT_LOGO) {
            headerLogo.src = window.INSTANT_LOGO;
            console.log('⚡ Logo applied instantly:', window.INSTANT_LOGO);
        }
        if (footerLogo && footerLogo.src !== window.INSTANT_LOGO) {
            footerLogo.src = window.INSTANT_LOGO;
        }
    }
    
    // Banner
    if (window.INSTANT_BANNER) {
        const headerBanner = document.getElementById('headerBanner');
        if (headerBanner && headerBanner.src !== window.INSTANT_BANNER) {
            headerBanner.src = window.INSTANT_BANNER;
            console.log('⚡ Banner applied instantly:', window.INSTANT_BANNER);
        }
    }
}

// Apply as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyInstantImages);
} else {
    applyInstantImages();
}

// Also apply on any image load event
document.addEventListener('DOMContentLoaded', function() {
    // Monitor for image elements and apply immediately
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                applyInstantImages();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Apply every 100ms for first 2 seconds to catch any late loading
    let attempts = 0;
    const interval = setInterval(() => {
        applyInstantImages();
        attempts++;
        if (attempts >= 20) { // 2 seconds
            clearInterval(interval);
        }
    }, 100);
});

console.log('✅ Instant load script ready');
