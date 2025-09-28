// Debug script for Logo and Banner upload functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('=== LOGO & BANNER DEBUG ===');
        
        // Check Logo elements
        const logoElements = {
            dragDropArea: document.getElementById('logoDropArea'),
            fileInput: document.getElementById('logoFileInput'),
            imagePreview: document.getElementById('logoPreview'),
            hiddenInput: document.getElementById('logoFile'),
            previewImg: document.getElementById('logoPreviewImg'),
            uploadProgress: document.getElementById('logoUploadProgress'),
            progressFill: document.getElementById('logoProgressFill'),
            progressText: document.getElementById('logoProgressText')
        };
        
        console.log('Logo elements check:', logoElements);
        
        // Check Banner elements
        const bannerElements = {
            dragDropArea: document.getElementById('bannerDropArea'),
            fileInput: document.getElementById('bannerFileInput'),
            imagePreview: document.getElementById('bannerPreview'),
            hiddenInput: document.getElementById('bannerFile'),
            previewImg: document.getElementById('bannerPreviewImg'),
            uploadProgress: document.getElementById('bannerUploadProgress'),
            progressFill: document.getElementById('bannerProgressFill'),
            progressText: document.getElementById('bannerProgressText')
        };
        
        console.log('Banner elements check:', bannerElements);
        
        // Check if managers are initialized
        console.log('Upload managers:', {
            logoManager: window.logoUploadManager,
            bannerManager: window.bannerUploadManager,
            jobImageManager: window.jobImageUploadManager
        });
        
        // Add manual click handlers for testing
        if (logoElements.dragDropArea) {
            logoElements.dragDropArea.addEventListener('click', function(e) {
                console.log('Logo area clicked!');
                if (logoElements.fileInput) {
                    logoElements.fileInput.click();
                } else {
                    console.error('Logo file input not found!');
                }
            });
            
            if (logoElements.fileInput) {
                logoElements.fileInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        console.log('Logo file selected:', file.name);
                        showLogoPreview(file);
                    }
                });
            }
        }
        
        if (bannerElements.dragDropArea) {
            bannerElements.dragDropArea.addEventListener('click', function(e) {
                console.log('Banner area clicked!');
                if (bannerElements.fileInput) {
                    bannerElements.fileInput.click();
                } else {
                    console.error('Banner file input not found!');
                }
            });
            
            if (bannerElements.fileInput) {
                bannerElements.fileInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        console.log('Banner file selected:', file.name);
                        showBannerPreview(file);
                    }
                });
            }
        }
        
        console.log('=== DEBUG SETUP COMPLETE ===');
    }, 1500);
});

async function showLogoPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoPreview = document.getElementById('logoPreview');
        const logoPreviewImg = document.getElementById('logoPreviewImg');
        const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
        
        if (logoPreviewImg) {
            logoPreviewImg.src = e.target.result;
            if (dragContent) dragContent.style.display = 'none';
            if (logoPreview) logoPreview.style.display = 'block';
            
            console.log('Logo preview shown successfully');
        }
    };
    reader.readAsDataURL(file);
    
    // Upload file thật lên server
    await uploadLogoFile(file);
}

async function showBannerPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const bannerPreview = document.getElementById('bannerPreview');
        const bannerPreviewImg = document.getElementById('bannerPreviewImg');
        const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
        
        if (bannerPreviewImg) {
            bannerPreviewImg.src = e.target.result;
            if (dragContent) dragContent.style.display = 'none';
            if (bannerPreview) bannerPreview.style.display = 'block';
            
            console.log('Banner preview shown successfully');
        }
    };
    reader.readAsDataURL(file);
    
    // Upload file thật lên server
    await uploadBannerFile(file);
}

// Global functions for remove buttons
function removeLogo() {
    const logoPreview = document.getElementById('logoPreview');
    const dragContent = document.querySelector('#logoDropArea .drag-drop-content');
    const hiddenInput = document.getElementById('logoFile');
    const fileInput = document.getElementById('logoFileInput');
    
    if (logoPreview) logoPreview.style.display = 'none';
    if (dragContent) dragContent.style.display = 'block';
    if (hiddenInput) hiddenInput.value = '';
    if (fileInput) fileInput.value = '';
    
    console.log('Logo removed');
}

function removeBanner() {
    const bannerPreview = document.getElementById('bannerPreview');
    const dragContent = document.querySelector('#bannerDropArea .drag-drop-content');
    const hiddenInput = document.getElementById('bannerFile');
    const fileInput = document.getElementById('bannerFileInput');
    
    if (bannerPreview) bannerPreview.style.display = 'none';
    if (dragContent) dragContent.style.display = 'block';
    if (hiddenInput) hiddenInput.value = '';
    if (fileInput) fileInput.value = '';
    
    console.log('Banner removed');
}

// Functions to upload files to server
async function uploadLogoFile(file) {
    console.log('Uploading logo file:', file.name);
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/admin/upload-logo', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Logo upload result:', result);
        
        if (result.success) {
            console.log('✅ Logo uploaded successfully:', result.image_url);
            
            // Set hidden input với URL thật
            const hiddenInput = document.getElementById('logoFile');
            if (hiddenInput) {
                hiddenInput.value = result.image_url;
            }
            
            // Lưu vào database với URL thật
            await saveLogo(result.image_url);
        } else {
            console.error('❌ Logo upload failed:', result.message);
            alert('Lỗi upload logo: ' + result.message);
        }
        
    } catch (error) {
        console.error('❌ Logo upload error:', error);
        alert('Lỗi upload logo: ' + error.message);
    }
}

async function uploadBannerFile(file) {
    console.log('Uploading banner file:', file.name);
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/admin/upload-banner', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Banner upload result:', result);
        
        if (result.success) {
            console.log('✅ Banner uploaded successfully:', result.image_url);
            
            // Set hidden input với URL thật
            const hiddenInput = document.getElementById('bannerFile');
            if (hiddenInput) {
                hiddenInput.value = result.image_url;
            }
            
            // Lưu vào database với URL thật
            await saveBanner(result.image_url);
        } else {
            console.error('❌ Banner upload failed:', result.message);
            alert('Lỗi upload banner: ' + result.message);
        }
        
    } catch (error) {
        console.error('❌ Banner upload error:', error);
        alert('Lỗi upload banner: ' + error.message);
    }
}

// Functions to save logo and banner to database
async function saveLogo(logoUrl) {
    console.log('Saving logo to database:', logoUrl);
    
    try {
        const response = await fetch('/api/admin/content/header', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                logo: logoUrl,
                companyName: 'Dương Oanh XKLĐ',
                slogan: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
            })
        });
        
        const result = await response.json();
        console.log('Logo save result:', result);
        
        if (result.success) {
            console.log('✅ Logo saved to database successfully!');
            alert('✅ Logo đã được cập nhật thành công!');
        } else {
            console.error('❌ Failed to save logo:', result.message);
            alert('❌ Lỗi lưu logo: ' + result.message);
        }
        
    } catch (error) {
        console.error('❌ Error saving logo:', error);
        alert('❌ Lỗi lưu logo: ' + error.message);
    }
}

async function saveBanner(bannerUrl) {
    console.log('Saving banner to database:', bannerUrl);
    
    try {
        const response = await fetch('/api/admin/content/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                banner: bannerUrl,
                title: 'DƯƠNG OANH XKLĐ TUYỂN DỤNG',
                subtitle: 'Chuyên viên tư vấn & CTV du học - XKLĐ'
            })
        });
        
        const result = await response.json();
        console.log('Banner save result:', result);
        
        if (result.success) {
            console.log('✅ Banner saved to database successfully!');
            alert('✅ Banner đã được cập nhật thành công!');
        } else {
            console.error('❌ Failed to save banner:', result.message);
            alert('❌ Lỗi lưu banner: ' + result.message);
        }
        
    } catch (error) {
        console.error('❌ Error saving banner:', error);
        alert('❌ Lỗi lưu banner: ' + error.message);
    }
}
