// Debug script để kiểm tra logo và banner
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        console.log('=== DEBUG LOGO & BANNER API ===');
        
        // Test API load header content
        try {
            console.log('Testing /api/admin/content/header...');
            const response = await fetch('/api/admin/content/header');
            console.log('Response status:', response.status);
            
            if (response.ok) {
                const result = await response.json();
                console.log('Header content result:', result);
                
                if (result.success && result.data) {
                    console.log('Header data found:', result.data);
                    if (result.data.logo) {
                        console.log('Logo URL:', result.data.logo);
                    } else {
                        console.log('No logo in header data');
                    }
                } else {
                    console.log('No header data or failed');
                }
            } else {
                console.error('Failed to load header content');
            }
        } catch (error) {
            console.error('Error loading header content:', error);
        }
        
        // Test API load home content (for banner)
        try {
            console.log('Testing /api/admin/content/home...');
            const response = await fetch('/api/admin/content/home');
            console.log('Response status:', response.status);
            
            if (response.ok) {
                const result = await response.json();
                console.log('Home content result:', result);
                
                if (result.success && result.data) {
                    console.log('Home data found:', result.data);
                    if (result.data.banner) {
                        console.log('Banner URL:', result.data.banner);
                    } else {
                        console.log('No banner in home data');
                    }
                } else {
                    console.log('No home data or failed');
                }
            } else {
                console.error('Failed to load home content');
            }
        } catch (error) {
            console.error('Error loading home content:', error);
        }
        
        // Check current logo and banner elements
        const headerLogo = document.querySelector('.header-left .logo img');
        const footerLogo = document.querySelector('.footer-logo img');
        const bannerImg = document.querySelector('.hero-banner img');
        
        console.log('Current elements:', {
            headerLogo: headerLogo ? headerLogo.src : 'Not found',
            footerLogo: footerLogo ? footerLogo.src : 'Not found',
            bannerImg: bannerImg ? bannerImg.src : 'Not found'
        });
        
        console.log('=== END DEBUG ===');
    }, 2000);
});

// Function to manually test logo upload
async function testLogoUpload() {
    console.log('=== TESTING LOGO UPLOAD ===');
    
    // Create a test form data
    const testData = {
        logo: '/images/logos/test-logo.png',
        companyName: 'Test Company',
        slogan: 'Test Slogan'
    };
    
    try {
        const response = await fetch('/api/admin/content/header', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('Logo upload response:', response.status);
        const result = await response.json();
        console.log('Logo upload result:', result);
        
    } catch (error) {
        console.error('Logo upload error:', error);
    }
}

// Function to manually test banner upload  
async function testBannerUpload() {
    console.log('=== TESTING BANNER UPLOAD ===');
    
    const testData = {
        banner: '/images/banners/test-banner.jpg',
        title: 'Test Title',
        subtitle: 'Test Subtitle'
    };
    
    try {
        const response = await fetch('/api/admin/content/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        
        console.log('Banner upload response:', response.status);
        const result = await response.json();
        console.log('Banner upload result:', result);
        
    } catch (error) {
        console.error('Banner upload error:', error);
    }
}

// Make functions available globally for testing
window.testLogoUpload = testLogoUpload;
window.testBannerUpload = testBannerUpload;
