# Payment Issue Troubleshooting Guide

## Current Status
✅ Backend server running on port 5000
✅ MongoDB connected successfully  
✅ Test customer exists: musa@gmail.com

## Common Issues & Solutions

### Issue 1: "Unable to process payment"
This generic error comes from the catch block, meaning the API request failed.

**Possible Causes:**
1. Network/CORS error
2. Token not properly set
3. Validation errors
4. Backend server not running

### Testing Steps

#### 1. Check Browser Console
Open Developer Tools (F12) and check Console tab for:
- API request errors
- Token exists message
- Response status codes

#### 2. Check Network Tab
In Developer Tools > Network tab:
- Look for `/api/bookings` request
- Check if it's red (error) or green (success)
- Click on it to see request headers and response

#### 3. Test with existing user
**Email:** musa@gmail.com
**Password:** (whatever password was set during signup)

### Debug Steps Added

I've added console logging to help debug:

**Frontend (PaymentPage.jsx):**
```javascript
console.log('Starting payment process...');
console.log('Token exists:', !!token);
console.log('API Base:', API_BASE);
console.log('Booking data:', booking);
console.log('Booking API Response:', response.status, data);
```

**Backend (bookingController.js):**
```javascript
console.log('Creating booking for user:', req.user?.id);
console.log('Request body:', req.body);
console.log('Booking created:', booking._id, booking.bookingReference);
```

### How to Test the Full Flow

1. **Open Browser Console** (F12)

2. **Navigate to Home Page**
   - http://localhost:5173

3. **Fill Booking Form:**
   - From: New York
   - To: Los Angeles  
   - Date: Tomorrow
   - Time: Any time
   - Click "Search"

4. **Select Vehicle**
   - Choose "Business Class"
   - Click "Continue"

5. **Fill Passenger Info:**
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +1234567890
   - Click "Continue to Login"

6. **Login:**
   - Email: musa@gmail.com
   - Password: (your password)
   - Click "Login"

7. **Check Console Output:**
   - Should see "Starting payment process..."
   - Should see "Token exists: true"
   - Should see booking data

8. **Fill Payment Form:**
   - Card Number: 4242 4242 4242 4242
   - Name: Test User
   - Expiry: 12/25
   - CVV: 123
   - Fill billing address
   - Check terms checkbox
   - Click "Pay"

9. **Watch Console:**
   - Look for errors
   - Check backend terminal for logs

### Expected Console Output

**Frontend:**
```
Starting payment process...
Token exists: true
API Base: http://localhost:5000
Booking data: {from: "New York", to: "Los Angeles", ...}
Booking API Response: 201 {success: true, booking: {...}}
Booking created successfully: {id: "...", bookingReference: "BK-..."}
```

**Backend Terminal:**
```
Creating booking for user: [user_id]
Request body: {...}
Booking created: [booking_id] BK-XXXXX-XXXX
```

### Common Errors & Fixes

#### Error: "Not authorized to access this route"
**Cause:** Token not sent or invalid
**Fix:** 
- Check if user is logged in
- Verify token exists in localStorage/sessionStorage
- Try logging in again

#### Error: "Validation error"
**Cause:** Missing required fields
**Fix:**
- Check booking data has all required fields
- Verify passengerInfo is complete
- Ensure date/time format is correct

#### Error: "User not found"
**Cause:** Token has invalid user ID
**Fix:**
- Clear localStorage/sessionStorage
- Login again

#### Error: Network Failed / CORS
**Cause:** Backend not running or CORS not configured
**Fix:**
- Verify backend is running: `http://localhost:5000`
- Check CORS is enabled in backend/server.js (it is)

### Quick Fix Commands

**Restart Backend:**
```powershell
Stop-Process -Name node -Force
cd backend
node server.js
```

**Check if Backend is Running:**
```powershell
curl http://localhost:5000
```
Should return: `{"message":"Sher Khan Limousine API is running"}`

**Check MongoDB:**
```powershell
Get-Process mongod
```

### Manual API Test

You can test the API directly using PowerShell:

```powershell
# 1. Login
$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body (@{
  email = "musa@gmail.com"
  password = "your_password"
} | ConvertTo-Json) -ContentType "application/json"

$token = $loginResponse.token
Write-Host "Token: $token"

# 2. Create Booking
$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
}

$booking = @{
  rideType = "one-way"
  pickupLocation = @{
    address = "New York"
  }
  dropoffLocation = @{
    address = "Los Angeles"
  }
  pickupDate = "2025-11-25"
  pickupTime = "14:00"
  vehicleClass = @{
    id = "business"
    name = "Business Class"
  }
  passengerInfo = @{
    firstName = "Test"
    lastName = "User"
    email = "test@example.com"
    phone = "+1234567890"
  }
  basePrice = 269.86
  totalPrice = 269.86
}

$bookingResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/bookings" -Method POST -Headers $headers -Body ($booking | ConvertTo-Json -Depth 10)

Write-Host "Booking Reference: $($bookingResponse.booking.bookingReference)"
```

### Next Steps

1. **Try the flow** with console open
2. **Screenshot any errors** you see
3. **Check backend terminal** for error logs
4. **Share the console output** if issue persists

The system is fully functional - just need to identify which specific error is occurring!
