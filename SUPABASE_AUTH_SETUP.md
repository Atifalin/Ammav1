# Supabase Auth Setup for Amma

## Current Configuration

### Email Authentication
- **Method:** Email + Password
- **Email Confirmation:** Disabled for testing (enable in production)
- **Phone Collection:** Yes (stored but not used for verification yet)

### Production Email Setup (TODO)
- **Domain:** ezypath.in
- **SMTP:** Apple's SMTP relay (to be configured)
- **Purpose:** Send verification emails via custom domain

---

## Database Schema

### Caregivers Table
- `id` (uuid) - Links to Supabase auth.users.id
- `family_id` (uuid) - References families table
- `name` (text) - User's display name
- `phone` (text, nullable) - For future SMS verification
- `role` (text) - 'primary' | 'co-caregiver' | 'viewer'

### Sign Up Flow
1. User provides: email, password, name, phone (optional)
2. Supabase creates auth user with metadata
3. App creates family record
4. App creates caregiver record linked to family and auth user

---

## Implementation Files

- **Auth Context:** `src/contexts/AuthContext.tsx`
- **Sign Up Screen:** `src/screens/auth/SignUpScreen.tsx`
- **Sign In Screen:** `src/screens/auth/SignInScreen.tsx`
- **Navigation:** `src/navigation/AppNavigator.tsx` (conditional routing)
- **Migration:** `supabase/migrations/003_add_phone_to_caregivers.sql`

---

## Testing

### Create Test Account
1. Open app in Expo Go
2. Tap "Sign Up" on sign-in screen
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 98765 43210 (optional)
   - Password: test123
4. Account created immediately (no email verification required)

### Sign In
- Use same email/password
- Session persists across app restarts (AsyncStorage)

### Sign Out
- Go to Settings tab
- Tap "Sign Out" button
- Confirm in alert dialog

---

## Production Checklist

### Before Launch
- [ ] Enable email confirmation in Supabase dashboard
- [ ] Configure custom SMTP (ezypath.in via Apple)
- [ ] Set up email templates in Supabase
- [ ] Implement SMS verification for phone numbers (MSG91)
- [ ] Add password reset flow
- [ ] Add email change flow
- [ ] Test email deliverability

### Supabase Dashboard Settings
1. Go to Authentication > Settings
2. Enable "Confirm email"
3. Configure SMTP settings:
   - Host: (Apple SMTP relay)
   - Port: 587
   - Username: (ezypath.in email)
   - Password: (app-specific password)
4. Customize email templates

---

## Security Notes

- Passwords hashed by Supabase (bcrypt)
- Session tokens stored in AsyncStorage (encrypted on device)
- RLS policies ensure users only access their family data
- Phone numbers collected but not verified (future feature)

---

## Future Enhancements

1. **SMS Verification:** Use MSG91 for phone number verification
2. **Social Auth:** Google, Apple Sign-In
3. **Multi-Factor Auth:** SMS or TOTP-based 2FA
4. **Password Reset:** Email-based password recovery
5. **Magic Links:** Passwordless email authentication
