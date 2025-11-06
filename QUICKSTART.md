# 🚀 QUICKSTART GUIDE - Tumblera

Get your Tumblera e-commerce platform running in 10 minutes!

## Step 1: Install Dependencies (2 min)

```bash
cd tumblera
npm install
```

## Step 2: Set Up Supabase (3 min)

1. Go to https://supabase.com and create a free account
2. Create a new project (wait 2 minutes for it to initialize)
3. Go to **SQL Editor** in the left sidebar
4. Copy the entire contents of `supabase/schema.sql`
5. Paste into SQL Editor and click **RUN**
6. Go to **Project Settings** → **API** and copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep secret!)

## Step 3: Configure Environment (2 min)

1. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

NEXT_PUBLIC_APP_URL=http://localhost:3000
SELLER_EMAIL=seller@example.com
```

## Step 4: Create a Seller Account (2 min)

Go to **Supabase Dashboard** → **Authentication** → **Users**:

1. Click **Add User**
2. Enter email: `seller@example.com`
3. Enter password: `seller123`
4. Click **Create User**
5. Copy the User ID from the users table

Then go to **Table Editor** → **sellers** table:

1. Click **Insert** → **Insert Row**
2. Paste the User ID in the `id` field
3. Enter email: `seller@example.com`
4. Enter name: `Admin Seller`
5. Click **Save**

## Step 5: Run the Application (1 min)

```bash
npm run dev
```

Open http://localhost:3000 in your browser 🎉

## ✅ Test Everything Works

### Customer Flow:
1. Go to http://localhost:3000
2. Click **"Shop"** or **"Customize Your Tumbler"**
3. Select a product and click **"Customize"**
4. Add text or upload an image
5. Click **"Add to Cart"**
6. Go to Cart and click **"Proceed to Checkout"**
7. Fill in delivery details:
   - Name: John Doe
   - Phone: +1 555-123-4567
   - Address: 123 Main St, New York, NY 10001
8. Click **"Place Order"**
9. You'll see the confirmation page! ✅

### Seller Flow:
1. Go to http://localhost:3000/seller/login
2. Login with:
   - Email: `seller@example.com`
   - Password: `seller123`
3. You'll see the seller dashboard with your order! ✅
4. Click **"View"** to see order details
5. Update the status to "Processing", "Shipped", etc.
6. Click **"Export CSV"** to download orders

## 🎨 Sample Products Included

The database is pre-loaded with 3 products:
- Classic Stainless Steel Tumbler ($25)
- Premium Travel Mug ($22)
- Kids Water Bottle ($15)

## 📝 What's Working

✅ Product browsing and listing
✅ Customization studio (text + images)
✅ Real-time canvas preview
✅ Cart management
✅ Checkout with COD
✅ Order confirmation
✅ Seller authentication
✅ Seller dashboard
✅ Order management
✅ Status updates
✅ CSV export
✅ Mobile responsive
✅ Clean, modern UI

## 🔧 Common Issues

**"Cannot find module" errors:**
```bash
rm -rf node_modules .next
npm install
```

**Supabase connection error:**
- Double-check your `.env.local` keys
- Make sure you ran the `schema.sql` file
- Check your Supabase project is active

**Can't login as seller:**
- Make sure you created the user in both `auth.users` AND `sellers` table
- The email must match in both places

## 🚀 Next Steps

1. **Add more products:** Edit the `products` table in Supabase
2. **Customize branding:** Edit colors in `tailwind.config.js`
3. **Set up emails:** Configure SendGrid in `.env.local`
4. **Deploy to Vercel:** Follow the README deployment section
5. **Add your logo:** Replace "Tumblera" text in `components/layout/Header.tsx`

## 📚 Full Documentation

See `README.md` for:
- Complete feature list
- API endpoints
- Deployment guides
- Troubleshooting
- Production setup

## 💡 Tips

- **Test different customizations:** Try various fonts, colors, and image uploads
- **Check mobile view:** Open Chrome DevTools and test responsive design
- **Explore seller features:** Filter orders, update statuses, export data
- **Customize products:** Add your own tumblers in the Supabase dashboard

---

**You're all set! 🎉** Start customizing tumblers at http://localhost:3000

Need help? Check the full README.md or Supabase logs for errors.
