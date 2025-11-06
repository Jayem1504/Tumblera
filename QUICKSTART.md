# Quick Start Guide - Tumblera

## 🚀 Get Started in 3 Minutes

### Step 1: Push to GitHub
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Tumblera website"

# Create main branch
git branch -M main

# Add your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/Tumblera.git

# Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Click on **Settings**
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://yourusername.github.io/Tumblera/`

### Step 3: Set Up Formspree (Optional - for email notifications)
1. Visit [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Click **+ New Form**
4. Name it "Tumblera Orders"
5. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
6. Open `js/cart.js` in your editor
7. Find line with `YOUR_FORM_ID` and replace it:
   ```javascript
   // Change this:
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   
   // To this (use your actual form ID):
   const response = await fetch('https://formspree.io/f/xyzabc123', {
   ```
8. Save, commit, and push:
   ```bash
   git add js/cart.js
   git commit -m "Add Formspree configuration"
   git push
   ```

### Step 4: Test Your Website
1. Visit your GitHub Pages URL
2. Click "Customize Now"
3. Add some text, choose colors
4. Upload an image (optional)
5. Click "Add to Cart"
6. Go to Cart
7. Fill out the checkout form
8. Place order
9. Check your email for order notification (if Formspree is set up)

## 🎨 Customization Tips

### Change the Price
- Open `index.html` - update the price display
- Open `js/cart.js` - change `ITEM_PRICE` constant

### Change Shipping Cost
- Open `js/cart.js` - change `SHIPPING_COST` constant

### Add More Colors
- Open `customize.html`
- Find the "Tumbler Color" section
- Add more color buttons following the existing pattern

### Change Site Name/Branding
- Update "Tumblera" text in all HTML files
- Update meta tags in `<head>` sections

## 🐛 Troubleshooting

### Website Not Loading
- Check that GitHub Pages is enabled
- Make sure main branch is selected as source
- Wait a few minutes after enabling

### Cart Not Saving
- Ensure browser allows localStorage
- Check browser console for errors (F12)

### Orders Not Sending Email
- Verify Formspree form ID is correct
- Check Formspree dashboard for submissions
- Note: Free plan has 50 submissions/month limit

### Images Not Displaying
- Check file size (very large images may not work)
- Ensure image format is supported (JPG, PNG, GIF)

## 📱 Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Customization page shows preview
- [ ] Text input updates preview
- [ ] Color pickers work
- [ ] Image upload works
- [ ] Add to cart works
- [ ] Cart displays items correctly
- [ ] Remove from cart works
- [ ] Checkout form validates
- [ ] Order submission works
- [ ] Success page displays
- [ ] Cart clears after order
- [ ] Works on mobile devices

## 🎉 You're Done!

Your Tumblera website is now live and ready to accept orders!

Share your URL: `https://yourusername.github.io/Tumblera/`

## 📞 Need Help?

Check the full README.md for more detailed information.
