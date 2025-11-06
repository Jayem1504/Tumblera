# Tumblera - Custom Tumbler E-Commerce Website

A simple, static e-commerce website for customizable tumblers, built with HTML, TailwindCSS, and vanilla JavaScript. Hosted on GitHub Pages with no backend required.

## Features

### 🎨 Customization
- **Text Customization**: Add custom text with multiple font options
- **Font Control**: Choose from 9 different fonts
- **Size Control**: Adjust text size from 12px to 72px
- **Color Picker**: Select any color for your text
- **Image Upload**: Upload logos or images for your tumbler
- **Tumbler Colors**: Choose from 8 predefined tumbler colors
- **Real-Time Preview**: See your design instantly as you make changes

### 🛒 Shopping Cart
- **LocalStorage Integration**: Cart persists across browser sessions
- **Cart Management**: Add, view, and remove items
- **Order Summary**: Clear breakdown of costs including shipping
- **Multiple Items**: Add multiple customized tumblers to cart

### 📦 Checkout
- **Simple Form**: Collect customer information (name, phone, email, address)
- **Email Notifications**: Order details sent via Formspree
- **Cash on Delivery**: No payment processing required
- **Order Confirmation**: Success page with order details

### 📱 Responsive Design
- Mobile-friendly interface
- Works on all modern browsers
- Fast loading times with CDN resources

## Pages

1. **Home (index.html)**: Landing page with features and product information
2. **Customize (customize.html)**: Interactive design tool with live preview
3. **Cart (cart.html)**: Shopping cart and checkout form
4. **Success (success.html)**: Order confirmation page

## Technologies Used

- **HTML5**: Semantic markup
- **TailwindCSS**: Utility-first CSS framework (via CDN)
- **JavaScript**: Vanilla JS for all functionality
- **Font Awesome**: Icons (via CDN)
- **LocalStorage**: Client-side data persistence
- **Formspree**: Form submission service for order notifications

## Setup Instructions

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/Tumblera.git
cd Tumblera
```

### 2. Configure Formspree (Optional but Recommended)
To receive order notifications via email:

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint
3. Open `js/cart.js` and replace `YOUR_FORM_ID` with your Formspree form ID:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### 3. Deploy to GitHub Pages

#### Option A: Using GitHub Web Interface
1. Push your code to a GitHub repository
2. Go to repository Settings
3. Navigate to Pages section
4. Under "Source", select the main branch
5. Click Save
6. Your site will be available at `https://yourusername.github.io/Tumblera/`

#### Option B: Using Command Line
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/Tumblera.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### 4. Test Locally (Optional)
You can test the website locally by:
- Opening `index.html` directly in a browser, OR
- Using a local server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (with http-server)
  npx http-server
  ```

## File Structure

```
Tumblera/
├── index.html          # Home page
├── customize.html      # Customization page
├── cart.html          # Cart and checkout page
├── success.html       # Order success page
├── js/
│   ├── customize.js   # Customization functionality
│   └── cart.js        # Cart and checkout functionality
└── README.md          # This file
```

## How It Works

### Customization Flow
1. User enters text or uploads an image
2. Selects font, size, and colors
3. Real-time preview updates instantly
4. Click "Add to Cart" to save design

### Cart & Checkout Flow
1. Cart items stored in browser's localStorage
2. User can review and remove items
3. Fill out delivery information
4. Submit order (sent via Formspree)
5. Redirect to success page
6. Cart cleared automatically

### Data Storage
- **LocalStorage**: Stores cart items and design data
- **SessionStorage**: Temporarily stores order info for success page
- No database required - all data is client-side

## Customization Guide

### Change Tumbler Price
Edit the price in:
- `index.html` (line with price display)
- `js/cart.js` (ITEM_PRICE constant)

### Change Shipping Cost
Edit `SHIPPING_COST` constant in `js/cart.js`

### Add More Fonts
Add options to the font select dropdown in `customize.html`

### Add More Colors
Add more color buttons in the "Tumbler Color" section of `customize.html`

### Modify Email Template
Edit the order details template in `js/cart.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Important Notes

### Formspree Setup
- Without Formspree configured, orders will still work but emails won't be sent
- Free Formspree plan includes 50 submissions per month
- Consider upgrading for more submissions or use alternative email services

### Image Uploads
- Images are converted to Base64 and stored in localStorage
- Large images may impact performance
- Consider adding file size limits for production use

### GitHub Pages
- Updates automatically deploy when you push to the main branch
- May take a few minutes for changes to appear
- Custom domains can be configured in repository settings

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.

## Credits

- Icons: Font Awesome
- CSS Framework: TailwindCSS
- Form Service: Formspree

---

Built with ❤️ for custom tumbler enthusiasts
