// Shared tumbler preview rendering utility
// This ensures consistent preview appearance across cart, orders, and seller dashboard

/**
 * Generates HTML for a tumbler preview matching EXACTLY the live preview in customize.html
 * @param {Object} design - The design object containing all customization data
 * @param {string} size - Size identifier ('small', 'medium', 'large') or scale factor
 * @returns {string} HTML string for the tumbler preview
 */
function generateTumblerPreview(design, size = 'medium') {
    // Size configurations - maintaining proper aspect ratio (4:5 ratio like original)
    const sizeConfig = {
        small: { containerWidth: 160, containerHeight: 200, scale: 0.4 },
        medium: { containerWidth: 240, containerHeight: 300, scale: 0.6 },
        large: { containerWidth: 400, containerHeight: 500, scale: 1 }
    };
    
    const config = sizeConfig[size] || sizeConfig.medium;
    const scale = config.scale;
    
    // Calculate scaled dimensions for text and image
    const fontSize = Math.round((design.fontSize || 24) * scale);
    const imageSize = Math.round((design.imageSize || 48) * scale);
    
    // Text orientation styles - matching customize.js exactly
    let textStyles = '';
    let textContainerStyles = 'text-center px-1; width: 100%; word-wrap: break-word; overflow-wrap: break-word;';
    
    if (design.textOrientation === 'vertical-upright') {
        textStyles = 'writing-mode: vertical-rl; text-orientation: upright; width: auto; display: inline-block;';
    } else if (design.textOrientation === 'vertical-rotated') {
        textStyles = 'writing-mode: horizontal-tb; transform: rotate(90deg); width: auto; display: inline-block; white-space: nowrap;';
    } else {
        // horizontal (default)
        textStyles = 'writing-mode: horizontal-tb; width: 100%; display: block;';
    }
    
    // Generate display styles for image
    const imageDisplay = design.imageData ? 'block' : 'none';
    const imageMargin = (design.imageData && design.text) ? '0 0 0.25rem 0' : '0';
    
    return `
        <div class="relative inline-block">
            <!-- Tumbler Image Background -->
            <img src="images/${design.tumblerImage || 'tumblera-white.png'}" 
                 alt="Tumbler" 
                 class="w-full h-auto object-contain"
                 style="max-width: ${config.containerWidth}px; z-index: 1;">
            
            <!-- Customization Area - EXACT same as customize.html -->
            <div style="position: absolute; top: 35%; left: 35%; width: 36%; height: 25%; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
                <!-- Custom Image -->
                <img src="${design.imageData || ''}" 
                     alt="Custom design" 
                     style="width: ${imageSize}px; height: ${imageSize}px; object-fit: contain; display: ${imageDisplay}; margin: ${imageMargin};">
                
                <!-- Custom Text -->
                <div style="text-align: center; padding: 0 0.25rem; width: 100%; word-wrap: break-word; overflow-wrap: break-word; font-family: ${design.font || 'Arial'}; font-size: ${fontSize}px; color: ${design.textColor || '#000000'}; ${textStyles}">
                    ${design.text || ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Generates a download button for the custom image
 * @param {Object} design - The design object
 * @param {string} orderId - Order ID for filename
 * @param {number} itemIndex - Item index in order
 * @returns {string} HTML string for download button
 */
function generateImageDownloadButton(design, orderId, itemIndex) {
    if (!design.imageData) {
        return '<span class="text-gray-400 text-sm">No image uploaded</span>';
    }
    
    return `
        <button onclick="downloadCustomImage('${design.imageData}', 'order-${orderId}-item-${itemIndex}')" 
                class="inline-flex items-center px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition">
            <i class="fas fa-download mr-2"></i>Download Image
        </button>
    `;
}

/**
 * Downloads the custom image
 * @param {string} imageData - Base64 image data
 * @param {string} filename - Filename without extension
 */
function downloadCustomImage(imageData, filename) {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${filename}-custom-image.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make functions available globally
if (typeof window !== 'undefined') {
    window.generateTumblerPreview = generateTumblerPreview;
    window.generateImageDownloadButton = generateImageDownloadButton;
    window.downloadCustomImage = downloadCustomImage;
}
