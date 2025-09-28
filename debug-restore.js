// Debug script để test chức năng khôi phục
console.log('=== DEBUG RESTORE SCRIPT LOADED ===');

// Test function đơn giản
function testRestoreLogo() {
    console.log('Testing logo restore...');
    
    // Kiểm tra elements
    const elements = {
        logoPreview: document.getElementById('logoPreview'),
        logoPreviewImg: document.getElementById('logoPreviewImg'),
        dragContent: document.querySelector('#logoDropArea .drag-drop-content'),
        headerLogo: document.querySelector('.header-left .logo img')
    };
    
    console.log('Elements found:', elements);
    
    // Test hiển thị preview trực tiếp
    if (elements.logoPreviewImg) {
        elements.logoPreviewImg.src = '/images/logos/duong-oanh-new-logo.svg';
        if (elements.dragContent) elements.dragContent.style.display = 'none';
        if (elements.logoPreview) elements.logoPreview.style.display = 'block';
        console.log('✅ Preview updated directly');
    } else {
        console.error('❌ logoPreviewImg not found');
    }
    
    // Test cập nhật header logo
    if (elements.headerLogo) {
        elements.headerLogo.src = '/images/logos/duong-oanh-new-logo.svg';
        console.log('✅ Header logo updated directly');
    } else {
        console.error('❌ headerLogo not found');
    }
}

function testRestoreBanner() {
    console.log('Testing banner restore...');
    
    // Kiểm tra elements
    const elements = {
        bannerPreview: document.getElementById('bannerPreview'),
        bannerPreviewImg: document.getElementById('bannerPreviewImg'),
        dragContent: document.querySelector('#bannerDropArea .drag-drop-content'),
        headerBanner: document.getElementById('headerBanner')
    };
    
    console.log('Elements found:', elements);
    
    // Test hiển thị preview trực tiếp
    if (elements.bannerPreviewImg) {
        elements.bannerPreviewImg.src = '/images/uploads/duong-oanh-banner.png';
        if (elements.dragContent) elements.dragContent.style.display = 'none';
        if (elements.bannerPreview) elements.bannerPreview.style.display = 'block';
        console.log('✅ Banner preview updated directly');
    } else {
        console.error('❌ bannerPreviewImg not found');
    }
    
    // Test cập nhật header banner
    if (elements.headerBanner) {
        elements.headerBanner.src = '/images/uploads/duong-oanh-banner.png';
        console.log('✅ Header banner updated directly');
    } else {
        console.error('❌ headerBanner not found');
    }
}

// Test API call
async function testAPICall() {
    console.log('Testing API call...');
    
    try {
        const response = await fetch('/api/admin/content/header', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                logo: '/images/logos/duong-oanh-new-logo.svg',
                companyName: 'Dương Oanh XKLĐ',
                slogan: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
            })
        });
        
        const result = await response.json();
        console.log('API response:', result);
        
        if (result.success) {
            console.log('✅ API call successful');
            return true;
        } else {
            console.error('❌ API call failed:', result.message);
            return false;
        }
        
    } catch (error) {
        console.error('❌ API error:', error);
        return false;
    }
}

// Combined test
async function fullTestRestore() {
    console.log('=== FULL RESTORE TEST ===');
    
    // Test API first
    const apiSuccess = await testAPICall();
    if (!apiSuccess) {
        console.error('API test failed, stopping');
        return;
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test UI updates
    testRestoreLogo();
    testRestoreBanner();
    
    console.log('=== TEST COMPLETE ===');
}

// Make functions global
window.testRestoreLogo = testRestoreLogo;
window.testRestoreBanner = testRestoreBanner;
window.testAPICall = testAPICall;
window.fullTestRestore = fullTestRestore;

console.log('Debug functions available:');
console.log('- testRestoreLogo()');
console.log('- testRestoreBanner()');
console.log('- testAPICall()');
console.log('- fullTestRestore()');
