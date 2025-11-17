// Tumbler customization functionality

// State management
let currentDesign = {
    text: '',
    font: 'Arial',
    fontSize: 24,
    textColor: '#000000',
    tumblerColor: '#ffffff',
    tumblerImage: 'tumblera-white.png',
    textOrientation: 'horizontal',
    image: null,
    imageData: null,
    imageSize: 48,
    size: '350',
    price: 499
};

// DOM elements
const customText = document.getElementById('custom-text');
const fontSelect = document.getElementById('font-select');
const fontSize = document.getElementById('font-size');
const textColor = document.getElementById('text-color');
const textColorHex = document.getElementById('text-color-hex');
const textOrientationRadios = document.querySelectorAll('input[name="text-orientation"]');
const imageUpload = document.getElementById('image-upload');
const imageSize = document.getElementById('image-size');
const imageSizeValue = document.getElementById('image-size-value');
const imageSizeContainer = document.getElementById('image-size-container');
const removeImageBtn = document.getElementById('remove-image');
const addToCartBtn = document.getElementById('add-to-cart');
const resetDesignBtn = document.getElementById('reset-design');
const tumblerColorBtns = document.querySelectorAll('.tumbler-color-btn');
const sizeRadios = document.querySelectorAll('input[name="size"]');
const priceDisplay = document.getElementById('price-display');

// Preview elements
const tumblerPreview = document.getElementById('tumbler-preview');
const tumblerImage = document.getElementById('tumbler-image');
const previewText = document.getElementById('preview-text');
const previewImage = document.getElementById('preview-image');

// Update cart count on page load
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Update preview text
function updatePreviewText() {
    previewText.textContent = currentDesign.text;
    previewText.style.fontFamily = currentDesign.font;
    previewText.style.fontSize = currentDesign.fontSize + 'px';
    previewText.style.color = currentDesign.textColor;
    
    // Handle text orientation
    if (currentDesign.textOrientation === 'vertical-upright') {
        previewText.style.writingMode = 'vertical-rl';
        previewText.style.textOrientation = 'upright';
        previewText.style.transform = 'none';
        previewText.style.width = 'auto';
        previewText.style.display = 'inline-block';
    } else if (currentDesign.textOrientation === 'vertical-rotated') {
        previewText.style.writingMode = 'horizontal-tb';
        previewText.style.textOrientation = 'mixed';
        previewText.style.transform = 'rotate(90deg)';
        previewText.style.width = 'auto';
        previewText.style.display = 'inline-block';
        previewText.style.whiteSpace = 'nowrap';
    } else {
        previewText.style.writingMode = 'horizontal-tb';
        previewText.style.textOrientation = 'mixed';
        previewText.style.transform = 'none';
        previewText.style.width = '100%';
        previewText.style.display = 'block';
        previewText.style.whiteSpace = 'normal';
    }
}

// Update preview image
function updatePreviewImage() {
    if (currentDesign.imageData) {
        previewImage.src = currentDesign.imageData;
        previewImage.style.width = currentDesign.imageSize + 'px';
        previewImage.style.height = currentDesign.imageSize + 'px';
        previewImage.classList.remove('hidden');
        removeImageBtn.classList.remove('hidden');
        imageSizeContainer.classList.remove('hidden');
    } else {
        previewImage.src = '';
        previewImage.classList.add('hidden');
        removeImageBtn.classList.add('hidden');
        imageSizeContainer.classList.add('hidden');
    }
}

// Update tumbler color and image
function updateTumblerColor() {
    tumblerImage.src = 'images/' + currentDesign.tumblerImage;
}

// Text input listener
customText.addEventListener('input', function(e) {
    currentDesign.text = e.target.value;
    updatePreviewText();
});

// Font select listener
fontSelect.addEventListener('change', function(e) {
    currentDesign.font = e.target.value;
    updatePreviewText();
});

// Font size listener
fontSize.addEventListener('input', function(e) {
    currentDesign.fontSize = parseInt(e.target.value) || 24;
    updatePreviewText();
});

// Text color listeners
textColor.addEventListener('input', function(e) {
    currentDesign.textColor = e.target.value;
    textColorHex.value = e.target.value;
    updatePreviewText();
});

textColorHex.addEventListener('input', function(e) {
    const color = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        currentDesign.textColor = color;
        textColor.value = color;
        updatePreviewText();
    }
});

// Text orientation listeners
textOrientationRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        currentDesign.textOrientation = this.value;
        updatePreviewText();
    });
});

// Image upload listener
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentDesign.image = file.name;
            currentDesign.imageData = event.target.result;
            updatePreviewImage();
            updatePreviewText(); // Reposition text
        };
        reader.readAsDataURL(file);
    }
});

// Remove image listener
removeImageBtn.addEventListener('click', function() {
    currentDesign.image = null;
    currentDesign.imageData = null;
    currentDesign.imageSize = 48;
    imageUpload.value = '';
    imageSize.value = 48;
    imageSizeValue.textContent = 48;
    updatePreviewImage();
});

// Image size listener
imageSize.addEventListener('input', function(e) {
    currentDesign.imageSize = parseInt(e.target.value);
    imageSizeValue.textContent = currentDesign.imageSize;
    updatePreviewImage();
});

// Tumbler color listeners
tumblerColorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        tumblerColorBtns.forEach(b => {
            b.classList.remove('border-amber-600', 'border-4');
            b.classList.add('border-gray-300', 'border-2');
        });
        
        // Add active class to clicked button
        this.classList.remove('border-gray-300', 'border-2');
        this.classList.add('border-amber-600', 'border-4');
        
        // Update color and image
        currentDesign.tumblerColor = this.dataset.color;
        currentDesign.tumblerImage = this.dataset.image;
        updateTumblerColor();
    });
});

// Size selection listeners
sizeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        currentDesign.size = this.value;
        currentDesign.price = parseInt(this.dataset.price);
        priceDisplay.textContent = '₱' + currentDesign.price;
        
        // Update visual selection
        sizeRadios.forEach(r => {
            const label = r.closest('label');
            if (r.checked) {
                label.classList.remove('border-gray-300');
                label.classList.add('border-blue-600', 'bg-blue-50');
            } else {
                label.classList.remove('border-blue-600', 'bg-blue-50');
                label.classList.add('border-gray-300');
            }
        });
    });
});

// Add to cart functionality
addToCartBtn.addEventListener('click', function() {
    // Validate that user has customized something
    if (!currentDesign.text && !currentDesign.imageData) {
        alert('Please add some text or upload an image to customize your tumbler!');
        return;
    }
    
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    
    // Create cart item
    const cartItem = {
        id: Date.now(),
        design: { ...currentDesign },
        price: currentDesign.price,
        size: currentDesign.size,
        timestamp: new Date().toISOString()
    };
    
    // Add to cart
    cart.push(cartItem);
    localStorage.setItem('tumblerCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    const originalText = addToCartBtn.innerHTML;
    addToCartBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Added to Cart!';
    addToCartBtn.classList.remove('bg-white', 'text-amber-800');
    addToCartBtn.classList.add('bg-green-500', 'text-white');
    
    setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.classList.remove('bg-green-500', 'text-white');
        addToCartBtn.classList.add('bg-white', 'text-amber-800');
        
        // Ask user if they want to go to cart or continue
        if (confirm('Item added to cart! Would you like to view your cart?')) {
            window.location.href = 'cart.html';
        }
    }, 1500);
});

// Reset design functionality
resetDesignBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset your design?')) {
        // Reset state
        currentDesign = {
            text: '',
            font: 'Arial',
            fontSize: 24,
            textColor: '#000000',
            tumblerColor: '#ffffff',
            tumblerImage: 'tumblera-white.png',
            textOrientation: 'horizontal',
            image: null,
            imageData: null,
            imageSize: 48,
            size: '350',
            price: 499
        };
        
        // Reset inputs
        customText.value = '';
        fontSelect.value = 'Arial';
        fontSize.value = 24;
        textColor.value = '#000000';
        textColorHex.value = '#000000';
        textOrientationRadios[0].checked = true;
        imageUpload.value = '';
        imageSize.value = 48;
        imageSizeValue.textContent = 48;
        priceDisplay.textContent = '₱499';
        
        // Reset size selection
        sizeRadios[0].checked = true;
        
        // Reset tumbler color buttons (White is now second button)
        tumblerColorBtns.forEach((btn, index) => {
            if (index === 1) { // White button is now at index 1
                btn.classList.remove('border-gray-300', 'border-2');
                btn.classList.add('border-amber-600', 'border-4');
            } else {
                btn.classList.remove('border-amber-600', 'border-4');
                btn.classList.add('border-gray-300', 'border-2');
            }
        });
        
        // Update preview
        updatePreviewText();
        updatePreviewImage();
        updateTumblerColor();
    }
});

// Initialize
updateCartCount();
updatePreviewText();
updatePreviewImage();
updateTumblerColor();
