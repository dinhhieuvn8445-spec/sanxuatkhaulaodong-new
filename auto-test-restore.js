// Auto test restore functions - No console needed
console.log('=== AUTO TEST RESTORE LOADED ===');

// Override restoreOriginalLogo with auto-test
window.restoreOriginalLogo = async function() {
    const DEFAULT_LOGO = '/images/logos/duong-oanh-new-logo.svg';
    
    // Step 1: Check elements silently (no alert)
    const logoPreviewImg = document.getElementById('logoPreviewImg');
    const logoPreview = document.getElementById('logoPreview');
    const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
    const headerLogo = document.querySelector('.header-left .logo img');
    
    // Log to console instead of alert
    console.log('🔍 KIỂM TRA ELEMENTS:');
    console.log('logoPreviewImg:', logoPreviewImg ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('logoPreview:', logoPreview ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('dragContent:', dragContent ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('headerLogo:', headerLogo ? 'OK' : 'KHÔNG TÌM THẤY');
    
    try {
        // Step 2: Update database
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
        
        if (result.success) {
            console.log('✅ DATABASE: Lưu thành công!');
            
            // Step 3: Update UI - Force update
            if (logoPreviewImg) {
                logoPreviewImg.src = DEFAULT_LOGO + '?t=' + Date.now(); // Cache busting
                if (logoPreview) logoPreview.style.display = 'block';
                if (dragContent) dragContent.style.display = 'none';
                console.log('✅ ADMIN PREVIEW: Đã cập nhật!');
            }
            
            if (headerLogo) {
                headerLogo.src = DEFAULT_LOGO + '?t=' + Date.now(); // Cache busting
                console.log('✅ WEBSITE LOGO: Đã cập nhật!');
            }
            
            // Step 4: Final success - Only this alert
            alert('✅ Logo đã được khôi phục thành công!');
            
        } else {
            alert('❌ DATABASE ERROR: ' + (result.message || 'Không thể lưu vào database'));
        }
        
    } catch (error) {
        alert('❌ NETWORK ERROR: ' + error.message);
    }
};

// Override restoreOriginalBanner with auto-test
window.restoreOriginalBanner = async function() {
    const DEFAULT_BANNER = '/images/uploads/duong-oanh-banner.png';
    
    // Step 1: Check elements silently (no alert)
    const bannerPreviewImg = document.getElementById('bannerPreviewImg');
    const bannerPreview = document.getElementById('bannerPreview');
    const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
    const headerBanner = document.getElementById('headerBanner');
    
    // Log to console instead of alert
    console.log('🔍 KIỂM TRA BANNER ELEMENTS:');
    console.log('bannerPreviewImg:', bannerPreviewImg ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('bannerPreview:', bannerPreview ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('dragContent:', dragContent ? 'OK' : 'KHÔNG TÌM THẤY');
    console.log('headerBanner:', headerBanner ? 'OK' : 'KHÔNG TÌM THẤY');
    
    try {
        // Step 2: Update database
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
        
        if (result.success) {
            console.log('✅ DATABASE: Lưu thành công!');
            
            // Step 3: Update UI - Force update
            if (bannerPreviewImg) {
                bannerPreviewImg.src = DEFAULT_BANNER + '?t=' + Date.now(); // Cache busting
                if (bannerPreview) bannerPreview.style.display = 'block';
                if (dragContent) dragContent.style.display = 'none';
                console.log('✅ ADMIN PREVIEW: Đã cập nhật!');
            }
            
            if (headerBanner) {
                headerBanner.src = DEFAULT_BANNER + '?t=' + Date.now(); // Cache busting
                console.log('✅ WEBSITE BANNER: Đã cập nhật!');
            }
            
            // Step 4: Final success - Only this alert
            alert('✅ Banner đã được khôi phục thành công!');
            
        } else {
            alert('❌ DATABASE ERROR: ' + (result.message || 'Không thể lưu vào database'));
        }
        
    } catch (error) {
        alert('❌ NETWORK ERROR: ' + error.message);
    }
};

console.log('✅ Auto-test restore functions loaded - No console commands needed!');
