// Search functionality for non-homepage pages
// This script handles search form submissions by redirecting to homepage with search parameters

document.addEventListener('DOMContentLoaded', function() {
    // Only run on non-homepage pages
    const isHomePage = window.location.pathname === '/index.html' || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/') ||
                      window.location.pathname.endsWith('/index.html');
    
    if (isHomePage) {
        return; // Don't run on homepage - let script.js handle it
    }
    
    // Handle search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const countrySelect = document.querySelector('select[name="quoc_gia"]');
            const industrySelect = document.querySelector('select[name="nganh_nghe"]');
            const locationSelect = document.querySelector('select[name="noi_tuyen"]');
            const genderSelect = document.querySelector('select[name="gioi_tinh"]');
            const yearSelect = document.querySelector('select[name="nam_sinh"]');
            
            // For jobs.html, the selects have different names
            const countrySelectAlt = document.querySelector('select[name="country"]');
            const industrySelectAlt = document.querySelector('select[name="industry"]');
            const locationSelectAlt = document.querySelector('select[name="location"]');
            
            const selectedCountry = (countrySelect ? countrySelect.value : '') || 
                                  (countrySelectAlt ? countrySelectAlt.value : '');
            const selectedIndustry = (industrySelect ? industrySelect.value : '') || 
                                   (industrySelectAlt ? industrySelectAlt.value : '');
            const selectedLocation = (locationSelect ? locationSelect.value : '') || 
                                   (locationSelectAlt ? locationSelectAlt.value : '');
            const selectedGender = genderSelect ? genderSelect.value : '';
            const selectedYear = yearSelect ? yearSelect.value : '';
            
            // Build URL parameters
            const params = new URLSearchParams();
            
            if (selectedCountry && selectedCountry !== '') {
                params.append('country', selectedCountry);
                
                // Get country name for display
                let countryName = getCountryName(selectedCountry);
                if (countryName) {
                    params.append('name', countryName);
                }
            }
            
            if (selectedIndustry && selectedIndustry !== '') {
                params.append('industry', selectedIndustry);
            }
            
            if (selectedLocation && selectedLocation !== '') {
                params.append('location', selectedLocation);
            }
            
            if (selectedGender && selectedGender !== '') {
                params.append('gender', selectedGender);
            }
            
            if (selectedYear && selectedYear !== '') {
                params.append('year', selectedYear);
            }
            
            // Redirect to homepage with search parameters
            const searchUrl = params.toString() ? `index.html?${params.toString()}` : 'index.html';
            window.location.href = searchUrl;
        });
    }
    
    // Handle search button clicks (in case form doesn't have submit event)
    const searchButtons = document.querySelectorAll('.btn-search-submit, button[type="submit"]');
    searchButtons.forEach(button => {
        if (button.closest('.search-form')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Trigger form submission
                const form = this.closest('.search-form');
                if (form) {
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(submitEvent);
                }
            });
        }
    });
});

// Helper function to get country display name
function getCountryName(countryValue) {
    const countryMap = {
        'nhat-ban': 'TTS Nhật Bản',
        'ky-su-nhat-ban': 'Kỹ sư Nhật Bản',
        'dai-loan': 'Đài Loan',
        'singapore': 'Singapore',
        'tokutei-nhat': 'Tokutei Nhật',
        'nga': 'Nga',
        'rumani': 'Rumani',
        'bulgaria': 'Bulgaria',
        'serbia': 'Serbia',
        'hungary': 'Hungary',
        'phap': 'Pháp',
        'algeria': 'Algeria',
        'hy-lap': 'Hy Lạp',
        'ba-lan': 'Ba Lan',
        'latvia': 'Latvia',
        'litva': 'Litva',
        'tay-ban-nha': 'Tây Ban Nha',
        'ky-su-dai-loan': 'Kỹ sư Đài Loan',
        'ireland': 'Ireland',
        'ao': 'Áo',
        'croatia': 'Croatia',
        'slovakia': 'Slovakia',
        'dan-mach': 'Đan Mạch',
        'a-rap-xe-ut': 'Ả rập xê út',
        'albania': 'Albania',
        'dubai': 'Dubai',
        'trung-quoc': 'Trung Quốc',
        'na-uy': 'Na Uy',
        'nuoc-khac': 'Nước khác'
    };
    
    return countryMap[countryValue] || '';
}