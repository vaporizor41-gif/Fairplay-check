# Buyer Tracking & Management Guide

## Overview

Your FairPlay Check website now collects and stores buyer information before processing payments. All buyer data is saved locally in your browser's storage, allowing you to review and export buyer information anytime.

---

## What Information is Collected

Before any purchase, customers must provide:

1. **Full Name** - Required
2. **Email Address** - Required
3. **Phone Number** - Required
4. **Payment Method** - PayPal or Credit Card
5. **Transaction ID** - Unique identifier for each purchase
6. **Timestamp** - Date and time of purchase

---

## How to Access Buyer Information

### Method 1: Browser Console (Easy)

1. Open your website in a browser
2. Press `F12` to open Developer Tools
3. Click the **Console** tab
4. Type this command:
   ```javascript
   PaymentSystem.viewBuyersInConsole()
   ```
5. All buyers will display in a table format

### Method 2: Browser Storage Inspector

1. Open Developer Tools (`F12`)
2. Click **Application** tab
3. Click **Local Storage** in left sidebar
4. Find your website URL
5. Look for key: `fairplay_buyers`
6. The value contains all buyer data in JSON format

### Method 3: Export as CSV

1. Open website in browser
2. Open Console (`F12` → Console tab)
3. Type this command:
   ```javascript
   PaymentSystem.exportBuyersAsCSV()
   ```
4. A CSV file downloads automatically
5. Open in Excel, Google Sheets, or any spreadsheet app

### Method 4: Export as JSON

1. Open website in browser
2. Open Console (`F12` → Console tab)
3. Type this command:
   ```javascript
   PaymentSystem.exportBuyersAsJSON()
   ```
4. A JSON file downloads automatically
5. Open in any text editor

---

## Buyer Data Structure

Each buyer record contains:

```json
{
  "id": "CARD-1708641234567",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "paymentMethod": "Credit Card",
  "amount": "2.99",
  "currency": "USD",
  "timestamp": "2026-02-23T10:20:34.567Z",
  "date": "2/23/2026, 10:20:34 AM",
  "status": "completed"
}
```

---

## Viewing Buyers in Different Formats

### CSV Format (Spreadsheet)

```
Transaction ID,Full Name,Email,Phone,Payment Method,Amount,Date,Status
CARD-1708641234567,John Doe,john@example.com,+1 (555) 123-4567,Credit Card,2.99,2/23/2026 10:20:34 AM,completed
PAYPAL-1708641234568,Jane Smith,jane@example.com,+1 (555) 987-6543,PayPal,2.99,2/23/2026 10:25:45 AM,completed
```

### JSON Format (Raw Data)

```json
[
  {
    "id": "CARD-1708641234567",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "paymentMethod": "Credit Card",
    "amount": "2.99",
    "currency": "USD",
    "timestamp": "2026-02-23T10:20:34.567Z",
    "date": "2/23/2026, 10:20:34 AM",
    "status": "completed"
  }
]
```

### Console Table Format

| id | fullName | email | phone | paymentMethod | amount | date |
|----|----------|-------|-------|---------------|--------|------|
| CARD-1708641234567 | John Doe | john@example.com | +1 (555) 123-4567 | Credit Card | 2.99 | 2/23/2026, 10:20:34 AM |

---

## Step-by-Step: Export Buyer Data

### Export to CSV (Excel)

1. **Open your website** in browser
2. **Press F12** to open Developer Tools
3. **Click Console tab**
4. **Copy and paste:**
   ```javascript
   PaymentSystem.exportBuyersAsCSV()
   ```
5. **Press Enter**
6. **File downloads** as `fairplay-buyers-2026-02-23.csv`
7. **Open in Excel** or Google Sheets
8. **Review and analyze** buyer data

### Export to JSON (Raw Data)

1. **Open your website** in browser
2. **Press F12** to open Developer Tools
3. **Click Console tab**
4. **Copy and paste:**
   ```javascript
   PaymentSystem.exportBuyersAsJSON()
   ```
5. **Press Enter**
6. **File downloads** as `fairplay-buyers-2026-02-23.json`
7. **Open in text editor** to view raw data

---

## Analyzing Buyer Data

### In Excel/Google Sheets

Once you've exported as CSV:

1. **Open the CSV file**
2. **Create pivot tables** to analyze:
   - Total sales by payment method
   - Sales by date
   - Geographic distribution (by phone area code)
   - Email domain analysis

3. **Create charts** to visualize:
   - Payment method breakdown
   - Sales over time
   - Customer acquisition trends

### In JSON Format

Use tools like:
- **JSON Editor** - Online JSON viewers
- **Python** - Parse and analyze with pandas
- **Node.js** - Process with JavaScript
- **Power BI** - Create dashboards

---

## Data Privacy & Security

### Where is Data Stored?

- **Browser Storage**: Data stored in your browser's localStorage
- **Your Computer**: When you export, files are saved to your computer
- **No Cloud**: Data is NOT sent to any server
- **Local Only**: Completely private and under your control

### How to Back Up Data

1. **Export regularly** (weekly or monthly)
2. **Save files** to a secure folder
3. **Create backups** on external drive
4. **Keep organized** with date-stamped filenames

### How to Clear Data

**WARNING: This will delete all buyer records!**

In browser console:
```javascript
localStorage.removeItem('fairplay_buyers')
```

---

## Troubleshooting

### "No buyers to export"
- No purchases have been made yet
- Check that payments were completed successfully
- Verify browser localStorage is enabled

### CSV file won't open in Excel
- Try opening with Google Sheets instead
- Check file encoding (should be UTF-8)
- Verify CSV file wasn't corrupted during download

### Console commands not working
- Make sure you're on the correct website
- Verify browser console is open (`F12`)
- Check that `payment.js` is loaded (check Network tab)

### Data disappeared
- Check if browser cache was cleared
- Try exporting to backup if you have one
- Data is stored per-browser, not synced across devices

---

## Best Practices

### Regular Exports

1. **Export weekly** to backup data
2. **Store files** in organized folder
3. **Label files** with dates
4. **Keep backups** on external drive

### Data Organization

1. **Create folder**: `FairPlay_Buyers`
2. **Subfolder**: `2026-02`
3. **Files**: `fairplay-buyers-2026-02-23.csv`

### Analysis Workflow

1. **Export data** to CSV
2. **Open in Excel/Sheets**
3. **Create pivot tables**
4. **Generate charts**
5. **Save analysis** with date

---

## Advanced: Custom Analysis

### Using Python

```python
import json

# Load buyer data
with open('fairplay-buyers-2026-02-23.json') as f:
    buyers = json.load(f)

# Total sales
total_sales = len(buyers) * 2.99
print(f"Total Sales: ${total_sales:.2f}")

# By payment method
by_method = {}
for buyer in buyers:
    method = buyer['paymentMethod']
    by_method[method] = by_method.get(method, 0) + 1

print("By Payment Method:")
for method, count in by_method.items():
    print(f"  {method}: {count}")
```

### Using Google Sheets

1. **Create new spreadsheet**
2. **Import CSV** (File → Import)
3. **Create pivot table** (Data → Pivot table)
4. **Analyze** by:
   - Payment method
   - Date
   - Email domain
   - Phone area code

---

## Compliance & Legal

### Data Retention

- Keep buyer records for **at least 1 year**
- Required for tax and accounting purposes
- Required for refund/dispute handling

### Privacy

- Only use data for order fulfillment
- Don't share with third parties
- Follow your Privacy Policy
- Comply with GDPR/CCPA if applicable

### Refunds & Disputes

- Keep transaction records for disputes
- PayPal handles refund processing
- Use transaction ID to track refunds
- Document all customer communications

---

## Quick Reference

| Task | Command |
|------|---------|
| View all buyers | `PaymentSystem.viewBuyersInConsole()` |
| Export as CSV | `PaymentSystem.exportBuyersAsCSV()` |
| Export as JSON | `PaymentSystem.exportBuyersAsJSON()` |
| Get all buyers | `PaymentSystem.getAllBuyers()` |

---

## Summary

Your FairPlay Check website now:

✅ Collects buyer information (name, email, phone)  
✅ Stores all transactions locally  
✅ Allows easy export to CSV or JSON  
✅ Provides console access to view data  
✅ Keeps data private and secure  
✅ Enables analysis and reporting  

**You have complete control over all buyer data!**

---

## Support

For questions about buyer tracking:
- Check browser console for errors
- Verify localStorage is enabled
- Try exporting to different format
- Check that payment.js is loaded

---

*Last Updated: February 23, 2026*
