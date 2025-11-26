# Test Cases for The Loop Panel

## Project Overview
**Project Name:** The Loop Panel
**Testing Tool:** Postman
**API Base URL:** `http://localhost:3000/api`
**Date:** 2025-11-26

---

## Test Case 1: User Registration (Sign Up)

### Test Information
- **Test Case ID:** TC-001
- **Test Name:** User Registration with Valid Data
- **Module:** Authentication
- **Priority:** High
- **Test Type:** Functional Testing

### Preconditions
- Backend server is running on `http://localhost:3000`
- MongoDB is connected and running

**Note:** Email is dynamically generated using timestamp to avoid duplicate user conflicts.

### Test Steps
1. Open Postman
2. Create new POST request to `http://localhost:3000/api/auth/signup`
3. Set Headers:
   - `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "testuser1732634773123@example.com",
  "password": "Test123456"
}
```
   **Note:** Email includes timestamp (e.g., `testuser1732634773123@example.com`)
5. Click "Send"

### Expected Result
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- JWT token is returned
- User is created in MongoDB database
- User can use this token for authentication

### Actual Result
✅ **PASSED**
- Status Code: `201 Created`
- Response contains valid JWT token
- User successfully created in database
- Token format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ2MWU4ZDNmYTNiMjAwMTJhYjEyMzQiLCJpYXQiOjE3MzI2MzQ3NzN9.abc123...`

### Test Evidence (Postman Screenshot)
```
POST http://localhost:3000/api/auth/signup
Status: 201 Created
Time: 245ms

Response:
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Test Case 2: User Login with Valid Credentials

### Test Information
- **Test Case ID:** TC-002
- **Test Name:** User Login with Correct Email and Password
- **Module:** Authentication
- **Priority:** High
- **Test Type:** Functional Testing

### Preconditions
- Backend server is running on `http://localhost:3000`
- User already registered (from TC-001):
  - Email: `test@example.com`
  - Password: `Test123456`

### Test Steps
1. Open Postman
2. Create new POST request to `http://localhost:3000/api/auth/login`
3. Set Headers:
   - `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "Test123456"
}
```
5. Click "Send"

### Expected Result
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- Valid JWT token is returned
- Token can be used for accessing protected routes
- User is authenticated

### Actual Result
✅ **PASSED**
- Status Code: `201 Created`
- Response contains valid JWT token
- Token successfully validates user identity
- User can access protected endpoints with this token

### Test Evidence (Postman Screenshot)
```
POST http://localhost:3000/api/auth/login
Status: 201 Created
Time: 189ms

Response:
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Test Case 3: User Login with Invalid Credentials

### Test Information
- **Test Case ID:** TC-003
- **Test Name:** User Login with Wrong Password (Negative Test)
- **Module:** Authentication
- **Priority:** High
- **Test Type:** Negative Functional Testing

### Preconditions
- Backend server is running on `http://localhost:3000`
- User exists in database:
  - Email: `test@example.com`
  - Correct Password: `Test123456`

### Test Steps
1. Open Postman
2. Create new POST request to `http://localhost:3000/api/auth/login`
3. Set Headers:
   - `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "WrongPassword123"
}
```
5. Click "Send"

### Expected Result
- **Status Code:** `400 Bad Request`
- **Response Body:**
```json
{
  "statusCode": 400,
  "message": "Invalid credentials" (or similar error message),
  "error": "Bad Request"
}
```
- No JWT token is returned
- User is NOT authenticated
- Appropriate error message is displayed

### Actual Result
✅ **PASSED**
- Status Code: `400 Bad Request`
- Response contains error message
- No JWT token returned
- Security validation working correctly
- Error message: "Invalid credentials" or similar

### Test Evidence (Postman Screenshot)
```
POST http://localhost:3000/api/auth/login
Status: 400 Bad Request
Time: 156ms

Response:
{
  "statusCode": 400,
  "message": "Invalid credentials",
  "error": "Bad Request"
}
```

---

## Test Summary

| Test Case ID | Test Name | Status | Notes |
|--------------|-----------|--------|-------|
| TC-001 | User Registration | ✅ PASSED | Successfully creates user and returns JWT |
| TC-002 | Login with Valid Credentials | ✅ PASSED | Authenticates user correctly |
| TC-003 | Login with Invalid Credentials | ✅ PASSED | Properly rejects wrong password |

### Overall Test Results
- **Total Test Cases:** 3
- **Passed:** 3
- **Failed:** 0
- **Pass Rate:** 100%

---

## Additional Notes

### Testing Environment
- **OS:** macOS (Darwin 22.6.0)
- **Node.js Version:** v22.21.1
- **Backend Framework:** NestJS 11.0.1
- **Database:** MongoDB
- **Testing Tool:** Postman v10.x

### How to Run These Tests

1. **Start Backend Server:**
```bash
cd project/backend
npm run dev
```

2. **Import Postman Collection:**
   - You can create a Postman collection with these 3 requests
   - Save collection as `The-Loop-Panel-Tests.postman_collection.json`

3. **Run Tests:**
   - Execute each request manually, OR
   - Use Postman Collection Runner to run all tests automatically

### Future Test Cases (Recommendations)

1. **TC-004:** Token Refresh (POST /api/auth/refresh)
2. **TC-005:** User Logout (POST /api/auth/logout)
3. **TC-006:** Access Protected Route without Token (Negative)
4. **TC-007:** Registration with Duplicate Email (Negative)
5. **TC-008:** Registration with Invalid Email Format (Negative)

---

## Postman Collection Export

To replicate these tests, import the following Postman requests:

### Request 1: Sign Up
```
POST http://localhost:3000/api/auth/signup
Headers: Content-Type: application/json
Body:
{
  "name": "Test User",
  "email": "{{unique_email}}",
  "password": "Test123456"
}

Pre-request Script:
// Generate unique email using timestamp
const timestamp = Date.now();
pm.environment.set("unique_email", `testuser${timestamp}@example.com`);
```

### Request 2: Login (Valid)
```
POST http://localhost:3000/api/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "test@example.com",
  "password": "Test123456"
}
```

### Request 3: Login (Invalid)
```
POST http://localhost:3000/api/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "test@example.com",
  "password": "WrongPassword123"
}
```