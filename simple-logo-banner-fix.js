// Simple fix cho logo và banner - không phức tạp
// Load immediately when script loads - before DOMContentLoaded
(async function() {
    console.log('=== IMMEDIATE LOGO BANNER LOAD ===');
    
    // Load logo and banner data immediately
    try {
        const [logoResponse, bannerResponse] = await Promise.all([
            fetch('/api/admin/content/header'),
            fetch('/api/admin/content/home')
        ]);
        
        let logoUrl = null;
        let bannerUrl = null;
        
        // Parse logo data
        if (logoResponse.ok) {
            const logoResult = await logoResponse.json();
            if (logoResult && logoResult.data) {
                let data = logoResult.data;
                while (data && data.data) {
                    data = data.data;
                }
                logoUrl = data.logo;
            }
        }
        
        // Parse banner data
        if (bannerResponse.ok) {
            const bannerResult = await bannerResponse.json();
            if (bannerResult && bannerResult.data) {
                let data = bannerResult.data;
                while (data && data.data) {
                    data = data.data;
                }
                bannerUrl = data.banner;
            }
        }
        
        // Store in global variables for immediate use
        window.CURRENT_LOGO_URL = logoUrl;
        window.CURRENT_BANNER_URL = bannerUrl;
        
        console.log('Pre-loaded URLs:', { logoUrl, bannerUrl });
        
    } catch (error) {
        console.error('Error pre-loading images:', error);
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM LOADED - APPLYING IMAGES ===');
    
    // Apply pre-loaded images immediately
    applyPreloadedImages();
    
    // Setup upload handlers
    setupSimpleUpload();
    
    // Load from API as backup (with delay to avoid flicker)
    setTimeout(() => {
        loadLogoFromAPI();
        loadBannerFromAPI();
    }, 2000);
});

function applyPreloadedImages() {
    // Use preloaded data from head script first
    const logoUrl = window.PRELOADED_LOGO || window.CURRENT_LOGO_URL;
    const bannerUrl = window.PRELOADED_BANNER || window.CURRENT_BANNER_URL;
    
    // Apply logo if available
    if (logoUrl) {
        const headerLogo = document.querySelector('.header-left .logo img');
        const footerLogo = document.querySelector('.footer-logo img');
        
        if (headerLogo) {
            headerLogo.src = logoUrl;
            console.log('✅ Header logo applied immediately:', logoUrl);
        }
        if (footerLogo) {
            footerLogo.src = logoUrl;
            console.log('✅ Footer logo applied immediately');
        }
    }
    
    // Apply banner if available
    if (bannerUrl) {
        const headerBanner = document.getElementById('headerBanner');
        if (headerBanner) {
            headerBanner.src = bannerUrl;
            console.log('✅ Banner applied immediately:', bannerUrl);
        }
    }
}

async function loadLogoFromAPI() {
    try {
        console.log('Loading logo from API...');
        const response = await fetch('/api/admin/content/header');
        const text = await response.text();
        console.log('Raw API response:', text);
        
        const result = JSON.parse(text);
        console.log('Parsed result:', result);
        
        // Parse nested data
        let logoUrl = null;
        if (result && result.data) {
            let data = result.data;
            // Handle nested structure
            while (data && data.data) {
                data = data.data;
            }
            logoUrl = data.logo;
        }
        
        console.log('Logo URL found:', logoUrl);
        
        if (logoUrl) {
            // Update all logo elements
            const headerLogo = document.querySelector('.header-left .logo img');
            const footerLogo = document.querySelector('.footer-logo img');
            
            if (headerLogo) {
                headerLogo.src = logoUrl;
                console.log('✅ Header logo updated');
            }
            if (footerLogo) {
                footerLogo.src = logoUrl;
                console.log('✅ Footer logo updated');
            }
        }
        
    } catch (error) {
        console.error('Error loading logo:', error);
    }
}

async function loadBannerFromAPI() {
    try {
        console.log('Loading banner from API...');
        const response = await fetch('/api/admin/content/home');
        const text = await response.text();
        console.log('Raw banner API response:', text);
        
        const result = JSON.parse(text);
        console.log('Parsed banner result:', result);
        
        // Parse nested data
        let bannerUrl = null;
        if (result && result.data) {
            let data = result.data;
            // Handle nested structure
            while (data && data.data) {
                data = data.data;
            }
            bannerUrl = data.banner;
        }
        
        console.log('Banner URL found:', bannerUrl);
        
        if (bannerUrl) {
            const headerBanner = document.getElementById('headerBanner');
            if (headerBanner) {
                headerBanner.src = bannerUrl;
                console.log('✅ Banner updated');
            }
        }
        
    } catch (error) {
        console.error('Error loading banner:', error);
    }
}

function setupSimpleUpload() {
    // Logo upload
    const logoArea = document.getElementById('logoDropArea');
    const logoInput = document.getElementById('logoFileInput');
    
    if (logoArea && logoInput) {
        logoArea.addEventListener('click', () => {
            console.log('Logo area clicked');
            logoInput.click();
        });
        
        logoInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Logo file selected:', file.name);
                await uploadLogoSimple(file);
            }
        });
    }
    
    // Banner upload
    const bannerArea = document.getElementById('bannerDropArea');
    const bannerInput = document.getElementById('bannerFileInput');
    
    if (bannerArea && bannerInput) {
        bannerArea.addEventListener('click', () => {
            console.log('Banner area clicked');
            bannerInput.click();
        });
        
        bannerInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Banner file selected:', file.name);
                await uploadBannerSimple(file);
            }
        });
    }
}

async function uploadLogoSimple(file) {
    try {
        console.log('Uploading logo...');
        
        // Show preview first
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoPreview = document.getElementById('logoPreview');
            const logoPreviewImg = document.getElementById('logoPreviewImg');
            const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
            
            if (logoPreviewImg) {
                logoPreviewImg.src = e.target.result;
                if (dragContent) dragContent.style.display = 'none';
                if (logoPreview) logoPreview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
        
        // Upload to server
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/admin/upload-logo', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Logo upload result:', result);
        
        if (result.success) {
            // Save to database
            const saveResponse = await fetch('/api/admin/content/header', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    logo: result.image_url,
                    companyName: 'Dương Oanh XKLĐ',
                    slogan: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
                })
            });
            
            const saveResult = await saveResponse.json();
            console.log('Logo save result:', saveResult);
            
            if (saveResult.success) {
                alert('✅ Logo đã được cập nhật thành công!');
                // Reload logo
                setTimeout(() => loadLogoFromAPI(), 1000);
            }
        } else {
            alert('❌ Lỗi upload logo: ' + result.message);
        }
        
    } catch (error) {
        console.error('Logo upload error:', error);
        alert('❌ Lỗi upload logo: ' + error.message);
    }
}

async function uploadBannerSimple(file) {
    try {
        console.log('Uploading banner...');
        
        // Show preview first
        const reader = new FileReader();
        reader.onload = function(e) {
            const bannerPreview = document.getElementById('bannerPreview');
            const bannerPreviewImg = document.getElementById('bannerPreviewImg');
            const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
            
            if (bannerPreviewImg) {
                bannerPreviewImg.src = e.target.result;
                if (dragContent) dragContent.style.display = 'none';
                if (bannerPreview) bannerPreview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
        
        // Upload to server
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/admin/upload-banner', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Banner upload result:', result);
        
        if (result.success) {
            // Save to database
            const saveResponse = await fetch('/api/admin/content/home', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    banner: result.image_url,
                    title: 'DƯƠNG OANH XKLĐ TUYỂN DỤNG',
                    subtitle: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
                })
            });
            
            const saveResult = await saveResponse.json();
            console.log('Banner save result:', saveResult);
            
            if (saveResult.success) {
                alert('✅ Banner đã được cập nhật thành công!');
                // Reload banner
                setTimeout(() => loadBannerFromAPI(), 1000);
            }
        } else {
            alert('❌ Lỗi upload banner: ' + result.message);
        }
        
    } catch (error) {
        console.error('Banner upload error:', error);
        alert('❌ Lỗi upload banner: ' + error.message);
    }
}

// Original default images
const DEFAULT_LOGO = '/images/logos/duong-oanh-new-logo.svg';
const DEFAULT_BANNER = '/images/uploads/duong-oanh-banner.png';

// Functions to restore original images
async function restoreOriginalLogo() {
    console.log('Restoring original logo...');
    
    try {
        // Save original logo to database
        const response = await fetch('/api/admin/content/header', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                logo: DEFAULT_LOGO,
                companyName: 'Dương Oanh XKLĐ',
                slogan: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
            })
        });
        
        const result = await response.json();
        console.log('Logo restore result:', result);
        
        if (result.success) {
            // Update all logo elements immediately
            const headerLogo = document.querySelector('.header-left .logo img');
            const footerLogo = document.querySelector('.footer-logo img');
            
            if (headerLogo) {
                headerLogo.src = DEFAULT_LOGO;
                console.log('✅ Header logo restored');
            }
            if (footerLogo) {
                footerLogo.src = DEFAULT_LOGO;
                console.log('✅ Footer logo restored');
            }
            
            // Show admin preview with original logo
            const logoPreview = document.getElementById('logoPreview');
            const logoPreviewImg = document.getElementById('logoPreviewImg');
            const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
            const hiddenInput = document.getElementById('logoFile');
            const fileInput = document.getElementById('logoFileInput');
            
            if (logoPreviewImg) {
                logoPreviewImg.src = DEFAULT_LOGO;
                if (dragContent) dragContent.style.display = 'none';
                if (logoPreview) logoPreview.style.display = 'block';
                console.log('✅ Logo preview restored');
            }
            if (hiddenInput) hiddenInput.value = DEFAULT_LOGO;
            if (fileInput) fileInput.value = '';
            
            alert('✅ Logo đã được khôi phục về hình ảnh gốc!');
            
            // Reload trang chủ nếu đang mở trong tab khác
            setTimeout(() => {
                if (window.opener && !window.opener.closed) {
                    window.opener.location.reload();
                }
            }, 1000);
        } else {
            alert('❌ Lỗi khôi phục logo: ' + result.message);
        }
        
    } catch (error) {
        console.error('Logo restore error:', error);
        alert('❌ Lỗi khôi phục logo: ' + error.message);
    }
}

async function restoreOriginalBanner() {
    console.log('Restoring original banner...');
    
    try {
        // Save original banner to database
        const response = await fetch('/api/admin/content/home', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                banner: DEFAULT_BANNER,
                title: 'DƯƠNG OANH XKLĐ TUYỂN DỤNG',
                subtitle: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
            })
        });
        
        const result = await response.json();
        console.log('Banner restore result:', result);
        
        if (result.success) {
            // Update banner element immediately
            const headerBanner = document.getElementById('headerBanner');
            if (headerBanner) {
                headerBanner.src = DEFAULT_BANNER;
                console.log('✅ Banner restored');
            }
            
            // Show admin preview with original banner
            const bannerPreview = document.getElementById('bannerPreview');
            const bannerPreviewImg = document.getElementById('bannerPreviewImg');
            const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
            const hiddenInput = document.getElementById('bannerFile');
            const fileInput = document.getElementById('bannerFileInput');
            
            if (bannerPreviewImg) {
                bannerPreviewImg.src = DEFAULT_BANNER;
                if (dragContent) dragContent.style.display = 'none';
                if (bannerPreview) bannerPreview.style.display = 'block';
                console.log('✅ Banner preview restored');
            }
            if (hiddenInput) hiddenInput.value = DEFAULT_BANNER;
            if (fileInput) fileInput.value = '';
            
            alert('✅ Banner đã được khôi phục về hình ảnh gốc!');
            
            // Reload trang chủ nếu đang mở trong tab khác
            setTimeout(() => {
                if (window.opener && !window.opener.closed) {
                    window.opener.location.reload();
                }
            }, 1000);
        } else {
            alert('❌ Lỗi khôi phục banner: ' + result.message);
        }
        
    } catch (error) {
        console.error('Banner restore error:', error);
        alert('❌ Lỗi khôi phục banner: ' + error.message);
    }
}

// Debug function to check elements
function debugElements() {
    console.log('=== DEBUG ELEMENTS ===');
    console.log('Logo elements:', {
        logoPreview: document.getElementById('logoPreview'),
        logoPreviewImg: document.getElementById('logoPreviewImg'),
        dragContent: document.querySelector('#logoDropArea .drag-drop-content'),
        hiddenInput: document.getElementById('logoFile'),
        fileInput: document.getElementById('logoFileInput'),
        headerLogo: document.querySelector('.header-left .logo img'),
        footerLogo: document.querySelector('.footer-logo img')
    });
    
    console.log('Banner elements:', {
        bannerPreview: document.getElementById('bannerPreview'),
        bannerPreviewImg: document.getElementById('bannerPreviewImg'),
        dragContent: document.querySelector('#bannerDropArea .drag-drop-content'),
        hiddenInput: document.getElementById('bannerFile'),
        fileInput: document.getElementById('bannerFileInput'),
        headerBanner: document.getElementById('headerBanner')
    });
}

// Make functions available globally
window.restoreOriginalLogo = restoreOriginalLogo;
window.restoreOriginalBanner = restoreOriginalBanner;
window.debugElements = debugElements;
