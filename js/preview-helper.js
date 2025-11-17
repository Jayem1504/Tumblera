// Shared tumbler preview rendering utility
// This ensures consistent preview appearance across cart, orders, and seller dashboard

/**
 * Generates HTML for a tumbler preview matching the live preview in customize.html
 * @param {Object} design - The design object containing all customization data
 * @param {string} size - Size identifier ('small', 'medium', 'large') or scale factor
 * @returns {string} HTML string for the tumbler preview
 */
function generateTumblerPreview(design, size = 'medium') {
    // Size configurations
    const sizeConfig = {
        small: { width: 120, height: 200, imageScale: 0.4, textScale: 0.5 },
        medium: { width: 200, height: 333, imageScale: 0.6, textScale: 0.7 },
        large: { width: 300, height: 500, imageScale: 1, textScale: 1 }
    };
    
    const config = sizeConfig[size] || sizeConfig.medium;
    
    // Calculate text orientation styles
    let textOrientationStyle = '';
    let textContainerStyle = 'width: 90%; word-wrap: break-word;';
    
    if (design.textOrientation === 'vertical-upright') {
        textOrientationStyle = 'writing-mode: vertical-rl; text-orientation: upright; width: auto; display: inline-block;';
    } else if (design.textOrientation === 'vertical-rotated') {
        textOrientationStyle = 'writing-mode: horizontal-tb; transform: rotate(90deg); width: auto; display: inline-block; white-space: nowrap;';
    } else {
        textOrientationStyle = 'writing-mode: horizontal-tb; width: 100%; display: block;';
    }
    
    // Calculate positions for image and text
    const hasImage = design.imageData;
    const imageSize = design.imageSize ? Math.round(design.imageSize * config.imageScale) : Math.round(48 * config.imageScale);
    const fontSize = Math.round((design.fontSize || 24) * config.textScale);
    
    // Position text below image if image exists, otherwise center
    const textTop = hasImage ? '65%' : '50%';
    const imageTop = hasImage ? '35%' : '50%';
    
    return `
        <div class="relative" style="width: ${config.width}px; height: ${config.height}px; display: flex; align-items: center; justify-content: center;">
            <!-- Tumbler Image Background -->
            <img src="images/${design.tumblerImage || 'tumblera-white.png'}" 
                 alt="Tumbler" 
                 class="w-full h-full object-cover" 
                 style="position: absolute; top: 0; left: 0; z-index: 1;">
            
            <!-- Customization Area (Restricted to tumbler body) -->
            <div class="absolute" style="top: 35%; left: 35%; width: 36%; height: 25%; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
                ${hasImage ? `
                    <!-- Custom Image -->
                    <img src="${design.imageData}" 
                         alt="Custom design" 
                         class="object-contain" 
                         style="width: ${imageSize}px; height: ${imageSize}px; position: absolute; top: ${imageTop}; left: 50%; transform: translateX(-50%);">
                ` : ''}
                
                ${design.text ? `
                    <!-- Custom Text -->
                    <div class="text-center" 
                         style="position: absolute; top: ${textTop}; left: 50%; transform: translate(-50%, -50%); ${textContainerStyle} font-family: ${design.font || 'Arial'}; font-size: ${fontSize}px; color: ${design.textColor || '#000000'}; ${textOrientationStyle}">
                        ${design.text}
                    </div>
                ` : ''}
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
