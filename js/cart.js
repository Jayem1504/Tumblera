// Cart and checkout functionality with Supabase integration
import { getCurrentUser, updateNavbar } from './supabase.js';

// DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutForm = document.getElementById('checkout-form');
const orderSummary = document.getElementById('order-summary');
const checkoutFormContainer = document.getElementById('checkout-form-container');
const cartContainer = document.getElementById('cart-container');

// Constants
const SHIPPING_COST = 5.00;
const ITEM_PRICE = 24.99;

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Calculate totals
function calculateTotals(cart) {
    const subtotal = cart.length * ITEM_PRICE;
    const total = subtotal + (cart.length > 0 ? SHIPPING_COST : 0);
    return { subtotal, total };
}

// Render cart items
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        cartContainer.classList.add('hidden');
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    cartContainer.classList.remove('hidden');
    orderSummary.classList.remove('hidden');
    checkoutFormContainer.classList.remove('hidden');
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Preview -->
                <div class="md:w-1/3">
                    <div class="relative bg-gray-100 rounded-lg p-4 flex items-center justify-center" style="min-height: 250px;">
                        <div class="relative" style="width: 120px; height: 200px; background-color: ${item.design.tumblerColor}; border-radius: 8px 8px 20px 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            ${item.design.imageData ? `
                                <img src="${item.design.imageData}" alt="Custom design" class="absolute w-16 h-16 object-contain" style="top: 30%; left: 50%; transform: translateX(-50%);">
                            ` : ''}
                            <div class="absolute text-center px-2" style="top: ${item.design.imageData ? '70%' : '50%'}; left: 50%; transform: translate(-50%, -50%); width: 90%; word-wrap: break-word; font-family: ${item.design.font}; font-size: ${Math.min(item.design.fontSize * 0.5, 14)}px; color: ${item.design.textColor};">
                                ${item.design.text || ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Details -->
                <div class="md:w-2/3">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800">Custom Tumbler #${index + 1}</h3>
                            <p class="text-gray-500 text-sm mt-1">Personalized tumbler</p>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition">
                            <i class="fas fa-trash text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-2 text-sm">
                        ${item.design.text ? `
                            <div class="flex items-start">
                                <span class="text-gray-600 font-medium w-24">Text:</span>
                                <span class="text-gray-800">"${item.design.text}"</span>
                            </div>
                        ` : ''}
                        <div class="flex items-center">
                            <span class="text-gray-600 font-medium w-24">Font:</span>
                            <span class="text-gray-800">${item.design.font}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-600 font-medium w-24">Text Color:</span>
                            <span class="flex items-center">
                                <span class="inline-block w-5 h-5 rounded border border-gray-300 mr-2" style="background-color: ${item.design.textColor};"></span>
                                <span class="text-gray-800">${item.design.textColor}</span>
                            </span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-600 font-medium w-24">Tumbler Color:</span>
                            <span class="flex items-center">
                                <span class="inline-block w-5 h-5 rounded border border-gray-300 mr-2" style="background-color: ${item.design.tumblerColor};"></span>
                            </span>
                        </div>
                        ${item.design.imageData ? `
                            <div class="flex items-center">
                                <span class="text-gray-600 font-medium w-24">Image:</span>
                                <span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Uploaded</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-4 pt-4 border-t">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Price:</span>
                            <span class="text-2xl font-bold text-blue-600">$${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update totals
    const { subtotal, total } = calculateTotals(cart);
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(itemId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        let cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('tumblerCart', JSON.stringify(cart));
        
        updateCartCount();
        renderCartItems();
    }
}

// Make removeFromCart available globally
window.removeFromCart = removeFromCart;

// Handle checkout form submission
checkoutForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('tumblerCart') || '[]');
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value,
        notes: document.getElementById('customer-notes').value
    };
    
    // Calculate totals
    const { subtotal, total } = calculateTotals(cart);
    
    // Disable submit button
    const submitBtn = document.getElementById('place-order-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing Order...';
    
    try {
        // Import Supabase functions
        const { saveOrder } = await import('./supabase.js');
        
        console.log('Preparing order data...', formData);
        
        // Save order to Supabase
        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            items: JSON.stringify(cart),  // Convert to JSON string
            total: total
        };
        
        console.log('Sending order to Supabase:', orderData);
        
        const result = await saveOrder(orderData);
        
        console.log('Supabase response:', result);
        
        if (result.success) {
            console.log('✅ Order saved successfully!', result.order);
            
            // Store order info in session storage for success page
            sessionStorage.setItem('lastOrder', JSON.stringify({
                itemCount: cart.length,
                total: `$${total.toFixed(2)}`,
                customerName: formData.name,
                orderId: result.order.id
            }));
            
            // Clear cart
            localStorage.removeItem('tumblerCart');
            
            // Redirect to success page
            window.location.href = 'success.html';
        } else {
            console.error('❌ Order save failed:', result.error);
            throw new Error(result.error || 'Failed to save order');
        }
        
    } catch (error) {
        console.error('❌ Error submitting order:', error);
        
        // Show detailed error in alert
        alert(
            '⚠️ Order Submission Error\n\n' +
            'Error: ' + error.message + '\n\n' +
            'Please check the browser console (F12) for details.\n\n' +
            'Common fixes:\n' +
            '1. Check your Supabase database setup\n' +
            '2. Verify Row Level Security policies\n' +
            '3. See FIX_ORDERS.md for detailed instructions'
        );
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Initialize
updateCartCount();
renderCartItems();

// Auto-fill profile information for logged-in users
(async () => {
    await updateNavbar();
    
    const user = await getCurrentUser();
    if (user) {
        // Load saved profile data
        const savedProfile = JSON.parse(localStorage.getItem(`profile_${user.email}`) || '{}');
        
        // Auto-fill email
        const emailInput = document.getElementById('customer-email');
        if (emailInput) {
            emailInput.value = user.email;
            // Make it read-only for logged-in users
            emailInput.readOnly = true;
            emailInput.classList.add('bg-gray-100', 'cursor-not-allowed');
        }

        // Auto-fill name if available
        const nameInput = document.getElementById('customer-name');
        if (nameInput && savedProfile.name) {
            nameInput.value = savedProfile.name;
        }

        // Auto-fill phone if available
        const phoneInput = document.getElementById('customer-phone');
        if (phoneInput && savedProfile.phone) {
            phoneInput.value = savedProfile.phone;
        }

        // Auto-fill address if available
        const addressInput = document.getElementById('customer-address');
        if (addressInput && savedProfile.address) {
            addressInput.value = savedProfile.address;
        }
    }
})();
