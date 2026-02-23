# Firebase Deployment - Quick Start (5 Minutes)

## TL;DR - Just the Commands

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```
Or download: https://firebase.google.com/download/cli

### 2. Create Firebase Project
- Go to https://console.firebase.google.com
- Click "Create a project"
- Name it: `fairplay-check`
- Click "Create project"

### 3. Login to Firebase
```bash
firebase login
```
(Browser will open - click "Allow")

### 4. Prepare Your Files
Create this folder structure:
```
fairplay-website/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── (all your files go here)
├── firebase.json
└── .firebaserc (created automatically)
```

### 5. Initialize Firebase
```bash
cd fairplay-website
firebase init hosting
```
When asked:
- Select your `fairplay-check` project
- Public directory: `public`
- Single-page app: `y`
- GitHub deploys: `n`

### 6. Deploy!
```bash
firebase deploy
```

### 7. Your Website is Live!
```
https://fairplay-check.web.app
```

---

## That's It!

Your website is now live and secure. 🎉

For PayPal setup, see `PAYPAL_SETUP.md`
For detailed guide, see `FIREBASE_DEPLOYMENT.md`

---

## Update Your Website

Edit files in `public/` folder, then:
```bash
firebase deploy
```

Changes go live in seconds!

---

## Need Help?

- **Detailed Guide**: Read `FIREBASE_DEPLOYMENT.md`
- **PayPal Setup**: Read `PAYPAL_SETUP.md`
- **Firebase Docs**: https://firebase.google.com/docs/hosting
