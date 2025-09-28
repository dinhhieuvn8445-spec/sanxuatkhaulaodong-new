// Fix cho Job Image Upload - Drag & Drop không hoạt động
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('Applying job image upload fix...');
        
        const jobImageDropArea = document.getElementById('jobImageDropArea');
        const jobImageFileInput = document.getElementById('jobImageFileInput');
        
        if (jobImageDropArea && jobImageFileInput) {
            console.log('Found job image elements, setting up click handler...');
            
            // Remove existing event listeners và add lại
            jobImageDropArea.replaceWith(jobImageDropArea.cloneNode(true));
            const newDropArea = document.getElementById('jobImageDropArea');
            
            // Add click event
            newDropArea.addEventListener('click', function(e) {
                console.log('Job image area clicked!');
                e.preventDefault();
                e.stopPropagation();
                jobImageFileInput.click();
            });
            
            // Add browse link click
            const browseLink = newDropArea.querySelector('.browse-link');
            if (browseLink) {
                browseLink.addEventListener('click', function(e) {
                    console.log('Browse link clicked!');
                    e.preventDefault();
                    e.stopPropagation();
                    jobImageFileInput.click();
                });
            }
            
            // Add file input change event
            jobImageFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    console.log('File selected:', file.name);
                    handleJobImageFile(file);
                }
            });
            
            // Add drag events
            newDropArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                newDropArea.classList.add('dragover');
            });
            
            newDropArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                newDropArea.classList.remove('dragover');
            });
            
            newDropArea.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                newDropArea.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    console.log('File dropped:', files[0].name);
                    handleJobImageFile(files[0]);
                }
            });
            
            console.log('Job image upload fix applied successfully!');
        } else {
            console.error('Job image elements not found!');
        }
    }, 1000);
});

async function handleJobImageFile(file) {
    console.log('Handling job image file:', file.name);
    
    // Validate file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('Chỉ hỗ trợ file ảnh: JPG, PNG, GIF, WebP');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn! Tối đa 5MB');
        return;
    }
    
    // Show upload progress
    showJobImageUploadProgress();
    
    try {
        // Upload file to server
        const formData = new FormData();
        formData.append('image', file);
        
        console.log('Uploading file to server...');
        const response = await fetch('/api/admin/upload-job-image', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log('Upload response:', result);
        
        if (result.success) {
            // Show preview with uploaded image URL
            showJobImagePreview(result.image_url);
            
            // Set the actual uploaded image URL
            const jobImageUrl = document.getElementById('jobImageUrl');
            if (jobImageUrl) {
                jobImageUrl.value = result.image_url;
                console.log('Set job image URL:', result.image_url);
            }
            
            // Hide progress and show success
            hideJobImageUploadProgress();
            console.log('Upload successful:', result.message);
            
        } else {
            throw new Error(result.message || 'Upload failed');
        }
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Lỗi upload ảnh: ' + error.message);
        hideJobImageUploadProgress();
        
        // Fallback: show local preview
        const reader = new FileReader();
        reader.onload = function(e) {
            showJobImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
        
        // Set placeholder URL
        const jobImageUrl = document.getElementById('jobImageUrl');
        if (jobImageUrl) {
            jobImageUrl.value = '/images/jobs/' + file.name;
        }
    }
}

function showJobImagePreview(imageSrc) {
    const dropArea = document.getElementById('jobImageDropArea');
    const dragContent = dropArea.querySelector('.drag-drop-content');
    const preview = document.getElementById('jobImagePreview');
    const previewImg = document.getElementById('jobImagePreviewImg');
    
    if (previewImg) {
        previewImg.src = imageSrc;
        dragContent.style.display = 'none';
        preview.style.display = 'block';
        dropArea.classList.add('upload-success');
        
        console.log('Job image preview shown');
    }
}

function removeJobImage() {
    const dropArea = document.getElementById('jobImageDropArea');
    const dragContent = dropArea.querySelector('.drag-drop-content');
    const preview = document.getElementById('jobImagePreview');
    const jobImageUrl = document.getElementById('jobImageUrl');
    const fileInput = document.getElementById('jobImageFileInput');
    
    // Reset everything
    if (dragContent) dragContent.style.display = 'block';
    if (preview) preview.style.display = 'none';
    if (jobImageUrl) jobImageUrl.value = '';
    if (fileInput) fileInput.value = '';
    if (dropArea) dropArea.classList.remove('upload-success');
    
    console.log('Job image removed');
}

function showJobImageUploadProgress() {
    const dropArea = document.getElementById('jobImageDropArea');
    const dragContent = dropArea.querySelector('.drag-drop-content');
    const progress = document.getElementById('jobImageUploadProgress');
    
    if (dragContent) dragContent.style.display = 'none';
    if (progress) progress.style.display = 'block';
    
    // Simulate progress
    const progressFill = document.getElementById('jobImageProgressFill');
    const progressText = document.getElementById('jobImageProgressText');
    
    let percent = 0;
    const interval = setInterval(() => {
        percent += Math.random() * 30;
        if (percent > 90) percent = 90;
        
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressText) progressText.textContent = Math.round(percent) + '%';
        
        if (percent >= 90) {
            clearInterval(interval);
        }
    }, 200);
    
    // Store interval for cleanup
    window.jobImageUploadInterval = interval;
}

function hideJobImageUploadProgress() {
    const progress = document.getElementById('jobImageUploadProgress');
    if (progress) progress.style.display = 'none';
    
    // Clear interval
    if (window.jobImageUploadInterval) {
        clearInterval(window.jobImageUploadInterval);
        window.jobImageUploadInterval = null;
    }
    
    // Reset progress
    const progressFill = document.getElementById('jobImageProgressFill');
    const progressText = document.getElementById('jobImageProgressText');
    if (progressFill) progressFill.style.width = '0%';
    if (progressText) progressText.textContent = '0%';
}
