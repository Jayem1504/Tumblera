// Email notification service for order confirmations
// Uses EmailJS (https://www.emailjs.com/) - Free tier: 200 emails/month

/**
 * Initialize EmailJS with your credentials
 * Sign up at https://www.emailjs.com/ to get these values
 */
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
    SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID' // Replace with your EmailJS template ID
};

/**
 * Initialize EmailJS
 */
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        return true;
    }
    console.warn('EmailJS library not loaded');
    return false;
}

/**
 * Format order items for email
 * @param {Array} items - Cart items
 * @returns {string} Formatted HTML string of items
 */
function formatOrderItemsForEmail(items) {
    return items.map((item, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; text-align: left;">
                <strong>Custom Tumbler #${index + 1}</strong><br>
                <small style="color: #6b7280;">
                    Size: ${item.size || item.design?.size || '350'}ml<br>
                    ${item.design?.text ? `Text: "${item.design.text}"<br>` : ''}
                    Font: ${item.design?.font || 'Arial'}<br>
                    ${item.design?.textOrientation && item.design.textOrientation !== 'horizontal' ? 
                        `Orientation: ${item.design.textOrientation === 'vertical-upright' ? 'Vertical (Upright)' : 'Vertical (90°)'}<br>` : ''}
                </small>
            </td>
            <td style="padding: 12px; text-align: right; color: #d97706; font-weight: bold;">
                ₱${item.price || 499}
            </td>
        </tr>
    `).join('');
}

/**
 * Send order confirmation email to customer
 * @param {Object} orderDetails - Order information
 * @returns {Promise<Object>} Result object with success status
 */
async function sendOrderConfirmationEmail(orderDetails) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not loaded, skipping email notification');
            return { success: false, error: 'EmailJS not loaded' };
        }

        // Initialize EmailJS
        initEmailJS();

        const { customer, items, orderId, subtotal, shipping, total } = orderDetails;

        // Prepare email template parameters
        const templateParams = {
            to_email: customer.email,
            to_name: customer.name,
            order_id: orderId,
            order_date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            customer_name: customer.name,
            customer_email: customer.email,
            customer_phone: customer.phone,
            customer_address: customer.address,
            customer_notes: customer.notes || 'None',
            
            // Order summary
            item_count: items.length,
            items_html: formatOrderItemsForEmail(items),
            subtotal: `₱${subtotal}`,
            shipping: `₱${shipping}`,
            total: `₱${total}`,
            
            // Tracking link
            tracking_url: `${window.location.origin}/orders.html?id=${orderId}`,
            
            // Company info
            company_name: 'Tumblera',
            company_website: window.location.origin,
            support_email: 'support@tumblera.com' // Replace with your actual support email
        };

        console.log('Sending email with params:', templateParams);

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );

        console.log('✅ Email sent successfully:', response);
        return { success: true, response };

    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send order notification to seller/admin
 * @param {Object} orderDetails - Order information
 * @returns {Promise<Object>} Result object with success status
 */
async function sendSellerNotificationEmail(orderDetails) {
    try {
        if (typeof emailjs === 'undefined') {
            return { success: false, error: 'EmailJS not loaded' };
        }

        initEmailJS();

        const { customer, items, orderId, total } = orderDetails;

        const sellerParams = {
            to_email: 'seller@tumblera.com', // Replace with your business email
            order_id: orderId,
            order_date: new Date().toLocaleString(),
            customer_name: customer.name,
            customer_email: customer.email,
            customer_phone: customer.phone,
            customer_address: customer.address,
            item_count: items.length,
            total: `₱${total}`,
            dashboard_url: `${window.location.origin}/seller.html`
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            'seller_notification_template', // You'll need to create this template
            sellerParams
        );

        console.log('✅ Seller notification sent:', response);
        return { success: true, response };

    } catch (error) {
        console.error('❌ Error sending seller notification:', error);
        return { success: false, error: error.message };
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendOrderConfirmationEmail,
        sendSellerNotificationEmail,
        formatOrderItemsForEmail
    };
}
