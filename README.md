# PsyCare Backend Entities Overview

This document explains the main entities in the PsyCare backend, their fields, and relationships. It is intended to help the frontend team understand how data is structured and how to interact with it via APIs.

---

## **1. User**

The `User` entity is the **base class** for all types of users in the system. It contains common fields shared by patients, therapists, and potentially other user types in the future.

**Table:** `users` (root table in the database)

**Fields:**

| Field     | Type       | Description                                      |
|-----------|------------|--------------------------------------------------|
| `id`      | Long       | Unique identifier for the user                  |
| `email`   | String     | User’s email (must be unique)                   |
| `password`| String     | User’s password (hashed)                         |
| `role`    | Enum       | User role (`PATIENT` or `THERAPIST`)            |
| `name`    | String     | Optional first name                              |
| `surname` | String     | Optional last name                               |
| `age`     | Integer    | Optional age                                     |
| `phone`   | String     | Optional phone number                             |

**Notes:**

- `User` is a **parent class** using **JOINED inheritance**.
- All common fields are stored in the `users` table.
- Subclasses have their own tables for type-specific fields.

---

## **2. Therapist**

The `Therapist` entity extends `User` and represents a therapist in the system.

**Table:** `therapists` (stores therapist-specific data)

**Fields:**

| Field      | Type          | Description                                        |
|------------|---------------|--------------------------------------------------|
| `approved` | Boolean       | Indicates if the therapist is approved           |
| `patients` | List<Patient> | List of patients assigned to this therapist      |

**Relationships:**

- `One-to-Many` with `Patient` (a therapist can have multiple patients).
- Managed by `Patient.therapist` field.

**Notes for Frontend:**

- When fetching a therapist, you can also get the list of assigned patients.
- `approved` indicates if the therapist is verified and can provide sessions.

---

## **3. Patient**

The `Patient` entity extends `User` and represents a patient in the system.

**Table:** `patients` (stores patient-specific data)

**Fields:**

| Field       | Type       | Description                           |
|-------------|------------|---------------------------------------|
| `therapist` | Therapist  | The therapist assigned to this patient |

**Relationships:**

- `Many-to-One` with `Therapist` (each patient is assigned **one therapist**).

**Notes for Frontend:**

- When fetching a patient, you can also retrieve their therapist.
- The `therapist_id` foreign key links the patient to a therapist.

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

