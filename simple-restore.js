// Simple restore functions - Override existing ones
console.log('=== SIMPLE RESTORE LOADED ===');

// Override restoreOriginalLogo function
window.restoreOriginalLogo = async function() {
    console.log('🔄 Restoring logo...');
    
    const DEFAULT_LOGO = '/images/logos/duong-oanh-new-logo.svg';
    
    try {
        // 1. Update database first
        console.log('📡 Saving to database...');
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
        console.log('💾 Database result:', result);
        
        if (result.success) {
            // 2. Update admin preview
            console.log('🖼️ Updating admin preview...');
            const logoPreviewImg = document.getElementById('logoPreviewImg');
            const logoPreview = document.getElementById('logoPreview');
            const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
            
            if (logoPreviewImg) {
                logoPreviewImg.src = DEFAULT_LOGO;
                logoPreviewImg.onload = () => console.log('✅ Preview image loaded');
                logoPreviewImg.onerror = () => console.error('❌ Preview image failed to load');
                
                if (logoPreview) logoPreview.style.display = 'block';
                if (dragContent) dragContent.style.display = 'none';
                console.log('✅ Admin preview updated');
            } else {
                console.error('❌ logoPreviewImg element not found');
            }
            
            // 3. Update website header/footer
            console.log('🌐 Updating website...');
            const headerLogo = document.querySelector('.header-left .logo img');
            const footerLogo = document.querySelector('.footer-logo img');
            
            if (headerLogo) {
                headerLogo.src = DEFAULT_LOGO;
                console.log('✅ Header logo updated');
            }
            if (footerLogo) {
                footerLogo.src = DEFAULT_LOGO;
                console.log('✅ Footer logo updated');
            }
            
            // 4. Update form inputs
            const hiddenInput = document.getElementById('logoFile');
            const fileInput = document.getElementById('logoFileInput');
            if (hiddenInput) hiddenInput.value = DEFAULT_LOGO;
            if (fileInput) fileInput.value = '';
            
            // 5. Success message
            alert('✅ Logo đã được khôi phục thành công!');
            console.log('🎉 Logo restore completed successfully');
            
        } else {
            throw new Error(result.message || 'Database save failed');
        }
        
    } catch (error) {
        console.error('❌ Logo restore error:', error);
        alert('❌ Lỗi khôi phục logo: ' + error.message);
    }
};

// Override restoreOriginalBanner function
window.restoreOriginalBanner = async function() {
    console.log('🔄 Restoring banner...');
    
    const DEFAULT_BANNER = '/images/uploads/duong-oanh-banner.png';
    
    try {
        // 1. Update database first
        console.log('📡 Saving to database...');
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
        console.log('💾 Database result:', result);
        
        if (result.success) {
            // 2. Update admin preview
            console.log('🖼️ Updating admin preview...');
            const bannerPreviewImg = document.getElementById('bannerPreviewImg');
            const bannerPreview = document.getElementById('bannerPreview');
            const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
            
            if (bannerPreviewImg) {
                bannerPreviewImg.src = DEFAULT_BANNER;
                bannerPreviewImg.onload = () => console.log('✅ Banner preview image loaded');
                bannerPreviewImg.onerror = () => console.error('❌ Banner preview image failed to load');
                
                if (bannerPreview) bannerPreview.style.display = 'block';
                if (dragContent) dragContent.style.display = 'none';
                console.log('✅ Admin banner preview updated');
            } else {
                console.error('❌ bannerPreviewImg element not found');
            }
            
            // 3. Update website header banner
            console.log('🌐 Updating website banner...');
            const headerBanner = document.getElementById('headerBanner');
            
            if (headerBanner) {
                headerBanner.src = DEFAULT_BANNER;
                console.log('✅ Header banner updated');
            } else {
                console.error('❌ headerBanner element not found');
            }
            
            // 4. Update form inputs
            const hiddenInput = document.getElementById('bannerFile');
            const fileInput = document.getElementById('bannerFileInput');
            if (hiddenInput) hiddenInput.value = DEFAULT_BANNER;
            if (fileInput) fileInput.value = '';
            
            // 5. Success message
            alert('✅ Banner đã được khôi phục thành công!');
            console.log('🎉 Banner restore completed successfully');
            
        } else {
            throw new Error(result.message || 'Database save failed');
        }
        
    } catch (error) {
        console.error('❌ Banner restore error:', error);
        alert('❌ Lỗi khôi phục banner: ' + error.message);
    }
};

// Test function to check all elements
window.checkElements = function() {
    console.log('=== ELEMENT CHECK ===');
    
    const elements = {
        // Logo elements
        logoPreview: document.getElementById('logoPreview'),
        logoPreviewImg: document.getElementById('logoPreviewImg'),
        logoDropArea: document.getElementById('logoDropArea'),
        logoFile: document.getElementById('logoFile'),
        logoFileInput: document.getElementById('logoFileInput'),
        
        // Banner elements
        bannerPreview: document.getElementById('bannerPreview'),
        bannerPreviewImg: document.getElementById('bannerPreviewImg'),
        bannerDropArea: document.getElementById('bannerDropArea'),
        bannerFile: document.getElementById('bannerFile'),
        bannerFileInput: document.getElementById('bannerFileInput'),
        
        // Website elements
        headerLogo: document.querySelector('.header-left .logo img'),
        footerLogo: document.querySelector('.footer-logo img'),
        headerBanner: document.getElementById('headerBanner')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
        if (element) {
            console.log(`✅ ${name}:`, element);
        } else {
            console.error(`❌ ${name}: NOT FOUND`);
        }
    });
    
    return elements;
};

console.log('✅ Simple restore functions loaded');
console.log('Available functions: restoreOriginalLogo(), restoreOriginalBanner(), checkElements()');
