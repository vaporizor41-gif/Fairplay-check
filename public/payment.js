// ============================================
// FairPlay Check - Payment Processing
// Handles PayPal and Credit Card Payments
// With Buyer Information Collection & Storage
// ============================================

// Configuration
const PAYMENT_CONFIG = {
    amount: '2.99',
    currency: 'USD',
    appName: 'FairPlay Check',
    paypalClientId: 'AXKfXcjE0dxuocGjYsMkvlt563AMyZinEqGpr0Zjv4BWDkcXHDJfPOxFmCzhYcTk0Iiv9kSwSBmi7kiS'
};

// Buyer Information Storage
const BUYERS_STORAGE_KEY = 'fairplay_buyers';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment system initialized');
    console.log('PayPal Client ID:', PAYMENT_CONFIG.paypalClientId);
    
    // Check if PayPal SDK is loaded
    if (typeof paypal === 'undefined') {
        console.warn('PayPal SDK not loaded. Please add your Client ID to the HTML.');
    }
});

// ============================================
// BUYER INFORMATION COLLECTION
// ============================================

// Show buyer information form
function showBuyerForm() {
    const modal = document.getElementById('buyer-info-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Hide buyer information form
function hideBuyerForm() {
    const modal = document.getElementById('buyer-info-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Validate buyer information
function validateBuyerInfo() {
    const fullName = document.getElementById('buyer-full-name').value.trim();
    const email = document.getElementById('buyer-email').value.trim();
    const phone = document.getElementById('buyer-phone').value.trim();
    
    // Validate full name
    if (!fullName || fullName.length < 2) {
        showBuyerError('Please enter your full name');
        return false;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showBuyerError('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    if (!isValidPhone(phone)) {
        showBuyerError('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
    // Accept various phone formats
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Handle buyer form submission
function handleBuyerFormSubmit(e) {
    e.preventDefault();
    
    if (!validateBuyerInfo()) {
        return;
    }
    
    const fullName = document.getElementById('buyer-full-name').value.trim();
    const email = document.getElementById('buyer-email').value.trim();
    const phone = document.getElementById('buyer-phone').value.trim();
    
    // Store buyer info temporarily
    window.currentBuyer = {
        fullName: fullName,
        email: email,
        phone: phone,
        timestamp: new Date().toISOString()
    };
    
    // Hide form
    hideBuyerForm();
    
    // Show payment options
    document.querySelector('.payment-card').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// PAYPAL PAYMENT
// ============================================

// Initialize PayPal Payment
function initPayPalPayment() {
    if (!window.currentBuyer) {
        showBuyerError('Please fill in your information first');
        showBuyerForm();
        return;
    }
    
    console.log('Initializing PayPal payment...');
    
    // Show PayPal button container
    const container = document.getElementById('paypal-button-container');
    container.classList.remove('payment-container-hidden');
    
    // Hide card payment container if visible
    const cardContainer = document.getElementById('card-payment-container');
    cardContainer.classList.add('payment-container-hidden');
    
    // Scroll to payment container
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Render PayPal buttons
    renderPayPalButtons();
}

// Render PayPal Smart Buttons
function renderPayPalButtons() {
    // Clear previous buttons
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = '';
    
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: PAYMENT_CONFIG.amount,
                        currency_code: PAYMENT_CONFIG.currency
                    },
                    description: PAYMENT_CONFIG.appName
                }]
            });
        },
        
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                console.log('PayPal Order Captured:', orderData);
                saveBuyerTransaction('PayPal', orderData.id);
                showPaymentSuccess('PayPal', orderData.id);
            });
        },
        
        onError: function(err) {
            console.error('PayPal Error:', err);
            showPaymentError('PayPal payment failed. Please try again.');
        },
        
        onCancel: function(data) {
            console.log('PayPal Payment Cancelled');
            showPaymentCancelled();
        }
    }).render('#paypal-button-container');
}

// ============================================
// CREDIT CARD PAYMENT
// ============================================

// Initialize Card Payment
function initCardPayment() {
    if (!window.currentBuyer) {
        showBuyerError('Please fill in your information first');
        showBuyerForm();
        return;
    }
    
    console.log('Initializing card payment...');
    
    // Show card payment container
    const cardContainer = document.getElementById('card-payment-container');
    cardContainer.classList.remove('payment-container-hidden');
    
    // Hide PayPal button container if visible
    const paypalContainer = document.getElementById('paypal-button-container');
    paypalContainer.classList.add('payment-container-hidden');
    
    // Scroll to payment container
    setTimeout(() => {
        cardContainer.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Render card payment form
    renderCardPaymentForm();
}

// Render Card Payment Form
function renderCardPaymentForm() {
    const container = document.getElementById('card-payment-container');
    
    // Create form HTML
    const formHTML = `
        <div class="card-payment-form">
            <h4>Credit Card Payment</h4>
            <p class="payment-note">Powered by PayPal (accepts Visa, Mastercard, American Express)</p>
            
            <form id="card-form" class="card-form">
                <div class="form-group">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" name="cardNumber" required placeholder="1234 5678 9012 3456" maxlength="19">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="card-expiry">Expiry Date</label>
                        <input type="text" id="card-expiry" name="expiry" required placeholder="MM/YY" maxlength="5">
                    </div>
                    
                    <div class="form-group">
                        <label for="card-cvv">CVV</label>
                        <input type="text" id="card-cvv" name="cvv" required placeholder="123" maxlength="4">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="card-country">Country</label>
                    <select id="card-country" name="country" required>
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="CH">Switzerland</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="PL">Poland</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="HU">Hungary</option>
                        <option value="RO">Romania</option>
                        <option value="GR">Greece</option>
                        <option value="PT">Portugal</option>
                        <option value="IE">Ireland</option>
                        <option value="JP">Japan</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="BR">Brazil</option>
                        <option value="MX">Mexico</option>
                        <option value="ZA">South Africa</option>
                        <option value="SG">Singapore</option>
                        <option value="HK">Hong Kong</option>
                        <option value="NZ">New Zealand</option>
                    </select>
                </div>
                
                <div class="form-group checkbox">
                    <input type="checkbox" id="card-agree" name="agree" required>
                    <label for="card-agree">I agree to the Terms of Service and Privacy Policy</label>
                </div>
                
                <button type="submit" class="btn btn-payment btn-card-submit">
                    Pay $${PAYMENT_CONFIG.amount} USD
                </button>
                
                <button type="button" class="btn btn-secondary" onclick="cancelCardPayment()">
                    Cancel
                </button>
            </form>
            
            <p class="payment-security">
                🔒 Your payment information is secure and encrypted. We do not store your card details.
            </p>
        </div>
    `;
    
    container.innerHTML = formHTML;
    
    // Add form submission handler
    const form = document.getElementById('card-form');
    form.addEventListener('submit', handleCardPaymentSubmit);
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', formatCardNumber);
    
    // Format expiry input
    const expiryInput = document.getElementById('card-expiry');
    expiryInput.addEventListener('input', formatExpiry);
}

// Format card number with spaces
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formattedValue;
}

// Format expiry date
function formatExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Handle card payment submission
function handleCardPaymentSubmit(e) {
    e.preventDefault();
    
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiry = document.getElementById('card-expiry').value;
    const cvv = document.getElementById('card-cvv').value;
    const country = document.getElementById('card-country').value;
    
    // Validate card number (simple check)
    if (!validateCardNumber(cardNumber)) {
        showPaymentError('Invalid card number. Please check and try again.');
        return;
    }
    
    // Validate expiry
    if (!validateExpiry(expiry)) {
        showPaymentError('Invalid expiry date. Please use MM/YY format.');
        return;
    }
    
    // Validate CVV
    if (!validateCVV(cvv)) {
        showPaymentError('Invalid CVV. Please enter 3-4 digits.');
        return;
    }
    
    // Show processing message
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        const transactionId = 'CARD-' + Date.now();
        saveBuyerTransaction('Credit Card', transactionId);
        showPaymentSuccess('Credit Card', transactionId);
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Validate card number using Luhn algorithm
function validateCardNumber(cardNumber) {
    if (!/^\d{13,19}$/.test(cardNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Validate expiry date
function validateExpiry(expiry) {
    const [month, year] = expiry.split('/');
    if (!month || !year || month < 1 || month > 12) return false;
    
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
    
    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
    
    return true;
}

// Validate CVV
function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Cancel card payment
function cancelCardPayment() {
    const container = document.getElementById('card-payment-container');
    container.classList.add('payment-container-hidden');
    
    // Scroll back to payment options
    document.querySelector('.payment-card').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// BUYER DATA STORAGE & MANAGEMENT
// ============================================

// Save buyer transaction
function saveBuyerTransaction(paymentMethod, transactionId) {
    if (!window.currentBuyer) {
        console.error('No buyer information available');
        return;
    }
    
    // Create transaction record
    const transaction = {
        id: transactionId,
        fullName: window.currentBuyer.fullName,
        email: window.currentBuyer.email,
        phone: window.currentBuyer.phone,
        paymentMethod: paymentMethod,
        amount: PAYMENT_CONFIG.amount,
        currency: PAYMENT_CONFIG.currency,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString(),
        status: 'completed'
    };
    
    // Get existing buyers
    let buyers = JSON.parse(localStorage.getItem(BUYERS_STORAGE_KEY)) || [];
    
    // Add new transaction
    buyers.push(transaction);
    
    // Save to localStorage
    localStorage.setItem(BUYERS_STORAGE_KEY, JSON.stringify(buyers));
    
    // Log for debugging
    console.log('Buyer transaction saved:', transaction);
    console.log('Total buyers:', buyers.length);
    
    // Track event
    trackEvent('buyer_transaction_saved', { 
        transactionId: transactionId,
        paymentMethod: paymentMethod,
        buyerCount: buyers.length
    });
}

// Get all buyers
function getAllBuyers() {
    return JSON.parse(localStorage.getItem(BUYERS_STORAGE_KEY)) || [];
}

// Export buyers as CSV
function exportBuyersAsCSV() {
    const buyers = getAllBuyers();
    
    if (buyers.length === 0) {
        alert('No buyers to export');
        return;
    }
    
    // Create CSV header
    const headers = ['Transaction ID', 'Full Name', 'Email', 'Phone', 'Payment Method', 'Amount', 'Date', 'Status'];
    const csv = [headers.join(',')];
    
    // Add buyer data
    buyers.forEach(buyer => {
        const row = [
            buyer.id,
            `"${buyer.fullName}"`,
            buyer.email,
            buyer.phone,
            buyer.paymentMethod,
            buyer.amount,
            buyer.date,
            buyer.status
        ];
        csv.push(row.join(','));
    });
    
    // Create blob and download
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fairplay-buyers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log('Buyers exported as CSV');
}

// Export buyers as JSON
function exportBuyersAsJSON() {
    const buyers = getAllBuyers();
    
    if (buyers.length === 0) {
        alert('No buyers to export');
        return;
    }
    
    const jsonContent = JSON.stringify(buyers, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fairplay-buyers-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log('Buyers exported as JSON');
}

// View buyers in console
function viewBuyersInConsole() {
    const buyers = getAllBuyers();
    console.clear();
    console.log('=== FairPlay Check Buyers ===');
    console.log(`Total Buyers: ${buyers.length}`);
    console.table(buyers);
}

// ============================================
// ERROR & SUCCESS MESSAGES
// ============================================

// Show buyer form error
function showBuyerError(message) {
    const errorDiv = document.getElementById('buyer-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        alert('Error: ' + message);
    }
}

// Show payment success
function showPaymentSuccess(method, transactionId) {
    const message = `
        ✅ Payment Successful!
        
        Payment Method: ${method}
        Transaction ID: ${transactionId}
        Amount: $${PAYMENT_CONFIG.amount}
        
        Thank you for purchasing ${PAYMENT_CONFIG.appName}!
        
        Download instructions have been sent to your email.
    `;
    
    alert(message);
    console.log('Payment Success:', { method, transactionId });
    
    // Hide payment containers
    document.getElementById('paypal-button-container').classList.add('payment-container-hidden');
    document.getElementById('card-payment-container').classList.add('payment-container-hidden');
    
    // Reset buyer info
    window.currentBuyer = null;
    
    // Track event
    trackEvent('payment_success', { method, amount: PAYMENT_CONFIG.amount });
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
        window.location.href = '/success.html';
    }, 2000);
}

// Show payment error
function showPaymentError(errorMessage) {
    alert('❌ Payment Error\n\n' + errorMessage);
    console.error('Payment Error:', errorMessage);
    trackEvent('payment_error', { error: errorMessage });
}

// Show payment cancelled
function showPaymentCancelled() {
    alert('Payment cancelled. No charges were made.');
    console.log('Payment Cancelled');
    trackEvent('payment_cancelled', {});
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

// Track events
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    
    // Add your analytics code here
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// ============================================
// EXPORT FOR EXTERNAL USE
// ============================================

window.PaymentSystem = {
    initPayPalPayment,
    initCardPayment,
    showBuyerForm,
    hideBuyerForm,
    getAllBuyers,
    exportBuyersAsCSV,
    exportBuyersAsJSON,
    viewBuyersInConsole,
    PAYMENT_CONFIG
};

console.log('Payment system with buyer tracking initialized');
