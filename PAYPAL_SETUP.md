# PayPal Integration Setup Guide

## Overview

This guide explains how to integrate PayPal payment processing into the FairPlay Check website. The website is ready to accept PayPal payments for the $2.99 FairPlay Check app.

---

## Step 1: Create PayPal Business Account

### If you don't have a PayPal account:
1. Go to https://www.paypal.com
2. Click "Sign Up"
3. Select "Business Account"
4. Enter your email: `vaporizor41@gmail.com`
5. Create a secure password
6. Fill in your business information
7. Verify your email and phone number

### If you already have a PayPal account:
1. Log in to https://www.paypal.com
2. Go to Account Settings
3. Upgrade to Business Account if needed

---

## Step 2: Generate PayPal Payment Button

### Option A: Using PayPal Smart Buttons (Recommended)

1. Log in to PayPal Business account
2. Go to **Developer** → **Apps & Credentials**
3. Copy your **Client ID**
4. Replace `YOUR_CLIENT_ID` in the code below:

```html
<!-- Add this to the payment section in index.html -->
<div id="paypal-button-container"></div>

<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
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
        // Show success message
        document.querySelector('.payment-success').style.display = 'block';
        console.log('Order successful:', orderData);
      });
    },
    onError: function(err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    }
  }).render('#paypal-button-container');
</script>
```

### Option B: Using PayPal Standard Button

1. Log in to PayPal Business account
2. Go to **Tools** → **All Tools** → **Buttons**
3. Click **Create New Button**
4. Select **Buy Now**
5. Enter:
   - **Item Name:** FairPlay Check
   - **Price:** 2.99
   - **Currency:** USD
6. Click **Create Button**
7. Copy the HTML code
8. Paste it into the payment section of index.html

---

## Step 3: Set Up Instant Payment Notification (IPN)

### For automatic order confirmation:

1. Log in to PayPal Business account
2. Go to **Account Settings** → **Notifications**
3. Click **Update** next to IPN (Instant Payment Notification)
4. Enter your website URL: `https://yourwebsite.com/ipn-handler.php`
5. Save

---

## Step 4: Configure Return URLs

### After successful payment:

1. In PayPal button settings, set:
   - **Return URL:** `https://yourwebsite.com/success.html`
   - **Cancel URL:** `https://yourwebsite.com/cancelled.html`

2. Create these pages:

**success.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Payment Successful</title>
</head>
<body>
    <h1>✓ Payment Successful!</h1>
    <p>Thank you for your purchase of FairPlay Check.</p>
    <p>Download instructions have been sent to your email.</p>
    <p><a href="/">Return to Home</a></p>
</body>
</html>
```

**cancelled.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Payment Cancelled</title>
</head>
<body>
    <h1>Payment Cancelled</h1>
    <p>Your payment was cancelled. No charges were made.</p>
    <p><a href="/">Return to Home</a></p>
</body>
</html>
```

---

## Step 5: Test Payment Processing

### Sandbox Testing (Before Going Live):

1. Log in to PayPal Developer: https://developer.paypal.com
2. Create a **Sandbox Business Account**
3. Create a **Sandbox Buyer Account**
4. Use the Sandbox Client ID in your code
5. Test with the sandbox buyer account

### Test Credentials:
- **Email:** (Your sandbox buyer email)
- **Password:** (Your sandbox password)

### Test Transactions:
- Use amount: 2.99
- Complete the payment flow
- Verify it appears in your PayPal account

---

## Step 6: Go Live

### When ready to accept real payments:

1. Switch from Sandbox to **Live** credentials
2. Use your **Live Client ID** (not Sandbox)
3. Ensure your website is HTTPS (secure)
4. Update all URLs to your live domain
5. Test one more time with a small amount

---

## Step 7: Monitor Payments

### Track all transactions:

1. Log in to PayPal Business account
2. Go to **Activity** → **Transactions**
3. View all payments received
4. Download transaction reports

---

## Security Best Practices

1. **Never share your Client ID or API keys** in public code
2. **Always use HTTPS** for payment pages
3. **Validate amounts** on the server side
4. **Store transaction IDs** for record keeping
5. **Use webhook verification** to confirm payments

---

## Troubleshooting

### Payment button not appearing:
- Check that Client ID is correct
- Verify JavaScript is loading
- Check browser console for errors

### Payments not going through:
- Verify PayPal account is active
- Check that amount is correct (2.99)
- Ensure currency is USD
- Test in sandbox first

### IPN not working:
- Verify IPN URL is correct and accessible
- Check server logs for errors
- Ensure your server can accept POST requests

---

## Additional Resources

- **PayPal Developer Docs:** https://developer.paypal.com/docs
- **PayPal Buttons Guide:** https://developer.paypal.com/docs/checkout/
- **PayPal Support:** https://www.paypal.com/en/webapps/mpp/support

---

## Summary

1. ✓ Create PayPal Business Account
2. ✓ Generate Payment Button
3. ✓ Set up IPN (optional but recommended)
4. ✓ Configure Return URLs
5. ✓ Test in Sandbox
6. ✓ Go Live with Live credentials
7. ✓ Monitor transactions

Once completed, your website will be ready to accept $2.99 payments for FairPlay Check!

---

## Contact

For PayPal support: support@paypal.com
For website support: support@fairplaycheck.app
