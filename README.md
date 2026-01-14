# PsyCare API – cURL Examples

---

## **1️⃣ Admin Login**

```bash
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@example.com",
  "password": "admin"
}'
```

**Response:** JWT token (save it for Authorization header in next requests)

---

## **2️⃣ Therapist Registration**

```bash
curl -X POST http://localhost:8080/api/therapist/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Ana",
  "surname": "Popescu",
  "email": "ana.therapist@example.com",
  "password": "123456",
  "phone": "0712345678",
  "age": 30,
  "licenseNumber": "CPR-12345"
}'
```

**Response:** Therapist object (enabled=false, approved=false)

---

## **3️⃣ Get Pending Therapists (Admin)**

```bash
curl -X GET http://localhost:8080/api/admin/therapists/pending \
-H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

**Response:** List of therapists pending approval

```json
[
  {
    "id": 1,
    "name": "Ana",
    "surname": "Popescu",
    "email": "ana.therapist@example.com",
    "enabled": false,
    "approved": false,
    "phone": "0712345678",
    "age": 30,
    "licenseNumber": "CPR-12345"
  }
]
```

---

## **4️⃣ Approve Therapist (Admin)**

```bash
curl -X PATCH http://localhost:8080/api/admin/approve/ana.therapist@example.com \
-H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

**Response:** Updated therapist object

```json
{
  "id": 1,
  "name": "Ana",
  "surname": "Popescu",
  "email": "ana.therapist@example.com",
  "enabled": true,
  "approved": true,
  "phone": "0712345678",
  "age": 30,
  "licenseNumber": "CPR-12345"
}
```

---

## **5️⃣ Therapist Login (After Approval)**

```bash
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "ana.therapist@example.com",
  "password": "123456"
}'
```

**Response:** JWT token for therapist

---

### **⚡ Notes for Frontend Developers**

1. **JWT Authorization** is required for all protected endpoints (`/api/admin/**`, `/api/therapist/**`, `/api/patients/**`).
2. Always include the header:

```
Authorization: Bearer <JWT_TOKEN>
```

3. Admin **must approve therapists** before they can log in.
4. Patients can register and log in immediately.
5. Use `/api/admin/therapists/pending` to show the admin dashboard of unapproved therapists.

Sure! Here’s a **shorter, clearer version** of your README part, with **cURL examples** and the logic summarized:

---

# 🧠 PsyCare – Patient Invite & Registration (Frontend Guide)

Patients **cannot self-register**; they join via therapist invitations.

---

## 1️⃣ Therapist Invites Patient

**POST /api/patients/invite**
Requires **therapist JWT**.

**cURL example:**

```bash
curl -X POST "http://localhost:8080/api/patients/invite?email=patient@example.com" \
  -H "Authorization: Bearer <THERAPIST_JWT>"
```

**Logic:**

* Backend creates a **one-time token** linked to the therapist
* Sends email to patient with registration link

---

## 2️⃣ Patient Registration Link

Email contains:

```
https://frontend-url/patient/register?token=<TOKEN>
```

**Logic:**

* Token is **required** and **one-time use**
* Frontend extracts token from URL, user cannot edit it

---

## 3️⃣ Patient Registration Form

**Fields to display:**

* Password & Confirm Password
* Name, Surname, Age, Phone

---

## 4️⃣ Register Patient

**POST /api/patients/register**

**cURL example:**

```bash
curl -X POST "http://localhost:8080/api/patients/register" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123",
    "password": "StrongPassword123!",
    "name": "Ana",
    "surname": "Popescu",
    "age": 28,
    "phone": "+40712345678"
  }'
```

**Logic:**

* Token is validated
* Patient is linked to therapist
* Invite is marked as **used**
* Patient account is **enabled** and role = `PATIENT`
* Invalid/used token → error

---

## 5️⃣ Frontend Handling

* Handle **expired/used tokens**
* Validate **password and personal info**
* Do not expose **token or password** in URL

---

# PsyCare Application

PsyCare is a **Spring Boot** application that uses a **PostgreSQL** database.  
This guide explains how to set up the project locally using **Docker**, configure the database connection, and connect via **IntelliJ IDEA**.

---

## Database Configuration

The application connects to a PostgreSQL database. You can configure the connection either in the `application.properties` file or using environment variables.

### Default Configuration

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/psycaredb}
spring.datasource.username=${DB_USERNAME:psycareuser}
spring.datasource.password=${DB_PASSWORD:psypass}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
````

**Default Values Explained:**

| Variable    | Default Value                                | Description             |
| ----------- | -------------------------------------------- | ----------------------- |
| DB_URL      | `jdbc:postgresql://localhost:5432/psycaredb` | PostgreSQL database URL |
| DB_USERNAME | `psycareuser`                                | Database username       |
| DB_PASSWORD | `psypass`                                    | Database password       |

You can override these defaults with environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/psycaredb
export DB_USERNAME=psycareuser
export DB_PASSWORD=psypass
```

---

## Running PostgreSQL with Docker

We provide a `docker-compose.yml` to quickly start a PostgreSQL container for development.

### docker-compose.yml

### Steps to Run

1. Make sure **Docker** is installed and running on your machine.
2. Navigate to the folder containing the `docker-compose.yml` file.
3. Start PostgreSQL:

```bash
docker-compose up -d
```

4. Verify that the container is running:

```bash
docker ps
```

5. Database is now accessible at `localhost:5432` with the following credentials:

| Parameter | Value       |
| --------- | ----------- |
| Database  | psycaredb   |
| Username  | psycareuser |
| Password  | psypass     |
| Host      | localhost   |
| Port      | 5432        |

---

## Connecting IntelliJ IDEA to PostgreSQL

IntelliJ IDEA allows you to browse database tables and run queries directly from the IDE.

### Steps:

1. Open IntelliJ IDEA → **View → Tool Windows → Database**.
2. Click the **+** icon → **Data Source → PostgreSQL**.
3. Enter the connection details:

| Field    | Value       |
| -------- | ----------- |
| Host     | localhost   |
| Port     | 5432        |
| Database | psycaredb   |
| User     | psycareuser |
| Password | psypass     |

4. Click **Test Connection** → **OK** to save.
5. You can now browse tables and run queries directly from IntelliJ.

