# Sher Khan Limousine Backend

Express.js backend API for customer authentication and booking management.

## Features

- Customer registration (signup)
- Customer login with JWT authentication
- Protected profile routes
- Password hashing with bcryptjs
- Input validation
- MongoDB database

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sher-khan-limousine
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Make sure MongoDB is running locally or update the `MONGODB_URI` to your MongoDB Atlas connection string.

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Customer Authentication

#### Signup
- **POST** `/api/auth/signup`
- Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
- **GET** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`

#### Update Profile (Protected)
- **PUT** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`
- Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

## Response Format

Success:
```json
{
  "success": true,
  "message": "Operation successful",
  "token": "jwt_token_here",
  "customer": {
    "id": "customer_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

Error:
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### Chauffeur Authentication & Registration

#### Chauffeur Registration
- **POST** `/api/chauffeur/register`
- Content-Type: `multipart/form-data`
- Form Data:
```
name: John Doe
email: chauffeur@example.com
phone: +1234567890
address: 123 Main Street
country: United States
password: password123
confirmPassword: password123

carName: Mercedes-Benz
carModel: S-Class 2023
carNumber: ABC-1234

insuranceProvider: State Insurance Co.
policyNumber: POL123456
insuranceExpiryDate: 2025-12-31

Files:
- profilePicture: [image file]
- driverLicense: [image/pdf file]
- identityDocument: [image/pdf file]
- carPictures: [1-5 image files]
- insuranceDocument: [image/pdf file]
```

#### Chauffeur Login
- **POST** `/api/chauffeur/login`
- Body:
```json
{
  "email": "chauffeur@example.com",
  "password": "password123"
}
```
- Note: Only approved and active chauffeurs can login

#### Get Chauffeur Profile (Protected)
- **GET** `/api/chauffeur/profile`
- Headers: `Authorization: Bearer <token>`

#### Update Chauffeur Profile (Protected)
- **PUT** `/api/chauffeur/profile`
- Headers: `Authorization: Bearer <token>`
- Body:
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "address": "123 Main Street"
}
```

#### Get Application Status (Protected)
- **GET** `/api/chauffeur/status`
- Headers: `Authorization: Bearer <token>`
- Returns application status, approval status, and rejection reason if applicable

### Corporate Travel Inquiry

#### Submit Corporate Inquiry
- **POST** `/api/corporate/inquiry`
- Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "company": "ABC Corporation",
  "email": "john@company.com",
  "phone": "+1234567890",
  "country": "United States",
  "interestedIn": "Business trips",
  "message": "We need regular transportation for our executives"
}
```

#### Get All Inquiries (Admin)
- **GET** `/api/corporate/inquiries`
- Query params: `?status=pending&page=1&limit=10`

#### Get Single Inquiry (Admin)
- **GET** `/api/corporate/inquiry/:id`

#### Update Inquiry Status (Admin)
- **PUT** `/api/corporate/inquiry/:id`
- Body:
```json
{
  "status": "contacted",
  "notes": "Called and discussed requirements"
}
```

#### Delete Inquiry (Admin)
- **DELETE** `/api/corporate/inquiry/:id`

### Travel Agency Inquiry

#### Submit Travel Agency Inquiry
- **POST** `/api/travel-agency/inquiry`
- Body:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "company": "XYZ Travel Agency",
  "email": "jane@travelagency.com",
  "phone": "+1234567890",
  "country": "United States",
  "interestedIn": "Global chauffeur services",
  "message": "We need reliable chauffeur services for our clients"
}
```

#### Get All Travel Agency Inquiries (Admin)
- **GET** `/api/travel-agency/inquiries`
- Query params: `?status=pending&page=1&limit=10`

#### Get Single Travel Agency Inquiry (Admin)
- **GET** `/api/travel-agency/inquiry/:id`

#### Update Travel Agency Inquiry Status (Admin)
- **PUT** `/api/travel-agency/inquiry/:id`
- Body:
```json
{
  "status": "contacted",
  "notes": "Discussed partnership terms"
}
```

#### Delete Travel Agency Inquiry (Admin)
- **DELETE** `/api/travel-agency/inquiry/:id`

### Strategic Partnership Inquiry

#### Submit Partnership Inquiry
- **POST** `/api/partnership/inquiry`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "XYZ Corporation",
  "phone": "+1234567890",
  "partnershipType": "Aviation",
  "message": "Interested in strategic partnership"
}
```
- Partnership Types: Aviation, Cruise, Hotel, Travel Management, Technology, Other

#### Get All Partnership Inquiries (Admin)
- **GET** `/api/partnership/inquiries`
- Query params: `?status=pending&partnershipType=Aviation&page=1&limit=10`

#### Get Single Partnership Inquiry (Admin)
- **GET** `/api/partnership/inquiry/:id`

#### Update Partnership Inquiry (Admin)
- **PUT** `/api/partnership/inquiry/:id`
- Body:
```json
{
  "status": "in_discussion",
  "notes": "Initial meeting scheduled"
}
```

#### Delete Partnership Inquiry (Admin)
- **DELETE** `/api/partnership/inquiry/:id`

### Event Booking Inquiry

#### Submit Event Booking
- **POST** `/api/events/booking`
- Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "countryCode": "+1",
  "supportType": "Corporate",
  "eventType": "Conference",
  "eventDate": "2025-12-15",
  "estimatedDate": "December 2025",
  "guestCount": 50,
  "numberOfRides": 10,
  "serviceRequired": "Point-to-point",
  "comments": "Need transportation for conference attendees"
}
```
- Support Types: Corporate, Personal, Wedding, Conference, Other
- Service Types: Point-to-point, Hourly hire, Multi-day, Airport transfer

#### Get All Event Bookings (Admin)
- **GET** `/api/events/bookings`
- Query params: `?status=pending&supportType=Corporate&page=1&limit=10`

#### Get Single Event Booking (Admin)
- **GET** `/api/events/booking/:id`

#### Update Event Booking (Admin)
- **PUT** `/api/events/booking/:id`
- Body:
```json
{
  "status": "quoted",
  "notes": "Quote sent for 10 rides"
}
```
- Status: pending, contacted, quoted, confirmed, completed, cancelled

#### Delete Event Booking (Admin)
- **DELETE** `/api/events/booking/:id`

## File Upload Requirements

- **Accepted formats**: JPG, JPEG, PNG, PDF
- **Max file size**: 5MB per file
- **Required files**:
  - Profile Picture (1 file)
  - Driver License (1 file)
  - Identity Document (National ID or Passport) (1 file)
  - Car Pictures (1-5 files)
  - Insurance Document (1 file)

## Chauffeur Application Status

- **pending**: Application submitted, waiting for admin approval
- **approved**: Application approved, chauffeur can login
- **rejected**: Application rejected with reason

## Technologies

- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS enabled
- dotenv for environment variables
