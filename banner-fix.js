// Fix banner loading from database
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        console.log('Loading banner from database...');
        
        try {
            const response = await fetch('/api/admin/content/home');
            if (response.ok) {
                const result = await response.json();
                console.log('Home content API response:', result);
                
                if (result.success && result.data && result.data.banner) {
                    const headerBanner = document.getElementById('headerBanner');
                    if (headerBanner) {
                        headerBanner.src = result.data.banner;
                        console.log('✅ Banner loaded from database:', result.data.banner);
                    } else {
                        console.log('❌ Header banner element not found');
                    }
                } else {
                    console.log('No banner data found in database');
                }
            } else {
                console.log('Failed to fetch home content:', response.status);
            }
        } catch (error) {
            console.error('Error loading banner:', error);
        }
    }, 2000);
});
