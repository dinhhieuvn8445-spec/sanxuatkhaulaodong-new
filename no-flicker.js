// No flicker solution - Override default images immediately
console.log('🔥 NO FLICKER SCRIPT LOADING...');

// Get current images from server immediately (blocking)
function getCurrentImages() {
    try {
        // Use synchronous XMLHttpRequest to get data immediately
        const logoXHR = new XMLHttpRequest();
        logoXHR.open('GET', '/api/admin/content/header', false);
        logoXHR.send();
        
        const bannerXHR = new XMLHttpRequest();
        bannerXHR.open('GET', '/api/admin/content/home', false);
        bannerXHR.send();
        
        let logoUrl = null;
        let bannerUrl = null;
        
        if (logoXHR.status === 200) {
            const logoResult = JSON.parse(logoXHR.responseText);
            if (logoResult && logoResult.data) {
                let data = logoResult.data;
                while (data && data.data) data = data.data;
                logoUrl = data.logo;
            }
        }
        
        if (bannerXHR.status === 200) {
            const bannerResult = JSON.parse(bannerXHR.responseText);
            if (bannerResult && bannerResult.data) {
                let data = bannerResult.data;
                while (data && data.data) data = data.data;
                bannerUrl = data.banner;
            }
        }
        
        return { logoUrl, bannerUrl };
        
    } catch (error) {
        console.error('Error getting current images:', error);
        return { logoUrl: null, bannerUrl: null };
    }
}

// Get images immediately
const { logoUrl, bannerUrl } = getCurrentImages();
console.log('🎯 Retrieved URLs:', { logoUrl, bannerUrl });

// Store globally
window.NO_FLICKER_LOGO = logoUrl;
window.NO_FLICKER_BANNER = bannerUrl;

// Function to replace images immediately
function replaceImagesNow() {
    if (window.NO_FLICKER_LOGO) {
        // Replace all logo images
        const logoImages = document.querySelectorAll('.header-left .logo img, .footer-logo img');
        logoImages.forEach(img => {
            if (img.src !== window.NO_FLICKER_LOGO) {
                img.src = window.NO_FLICKER_LOGO;
                console.log('🔥 Logo replaced:', img);
            }
        });
    }
    
    if (window.NO_FLICKER_BANNER) {
        // Replace banner image
        const bannerImg = document.getElementById('headerBanner');
        if (bannerImg && bannerImg.src !== window.NO_FLICKER_BANNER) {
            bannerImg.src = window.NO_FLICKER_BANNER;
            console.log('🔥 Banner replaced:', bannerImg);
        }
    }
}

// Replace immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceImagesNow);
} else {
    replaceImagesNow();
}

// Also replace every 50ms for the first 1 second to catch any late elements
let replaceCount = 0;
const replaceInterval = setInterval(() => {
    replaceImagesNow();
    replaceCount++;
    if (replaceCount >= 20) { // 1 second
        clearInterval(replaceInterval);
        console.log('🔥 No flicker replacement complete');
    }
}, 50);

console.log('✅ No flicker script loaded');
