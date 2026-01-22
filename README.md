# 🌾 FarmaTech - Digital Crop Marketplace

A full-stack web application that enables farmers to sell crops directly to institutional buyers without middlemen.

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
- Farmers can list crops with price and quantity
- Buyers (government officials / industrialists) can browse and purchase crops
- Role-based authentication
- REST-based backend architecture

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
git clone https://github.com/utsav7978/FarmaTech.git
cd FarmaTech
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

## 👥 User Roles
- **Farmer** – Lists crops with price and quantity  
- **Government Official** – Browses and purchases crops  
- **Industrialist** – Purchases crops in bulk  
- **Admin** – Manages users and oversees platform activity  

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
- [ ] Payment gateway integration
- [ ] Multi-language support (Hindi, English, regional languages)
- [ ] Mobile application (React Native)

---

## 👨‍💻 Author

**Utsav Kumar Singh**

---

## 🙏 Acknowledgments
Built using Spring Boot, React, and MySQL with guidance from official documentation and the developer community.

---