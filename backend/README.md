/**
 * FARMER CROP SELLING PLATFORM - API DOCUMENTATION
 * 
 * BASE URL: http://localhost:8080/api
 * 
 * AUTHENTICATION ENDPOINTS:
 * 
 * POST /auth/register - Register new user
 * Request Body:
 * {
 *   "name": "John Farmer",
 *   "email": "john@farmer.com",
 *   "contact": "1234567890",
 *   "password": "password123",
 *   "role": "FARMER" // FARMER, GOVERNMENT_OFFICIAL, INDUSTRIALIST, ADMIN
 * }
 * 
 * POST /auth/login - User login
 * Request Body:
 * {
 *   "email": "john@farmer.com",
 *   "password": "password123"
 * }
 * Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "type": "Bearer",
 *     "user": {
 *       "id": 1,
 *       "name": "John Farmer",
 *       "email": "john@farmer.com",
 *       "contact": "1234567890",
 *       "role": "FARMER",
 *       "createdAt": "2024-01-01T10:00:00"
 *     }
 *   }
 * }
 * 
 * FARMER ENDPOINTS (Requires FARMER role):
 * Headers: Authorization: Bearer <token>
 * 
 * POST /farmer/crops - Add new crop
 * Request Body:
 * {
 *   "name": "Rice",
 *   "description": "High quality basmati rice",
 *   "quantity": 1000.50,
 *   "price": 45.75
 * }
 * 
 * GET /farmer/crops - Get farmer's own crops
 * 
 * PUT /farmer/crops/{id} - Update crop
 * 
 * DELETE /farmer/crops/{id} - Delete crop
 * 
 * GET /farmer/sales - Get sales history for farmer's crops
 * 
 * BUYER ENDPOINTS (Requires GOVERNMENT_OFFICIAL or INDUSTRIALIST role):
 * Headers: Authorization: Bearer <token>
 * 
 * GET /buyer/crops - View all available crops
 * 
 * GET /buyer/crops/{id} - Get specific crop details
 * 
 * POST /buyer/purchase - Create purchase request
 * Request Body:
 * {
 *   "cropId": 1,
 *   "quantity": 100.50
 * }
 * 
 * GET /buyer/purchases - Get buyer's purchase history
 * 
 * ADMIN ENDPOINTS (Requires ADMIN role):
 * Headers: Authorization: Bearer <token>
 * 
 * GET /admin/users - Get all users
 * GET /admin/users/{id} - Get user by ID
 * GET /admin/users/role/{role} - Get users by role
 * DELETE /admin/users/{id} - Delete user
 * 
 * GET /admin/crops - Get all crops
 * DELETE /admin/crops/{id} - Delete crop
 * 
 * GET /admin/purchases - Get all purchases
 * 
 * PUBLIC ENDPOINTS (No authentication required):
 * 
 * GET /public/crops - View all crops (read-only)
 * GET /public/health - Health check
 * 
 * ERROR RESPONSES:
 * All endpoints return standardized error responses:
 * {
 *   "success": false,
 *   "message": "Error description",
 *   "data": null // or error details for validation errors
 * }
 * 
 * HTTP STATUS CODES:
 * 200 - Success
 * 201 - Created
 * 400 - Bad Request (validation errors)
 * 401 - Unauthorized (invalid credentials)
 * 403 - Forbidden (insufficient permissions)
 * 404 - Not Found
 * 409 - Conflict (user already exists)
 * 500 - Internal Server Error
 */