# 🌾 FarmaTech - Digital Crop Marketplace

<div align="center">

![FarmaTech Logo](https://img.shields.io/badge/FarmaTech-Agriculture%20Platform-green?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A modern full-stack platform connecting farmers directly with government officials and industrialists for transparent crop trading**

[Features](#-features) • [Tech Stack](#-technology-stack) • [Installation](#-installation--setup) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

FarmaTech is a comprehensive digital marketplace designed to revolutionize agricultural commerce by creating a direct bridge between farmers and institutional buyers. The platform eliminates intermediaries, ensures fair pricing, and provides complete transparency in crop transactions.

### 🎯 Problem Statement

Traditional agricultural supply chains involve multiple intermediaries, leading to:
- Reduced profits for farmers
- Increased costs for buyers
- Lack of transparency in pricing
- Limited market access for small farmers
- Inefficient communication channels

### 💡 Solution

FarmaTech provides a secure, role-based platform where:
- Farmers can list their crops with complete details
- Government officials and industrialists can browse and purchase directly
- Administrators can oversee and manage the entire ecosystem
- All transactions are tracked and transparent

---

## ✨ Features

### 👨‍🌾 For Farmers
- ✅ **Crop Management**: Add, edit, and delete crop listings with details (name, quantity, price, description)
- ✅ **Sales Dashboard**: Real-time tracking of sales and transaction history
- ✅ **Direct Contact**: Connect directly with verified buyers
- ✅ **Inventory Control**: Automatic quantity updates after sales
- ✅ **Performance Analytics**: View sales trends and crop performance

### 🏛️ For Buyers (Government Officials & Industrialists)
- ✅ **Crop Browsing**: Search and filter available crops by various parameters
- ✅ **Detailed Information**: Access complete crop details and farmer contact information
- ✅ **Direct Purchase**: Seamless purchasing workflow with quantity validation
- ✅ **Purchase History**: Track all past transactions and orders
- ✅ **Advanced Search**: Find specific crops quickly with intelligent search

### 👨‍💼 For Administrators
- ✅ **User Management**: Complete control over user accounts and roles
- ✅ **Content Moderation**: Manage crop listings and ensure platform quality
- ✅ **Analytics Dashboard**: System-wide statistics and insights
- ✅ **Transaction Monitoring**: Oversight of all platform transactions
- ✅ **Platform Health**: Monitor system performance and user activity

### 🔐 Security Features
- JWT-based authentication and authorization
- Role-based access control (RBAC)
- Password encryption with BCrypt
- Protected API endpoints
- Secure session management
- CORS configuration for safe cross-origin requests

### 🎨 User Experience
- Responsive design for all devices (mobile, tablet, desktop)
- Intuitive user interface with modern design
- Real-time notifications with toast messages
- Loading states and error handling
- Confirmation dialogs for critical actions
- Smooth navigation with React Router

---

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.1.0 | Application Framework |
| Spring Security | 3.1.0 | Authentication & Authorization |
| Spring Data JPA | 3.1.0 | Database ORM |
| Hibernate | 6.2.0 | JPA Implementation |
| MySQL | 8.0 | Relational Database |
| JWT | 0.11.5 | Token-based Authentication |
| Maven | 3.6+ | Dependency Management |
| Lombok | Latest | Boilerplate Code Reduction |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.11.0 | Client-side Routing |
| Axios | 1.4.0 | HTTP Client |
| React Toastify | 9.1.3 | Notifications |
| Lucide React | 0.263.1 | Icon Library |
| Date-fns | 2.30.0 | Date Formatting |
| CSS3 | - | Styling |

### DevOps & Tools
- Docker & Docker Compose for containerization
- Git for version control
- VS Code / IntelliJ IDEA for development
- Postman for API testing
- MySQL Workbench for database management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 17 or higher
- **Node.js** 16 or higher
- **MySQL** 8.0 or higher
- **Maven** 3.6 or higher
- **Git** for version control
- **Postman** (optional, for API testing)

### Verify Installation

```bash
# Check Java version
java -version

# Check Node.js version
node --version

# Check Maven version
mvn --version

# Check MySQL version
mysql --version

# Check Git version
git --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/farmatech.git
cd farmatech
```

### 2. Database Setup

Create MySQL database:

```sql
CREATE DATABASE farmer_platform;
```

The application uses Hibernate with `ddl-auto=update`, so tables will be created automatically on first run.

### 3. Backend Configuration

Navigate to backend directory:

```bash
cd backend
```

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/farmer_platform
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

# JWT Configuration
jwt.secret=YOUR_SECRET_KEY_HERE_MIN_32_CHARACTERS
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

**Important:** Replace placeholders with your actual configuration values.

### 4. Run Backend

```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# The backend will start on http://localhost:8080
```

### 5. Frontend Configuration

Navigate to frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=FarmaTech
REACT_APP_VERSION=1.0.0
```

### 6. Run Frontend

```bash
npm start

# The frontend will start on http://localhost:3000
# Browser will open automatically
```

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Services
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **MySQL**: localhost:3306

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Farmer",
  "email": "farmer@example.com",
  "contact": "9876543210",
  "password": "password123",
  "role": "FARMER"
}
```

**Roles:** `FARMER`, `GOVERNMENT_OFFICIAL`, `INDUSTRIALIST`, `ADMIN`

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "user": { ... }
  }
}
```

### Farmer Endpoints

All farmer endpoints require authentication with `FARMER` role.

```http
# Get farmer's crops
GET /farmer/crops
Authorization: Bearer {token}

# Add new crop
POST /farmer/crops
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Basmati Rice",
  "description": "Premium quality basmati rice",
  "quantity": 1000.0,
  "price": 85.50
}

# Update crop
PUT /farmer/crops/{id}
Authorization: Bearer {token}

# Delete crop
DELETE /farmer/crops/{id}
Authorization: Bearer {token}

# Get sales history
GET /farmer/sales
Authorization: Bearer {token}
```

### Buyer Endpoints

Require `GOVERNMENT_OFFICIAL` or `INDUSTRIALIST` role.

```http
# Browse all crops
GET /buyer/crops
Authorization: Bearer {token}

# Get crop details
GET /buyer/crops/{id}
Authorization: Bearer {token}

# Purchase crop
POST /buyer/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "cropId": 1,
  "quantity": 50.0
}

# Get purchase history
GET /buyer/purchases
Authorization: Bearer {token}
```

### Admin Endpoints

Require `ADMIN` role.

```http
# Get all users
GET /admin/users
Authorization: Bearer {token}

# Get users by role
GET /admin/users/role/{role}
Authorization: Bearer {token}

# Delete user
DELETE /admin/users/{id}
Authorization: Bearer {token}

# Get all crops
GET /admin/crops
Authorization: Bearer {token}

# Delete crop
DELETE /admin/crops/{id}
Authorization: Bearer {token}

# Get all purchases
GET /admin/purchases
Authorization: Bearer {token}
```

### Public Endpoints

No authentication required.

```http
# Browse crops (read-only)
GET /public/crops

# Health check
GET /public/health
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

---

## 🏗️ Project Structure

```
farmatech/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/farmerplatform/
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── exception/        # Custom Exceptions
│   │   │   │   ├── repository/       # Data Repositories
│   │   │   │   ├── security/         # Security Configuration
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   └── FarmerPlatformApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Unit Tests
│   ├── pom.xml                       # Maven Dependencies
│   └── Dockerfile
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/               # Reusable Components
│   │   │   ├── common/               # Header, Footer, etc.
│   │   │   ├── farmer/               # Farmer components
│   │   │   ├── buyer/                # Buyer components
│   │   │   └── admin/                # Admin components
│   │   ├── pages/                    # Page Components
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── FarmerDashboard.js
│   │   │   ├── BuyerDashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── CropDetailsPage.js
│   │   ├── services/                 # API Services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── cropService.js
│   │   │   ├── purchaseService.js
│   │   │   └── userService.js
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.js
│   │   ├── utils/                    # Utility Functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validation.js
│   │   ├── styles/                   # CSS Styles
│   │   │   └── index.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── Dockerfile
│
├── docker-compose.yml                # Docker Compose Configuration
├── .gitignore
└── README.md
```

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report

# Run specific test
mvn test -Dtest=UserServiceTest
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm test -- --coverage --watchAll=false
```

### Manual Testing with Postman

1. Import the Postman collection (if provided)
2. Set environment variables:
   - `base_url`: `http://localhost:8080/api`
   - `token`: JWT token from login
3. Test all endpoints systematically

### Test User Accounts

Create these test accounts for different roles:

**Farmer:**
```bash
Email: farmer@test.com
Password: password123
```

**Government Official:**
```bash
Email: gov@test.com
Password: password123
```

**Industrialist:**
```bash
Email: industry@test.com
Password: password123
```

**Admin:** (Create via Postman POST /auth/register with role: "ADMIN")

---

## 🔒 Security Considerations

### Current Implementation
- JWT tokens with 24-hour expiration
- BCrypt password hashing
- Role-based access control (RBAC)
- CORS configuration
- Input validation on all forms
- SQL injection prevention via JPA
- XSS protection through React

### Production Recommendations
- Use HTTPS/TLS for all connections
- Store JWT secret in environment variables
- Implement refresh tokens
- Add rate limiting to prevent brute force attacks
- Enable CSRF protection for state-changing operations
- Use secure cookies for token storage (httpOnly, secure flags)
- Implement account lockout after failed login attempts
- Add two-factor authentication (2FA)
- Regular security audits and dependency updates
- Set up monitoring and logging for suspicious activities

---

## 🚀 Deployment

### Production Deployment Checklist

- [ ] Update `application.properties` with production database credentials
- [ ] Change JWT secret to a strong, unique value
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (not `update`)
- [ ] Enable HTTPS
- [ ] Configure production CORS origins
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring (e.g., Prometheus, Grafana)
- [ ] Enable application performance monitoring
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables properly
- [ ] Review and harden security settings

### Deployment Options

**Option 1: Cloud Platforms (Recommended)**
- AWS (EC2, RDS, S3)
- Google Cloud Platform
- Microsoft Azure
- Heroku (with ClearDB MySQL)
- DigitalOcean

**Option 2: Docker Deployment**
```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d
```

**Option 3: Traditional Server**
- Deploy JAR file to application server
- Serve React build through Nginx/Apache
- MySQL on dedicated database server

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('FARMER', 'GOVERNMENT_OFFICIAL', 'INDUSTRIALIST', 'ADMIN'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Crops Table
```sql
CREATE TABLE crops (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    farmer_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Purchases Table
```sql
CREATE TABLE purchases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    crop_id BIGINT NOT NULL,
    buyer_id BIGINT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Keep PRs focused on a single feature/fix

---

## 🐛 Known Issues & Limitations

### Current Limitations
- File upload for crop images not yet implemented
- No email notification system
- Payment gateway integration pending
- Limited search and filter options
- No multi-language support
- Mobile app not available yet

### Planned Features
- [ ] Crop image upload functionality
- [ ] Email notifications for purchases
- [ ] SMS alerts for farmers
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Multi-language support (Hindi, English, regional languages)
- [ ] Mobile application (React Native)
- [ ] Crop recommendations based on location and season
- [ ] Weather integration
- [ ] Price trend analysis
- [ ] Farmer verification system
- [ ] Rating and review system
- [ ] Chat functionality between buyers and farmers

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

### Technologies & Libraries
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [React](https://reactjs.org/) - Frontend library
- [MySQL](https://www.mysql.com/) - Database
- [JWT](https://jwt.io/) - Authentication
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

### Inspiration & Resources
- Spring Boot Documentation
- React Documentation
- Stack Overflow Community
- GitHub Open Source Community

### Special Thanks
- To all open-source contributors
- The amazing developer community
- Everyone who provided feedback and suggestions

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/farmatech/issues)
2. **Create new issue**: Provide detailed description with steps to reproduce
3. **Email**: your.email@example.com

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/farmatech?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/farmatech?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/farmatech?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/farmatech)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YOUR_USERNAME/farmatech)
![GitHub last commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/farmatech)

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

**Made with ❤️ for the farming community**

[Report Bug](https://github.com/YOUR_USERNAME/farmatech/issues) • [Request Feature](https://github.com/YOUR_USERNAME/farmatech/issues) • [View Demo](https://your-demo-link.com)

</div>