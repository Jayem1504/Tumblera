# 🚀 DEPLOYMENT CHECKLIST

Use this checklist to deploy Tumblera to production.

## Pre-Deployment

### Code & Dependencies
- [ ] All npm packages installed without errors
- [ ] No TypeScript compilation errors
- [ ] `.env.local` configured with all required variables
- [ ] `.gitignore` includes `.env.local` and `.env`
- [ ] Code pushed to Git repository (GitHub/GitLab)

### Database (Supabase)
- [ ] Supabase project created
- [ ] Database schema executed (`schema.sql`)
- [ ] Sample products added or real products inserted
- [ ] Seller account(s) created
- [ ] Storage bucket `tumbler-images` created
- [ ] Storage policies configured
- [ ] RLS policies reviewed and enabled
- [ ] Test order created successfully

### Testing
- [ ] Customer flow tested (browse → customize → cart → checkout)
- [ ] Seller login tested
- [ ] Dashboard displays orders correctly
- [ ] Order status updates work
- [ ] CSV export works
- [ ] Mobile responsive design verified
- [ ] All API endpoints tested
- [ ] Image upload tested
- [ ] Text customization tested

## Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial deployment"
git branch -M main
git remote add origin https://github.com/yourusername/tumblera.git
git push -u origin main
```

### 2. Deploy on Vercel
- [ ] Go to https://vercel.com
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project:
  - Framework Preset: Next.js
  - Root Directory: ./
  - Build Command: `npm run build` (default)
  - Output Directory: `.next` (default)

### 3. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` (your Vercel URL)
- [ ] `SELLER_EMAIL`
- [ ] `SENDGRID_API_KEY` (if using email)
- [ ] `EMAIL_FROM` (if using email)

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Visit your live URL!

## Post-Deployment

### Verification
- [ ] Homepage loads correctly
- [ ] Products page displays
- [ ] Can access customization studio
- [ ] Can add items to cart
- [ ] Checkout process works
- [ ] Order confirmation displays
- [ ] Seller login works
- [ ] Dashboard displays correctly
- [ ] Order management works
- [ ] No console errors in browser

### Configuration Updates
- [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables to your actual domain
- [ ] Redeploy after changing environment variables
- [ ] Update CORS settings in Supabase if needed
- [ ] Configure custom domain (optional)

### Supabase Production Settings
- [ ] Review RLS policies for production security
- [ ] Set up database backups
- [ ] Configure Supabase alerts
- [ ] Review storage limits
- [ ] Consider upgrading Supabase plan if needed

### Email Configuration (Optional)
- [ ] SendGrid account created
- [ ] API key generated
- [ ] Sender email verified
- [ ] Email templates customized
- [ ] Test order confirmation email
- [ ] Test seller notification email

### Monitoring & Analytics
- [ ] Set up Vercel Analytics (optional)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Google Analytics added (optional)

### Security
- [ ] Environment variables are secret
- [ ] Service role key never exposed to client
- [ ] CORS configured correctly
- [ ] Rate limiting considered
- [ ] Input validation in place
- [ ] File upload validation working

### Performance
- [ ] Images optimized
- [ ] Next.js Image component used
- [ ] API responses cached where appropriate
- [ ] Lighthouse score checked (aim for 90+)

### Documentation
- [ ] README.md updated with production URL
- [ ] Seller login credentials documented
- [ ] Admin access documented
- [ ] API documentation complete
- [ ] User guide created (optional)

## DNS & Custom Domain (Optional)

### If using custom domain:
- [ ] Domain purchased
- [ ] DNS records configured in Vercel
- [ ] SSL certificate auto-generated
- [ ] Update `NEXT_PUBLIC_APP_URL` to custom domain
- [ ] Test all functionality on custom domain

## Maintenance

### Regular Tasks
- [ ] Monitor order volume
- [ ] Check for errors in Vercel logs
- [ ] Review Supabase usage
- [ ] Backup database regularly
- [ ] Update dependencies monthly
- [ ] Review and respond to customer orders
- [ ] Add new products as needed

### Scaling Considerations
- [ ] Supabase plan adequate for traffic
- [ ] Vercel plan adequate for traffic
- [ ] Storage space monitored
- [ ] Database performance optimized
- [ ] CDN for images (if high traffic)

## Rollback Plan

If deployment fails:
1. Check Vercel deployment logs
2. Review Supabase connection
3. Verify environment variables
4. Test locally with production env vars
5. Rollback to previous deployment in Vercel if needed

## Support Contacts

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Next.js Docs: https://nextjs.org/docs

## Launch Checklist

Before going live to customers:
- [ ] All items above completed
- [ ] Test order placed and fulfilled
- [ ] Seller can manage orders
- [ ] Email notifications working (if configured)
- [ ] Mobile experience tested
- [ ] Payment process clear (COD instructions)
- [ ] Contact information updated
- [ ] Legal pages added (Privacy, Terms - optional)
- [ ] Social media accounts linked (optional)
- [ ] Marketing materials ready

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Deployment Date**: _______________

**Production URL**: _______________

**Notes**:
_____________________
_____________________
_____________________
