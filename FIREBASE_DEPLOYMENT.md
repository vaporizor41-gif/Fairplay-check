# Firebase Hosting Deployment Guide for FairPlay Check

## Complete Step-by-Step Setup

This guide will help you deploy your FairPlay Check website to Firebase Hosting in about 15 minutes.

---

## Prerequisites

- Google account (Gmail)
- Your website files (already prepared in `/fairplay-website/`)
- Node.js installed (optional, for advanced setup)

---

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
1. Open https://console.firebase.google.com
2. Click **"Create a project"** or **"Add project"**

### 1.2 Project Setup
1. **Project Name:** Enter `fairplay-check` (or your preferred name)
2. Click **"Continue"**

### 1.3 Enable Google Analytics (Optional)
- You can skip this or enable it for analytics
- Click **"Create project"**
- Wait for project to be created (1-2 minutes)

### 1.4 Project Ready
- You'll see your Firebase project dashboard
- Note your **Project ID** (shown at top)

---

## Step 2: Set Up Firebase Hosting

### 2.1 Go to Hosting
1. In left sidebar, click **"Build"** → **"Hosting"**
2. Click **"Get started"**

### 2.2 Install Firebase CLI

#### On Windows:
1. Download installer: https://firebase.google.com/download/cli
2. Run the installer
3. Open Command Prompt and verify:
```bash
firebase --version
```

#### On Mac:
```bash
brew install firebase-cli
```

#### On Linux:
```bash
curl -sL https://firebase.tools | bash
```

### 2.3 Verify Installation
```bash
firebase --version
```
You should see a version number (e.g., "12.0.0")

---

## Step 3: Prepare Your Website Files

### 3.1 Create Project Folder
Create a folder structure like this:
```
fairplay-website/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── (all your website files)
├── firebase.json
└── .firebaserc
```

### 3.2 Move Files
1. Create a `public` folder in your project
2. Move these files INTO the `public` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - Any images or assets

### 3.3 Create firebase.json
In your project root (NOT in public folder), create a file called `firebase.json`:

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## Step 4: Deploy to Firebase

### 4.1 Open Terminal/Command Prompt
Navigate to your project folder:
```bash
cd /path/to/fairplay-website
```

### 4.2 Login to Firebase
```bash
firebase login
```
- Browser will open
- Click **"Allow"** to authorize
- Return to terminal (you'll see "Success!")

### 4.3 Initialize Firebase Project
```bash
firebase init hosting
```

When prompted:
- **"Select a default Firebase project"**: Choose your `fairplay-check` project
- **"What do you want to use as your public directory?"**: Type `public`
- **"Configure as a single-page app?"**: Type `y` (yes)
- **"Set up automatic builds and deploys with GitHub?"**: Type `n` (no)

### 4.4 Deploy Your Website
```bash
firebase deploy
```

Wait for deployment to complete. You'll see:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/fairplay-check/overview
Hosting URL: https://fairplay-check.web.app
```

---

## Step 5: Your Website is Live!

### 5.1 Access Your Website
Your website is now live at:
```
https://fairplay-check.web.app
```

Or the alternative URL:
```
https://fairplay-check.firebaseapp.com
```

### 5.2 Share Your URL
You can now share this URL with anyone to access your website!

---

## Step 6: Set Up PayPal Integration

### 6.1 Get Your PayPal Client ID
1. Log in to PayPal: https://www.paypal.com
2. Go to **Account** → **Account Settings**
3. Click **"Business"** tab
4. Find your **Merchant Account ID** or generate a new API signature

### 6.2 Alternative: Use PayPal Developer
1. Go to https://developer.paypal.com
2. Log in with your PayPal account
3. Go to **Apps & Credentials**
4. Copy your **Client ID**

### 6.3 Add PayPal to Your Website

In your `public/index.html`, find the payment section and add:

```html
<!-- PayPal SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

<!-- PayPal Button Container -->
<div id="paypal-button-container"></div>

<!-- PayPal Button Script -->
<script>
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '2.99'
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        alert('Payment successful! Thank you for purchasing FairPlay Check.');
        console.log('Order details:', orderData);
      });
    },
    onError: function(err) {
      alert('Payment failed. Please try again.');
      console.error(err);
    }
  }).render('#paypal-button-container');
</script>
```

### 6.4 Replace YOUR_CLIENT_ID
Replace `YOUR_CLIENT_ID` with your actual PayPal Client ID from step 6.2

### 6.5 Redeploy
```bash
firebase deploy
```

Your website is now updated with PayPal payments!

---

## Step 7: Test Your Website

### 7.1 Visit Your Website
Go to: `https://fairplay-check.web.app`

### 7.2 Test PayPal Button
1. Click the PayPal button
2. You should see PayPal login page
3. Use test credentials (if in sandbox mode)
4. Complete the payment flow

### 7.3 Verify Payment
Check your PayPal account to confirm payment was received

---

## Step 8: Set Up Custom Domain (Optional)

### 8.1 Connect Custom Domain
1. Go to Firebase Console
2. Click **Hosting** → **"Connect domain"**
3. Enter your domain (e.g., `fairplaycheck.app`)
4. Follow DNS setup instructions
5. Wait for SSL certificate (24-48 hours)

### 8.2 Your Custom URL
Your website will be accessible at:
```
https://fairplaycheck.app
```

---

## Updating Your Website

### To make changes:

1. Edit files in the `public/` folder
2. Run:
```bash
firebase deploy
```
3. Changes go live in seconds!

---

## Troubleshooting

### "firebase: command not found"
- Firebase CLI not installed
- Solution: Install Firebase CLI (see Step 2.2)

### "Permission denied" error
- You're not logged in to Firebase
- Solution: Run `firebase login`

### Website shows old version
- Browser cache issue
- Solution: Clear cache (Ctrl+Shift+Delete) and refresh

### PayPal button not working
- Client ID is incorrect or missing
- Solution: Verify Client ID and redeploy

### "Cannot find module" error
- Missing firebase.json file
- Solution: Create firebase.json in project root (see Step 3.3)

---

## Security Checklist

✅ Firebase provides HTTPS automatically  
✅ SSL certificate included  
✅ DDoS protection included  
✅ Firewall protection included  
✅ Regular backups available  

---

## Performance

Your website will be:
- **Fast**: Global CDN (Content Delivery Network)
- **Secure**: HTTPS with SSL certificate
- **Reliable**: 99.95% uptime SLA
- **Scalable**: Handles traffic spikes automatically

---

## Monitoring

### View Analytics:
1. Go to Firebase Console
2. Click **Hosting**
3. See traffic, errors, and performance metrics

### View Logs:
```bash
firebase hosting:channel:list
```

---

## Next Steps

1. ✅ Deploy to Firebase
2. ✅ Set up PayPal
3. ✅ Test payments
4. ✅ Share your URL
5. ✅ Monitor traffic
6. ✅ Add more apps (use the template!)

---

## Support

- **Firebase Help**: https://firebase.google.com/support
- **Firebase Docs**: https://firebase.google.com/docs/hosting
- **PayPal Help**: https://www.paypal.com/en/webapps/mpp/support
- **Your Website**: https://fairplay-check.web.app

---

## Summary

| Step | Time | Status |
|------|------|--------|
| Create Firebase Project | 2 min | ✅ |
| Install Firebase CLI | 5 min | ✅ |
| Prepare Files | 2 min | ✅ |
| Deploy | 2 min | ✅ |
| Set Up PayPal | 3 min | ✅ |
| Test | 2 min | ✅ |
| **Total** | **~15 min** | **✅ LIVE** |

---

## You're All Set! 🎉

Your FairPlay Check website is now:
- ✅ Live on Firebase
- ✅ Secure with HTTPS
- ✅ Fast with global CDN
- ✅ Ready to accept PayPal payments
- ✅ Professional and reliable

**Share your URL:** `https://fairplay-check.web.app`

**Start selling FairPlay Check today!** 🚀

---

*Last Updated: February 23, 2026*
