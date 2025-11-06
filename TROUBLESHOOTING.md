# 🔧 TROUBLESHOOTING GUIDE

## Common Errors & Solutions

### ❌ "Cannot find module '@supabase/supabase-js'"
**Solution:** Dependencies not installed
```bash
npm install
```

### ❌ "Missing Supabase environment variables"
**Solution:** Create `.env.local` file
```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local and add your Supabase keys
# Get them from: https://supabase.com/dashboard
```

### ❌ Supabase connection errors / No products showing
**Cause:** Haven't set up Supabase yet

**Solution:**
1. Go to https://supabase.com
2. Create a free account
3. Create a new project
4. Go to SQL Editor
5. Copy and run `supabase/schema.sql`
6. Go to Settings → API, copy your keys
7. Add keys to `.env.local`
8. Restart dev server: `npm run dev`

### ❌ TypeScript compilation errors
**Solution:** All fixed! If you still see errors:
```bash
# Clean and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### ❌ Page shows "undefined" or blank
**Cause:** Supabase not configured properly

**Check:**
- `.env.local` file exists
- All three Supabase keys are filled in
- Database schema was executed
- Dev server was restarted after adding keys

### ❌ "Cannot read property of undefined"
**Cause:** Missing sample data in database

**Solution:**
- Make sure you ran the complete `supabase/schema.sql`
- It includes 3 sample products and 8 fonts
- Check Supabase dashboard → Table Editor → products table

### ❌ Images not uploading
**Cause:** Supabase Storage not configured

**Solution:**
1. Go to Supabase Dashboard → Storage
2. Create bucket named `tumbler-images`
3. Set it to public
4. Add storage policies (included in schema.sql)

### ❌ Seller login not working
**Cause:** No seller account created

**Solution:**
1. Go to Supabase Dashboard → Authentication → Users
2. Add user with email/password
3. Go to Table Editor → sellers table
4. Insert row with user ID and email
5. See QUICKSTART.md step 4 for details

### ❌ Orders not saving
**Cause:** Database schema not executed

**Solution:**
- Go to Supabase SQL Editor
- Run the complete `supabase/schema.sql` file
- Check for any SQL errors

## Quick Checks

### Is the dev server running?
```bash
npm run dev
```
Should show: `Ready in X.Xs` and `Local: http://localhost:3000`

### Are environment variables loaded?
Check if `.env.local` exists in project root (same folder as package.json)

### Is Supabase project active?
Go to https://supabase.com/dashboard
- Project should show as "Active"
- Database should be ready (not paused)

### Are there TypeScript errors?
```bash
npm run type-check
```

### Clear cache and restart
```bash
# Windows PowerShell
rm -r -fo node_modules,.next
npm install
npm run dev

# Or just:
npm run clean
npm install
npm run dev
```

## Still Having Issues?

1. **Check browser console** (F12 in Chrome)
   - Look for error messages
   - Check Network tab for failed requests

2. **Check Supabase logs**
   - Go to Supabase Dashboard → Logs
   - Look for API errors

3. **Verify file structure**
   - All files from the project should be present
   - Check that `components/`, `app/`, `lib/` folders exist

4. **Check Node version**
   ```bash
   node --version
   ```
   Should be v18 or higher

5. **Re-read the docs**
   - `START_HERE.md` - Overview
   - `QUICKSTART.md` - Setup guide
   - `README.md` - Full documentation

## Error Messages Decoded

| Error | Meaning | Fix |
|-------|---------|-----|
| `ECONNREFUSED` | Can't connect to Supabase | Check URL and keys in .env.local |
| `401 Unauthorized` | Wrong API key | Double-check SUPABASE_ANON_KEY |
| `404 Not Found` | Wrong Supabase URL | Check NEXT_PUBLIC_SUPABASE_URL |
| `RLS policy violation` | Database security issue | Make sure schema.sql ran completely |
| `Module not found` | Missing dependency | Run `npm install` |
| `Type error` | TypeScript issue | All fixed! Run `npm run dev` |

## Pro Tips

✅ Always restart dev server after changing `.env.local`
✅ Use browser incognito mode to test without cache
✅ Check Supabase dashboard to verify data
✅ Keep browser console open while testing
✅ Test on mobile view (Chrome DevTools device mode)

## Need More Help?

📖 Read `QUICKSTART.md` for complete setup
📖 Read `README.md` for detailed documentation
📖 Check Supabase docs: https://supabase.com/docs
📖 Check Next.js docs: https://nextjs.org/docs

---

**Most Common Issue:** Not setting up Supabase yet!  
**Solution:** Follow `QUICKSTART.md` Step 2 (takes 3 minutes)
