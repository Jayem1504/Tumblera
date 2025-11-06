# Tumblera - Personalized Tumblers E-Commerce Platform

A modern, full-featured e-commerce platform for personalized tumblers with text and image customization, cash on delivery payment, and seller dashboard.

## Features

### Customer Features
- 🎨 **Product Customization Studio**
  - Add custom text with 8+ fonts
  - Font size, color, alignment, and letter spacing controls
  - Position text at top, center, or bottom
  - Upload and customize images (PNG/JPG, max 10MB)
  - Image resize, rotate, and position controls
  - Real-time canvas preview

- 🛒 **Shopping Experience**
  - Product browsing with size/color variants
  - Add multiple customized items to cart
  - Quantity management
  - Cart persistence across sessions

- 💳 **Checkout & Payment**
  - Simple checkout form
  - Cash on Delivery (COD) payment method
  - Order confirmation page
  - Email notifications (when configured)

### Seller Features
- 📊 **Dashboard**
  - View all orders with customization details
  - Order status management (Pending → Processing → Shipped → Delivered → Cancelled)
  - Filter and search orders
  - Export orders to CSV
  - Order detail view with full customization preview

- 🔐 **Secure Access**
  - Seller authentication with Supabase Auth
  - Protected dashboard routes
  - Email/password login

### Admin Features
- ⚙️ **Settings Management**
  - Manage available fonts
  - Upload product mockup images
  - Configure COD instructions

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **State Management**: Zustand
- **Email**: SendGrid or SMTP (configurable)
- **Canvas Rendering**: HTML5 Canvas API

## Project Structure

```
tumblera/
├── app/
│   ├── api/                    # API routes
│   │   ├── checkout/          # Checkout API
│   │   ├── orders/            # Orders API
│   │   └── seller/            # Seller API
│   ├── cart/                  # Cart page
│   ├── checkout/              # Checkout page
│   ├── orders/                # Order confirmation
│   ├── products/              # Product listing & customization
│   ├── seller/                # Seller dashboard
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── customization/         # Customization studio components
│   ├── home/                  # Home page components
│   └── layout/                # Layout components (Header, Footer)
├── lib/
│   └── supabase.ts           # Supabase client
├── store/
│   └── cart.ts               # Cart state management (Zustand)
├── types/
│   └── index.ts              # TypeScript types
├── supabase/
│   └── schema.sql            # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- SendGrid account (optional, for emails)

### 2. Clone and Install

```bash
cd tumblera
npm install
```

### 3. Supabase Setup

1. **Create a Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Wait for the database to be ready

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/schema.sql`
   - Execute the SQL to create tables and seed data

3. **Get API Keys**
   - Go to Project Settings > API
   - Copy the `URL` and `anon public` key
   - Copy the `service_role` key (keep this secret!)

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@tumblera.com

# OR use SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Seller Notification Email
SELLER_EMAIL=seller@tumblera.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_IMAGE_SIZE_MB=10
```

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 6. Create Seller Account

To create a seller account, you have two options:

**Option A: Via Supabase Dashboard**
1. Go to Supabase Dashboard > Authentication > Users
2. Add a new user with email/password
3. Copy the user ID
4. Go to Table Editor > `sellers` table
5. Insert a new row with the user ID and email

**Option B: Via SQL**
```sql
-- Insert into auth.users (adjust as needed for your Supabase version)
-- Then insert into sellers table:
INSERT INTO public.sellers (id, email, name)
VALUES ('user-uuid-here', 'seller@example.com', 'Seller Name');
```

### 7. Test the Application

1. **Customer Flow**
   - Browse products at http://localhost:3000/products
   - Click "Customize" on any product
   - Add text or image customization
   - Add to cart
   - Go to checkout
   - Fill in delivery details
   - Place order with COD

2. **Seller Flow**
   - Go to http://localhost:3000/seller/login
   - Login with seller credentials
   - View orders in dashboard
   - Update order status
   - Export orders to CSV

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Update Environment Variables**
   - After deployment, update `NEXT_PUBLIC_APP_URL` to your Vercel URL
   - Redeploy if needed

### Supabase Production Setup

1. **Storage Bucket**
   - Ensure the `tumbler-images` bucket is created
   - Set appropriate CORS policies

2. **Row Level Security (RLS)**
   - The schema already includes RLS policies
   - Review and adjust as needed for your security requirements

3. **Email Configuration**
   - Configure your domain for SendGrid
   - Or set up SMTP with your email provider

## Configuration

### Adding New Fonts

1. Go to Supabase Table Editor
2. Open the `fonts` table
3. Add a new row:
   - `name`: Display name (e.g., "Roboto")
   - `font_family`: CSS font family (e.g., "Roboto, sans-serif")
   - `url`: Optional URL to custom font file
   - `is_active`: true

### Managing Products

Products are stored in the `products` table. To add new products:

```sql
INSERT INTO public.products (title, description, base_price, variants, mockup_images)
VALUES (
  'New Tumbler',
  'Description here',
  29.99,
  '[
    {"size": "20oz", "color": "Blue", "price_modifier": 0}
  ]'::jsonb,
  '["https://image-url.com"]'::jsonb
);
```

### Email Templates

Email sending functions are in:
- `/app/api/email/order-confirmation/route.ts` (to be created)
- `/app/api/email/seller-notification/route.ts` (to be created)

## Testing

### Manual Testing Checklist

- [ ] Browse products
- [ ] Customize tumbler (text)
- [ ] Customize tumbler (image)
- [ ] Add to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Checkout with COD
- [ ] Order confirmation displays correctly
- [ ] Seller can login
- [ ] Seller can view orders
- [ ] Seller can update order status
- [ ] Seller can export CSV

### Test Data

The schema includes 3 sample products:
- Classic Stainless Steel Tumbler ($25)
- Premium Travel Mug ($22)
- Kids Water Bottle ($15)

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Run `npm install` again
   - Delete `node_modules` and `.next`, then reinstall

2. **Supabase connection errors**
   - Check your environment variables
   - Ensure Supabase project is active
   - Verify API keys are correct

3. **Image upload not working**
   - Check storage bucket exists in Supabase
   - Verify storage policies are set
   - Check CORS settings

4. **Orders not saving**
   - Check database schema was executed
   - Verify RLS policies
   - Check browser console for errors

## API Endpoints

### Public Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/checkout` - Create order
- `GET /api/orders/:id` - Get order details

### Protected Endpoints (Seller)
- `POST /api/seller/login` - Seller login
- `GET /api/seller/orders` - List all orders
- `PUT /api/seller/orders/:id/status` - Update order status
- `GET /api/seller/orders/export` - Export orders to CSV

## Security Considerations

- ✅ Environment variables for sensitive data
- ✅ Row Level Security (RLS) on Supabase
- ✅ Protected seller routes
- ✅ Input validation
- ✅ File upload validation (size, type)
- ✅ CORS configuration
- ⚠️ No payment card data stored (COD only)

## Future Enhancements

- [ ] Customer accounts & order history
- [ ] Multiple seller support (marketplace)
- [ ] Order tracking with courier APIs
- [ ] Discount codes & coupons
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Multiple payment methods
- [ ] Advanced analytics
- [ ] Push notifications
- [ ] Mobile app (React Native)

## Support

For issues or questions:
- Check the troubleshooting section
- Review Supabase logs
- Check browser console for errors
- Review Next.js server logs

## License

This project is proprietary software. All rights reserved.

## Credits

Built with:
- Next.js by Vercel
- Supabase
- Tailwind CSS
- Lucide Icons
- Zustand

---

**Tumblera** - Create your perfect tumbler! 🥤✨
