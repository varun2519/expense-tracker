# Expense Tracker (Full Stack)

Spring Boot + Spring Data JPA + MySQL backend with a React front-end.
Provides expense management, category management, monthly reports, pagination/sorting/filtering,
and is containerized with Docker for deployment (e.g. AWS EC2).

## Stack
- Backend: Java 8, Spring Boot 2.7, Spring Data JPA (Hibernate), MySQL, Bean Validation
- Frontend: React 18 (hooks), Axios
- Infra: Docker, Docker Compose, Nginx (for serving the built frontend)

## Project structure
```
expense-tracker/
├── backend/     Spring Boot REST API
├── frontend/    React app
└── docker-compose.yml
```

## Run everything with Docker Compose (recommended)
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- MySQL: localhost:3306 (db: expense_tracker, user: root, password: root)

## Run locally without Docker

### 1. MySQL
Create a database:
```sql
CREATE DATABASE expense_tracker;
```

### 2. Backend
```bash
cd backend
# set DB_USERNAME / DB_PASSWORD env vars if different from root/root
mvn spring-boot:run
```
Runs on http://localhost:8080. Tables are auto-created by Hibernate (`ddl-auto=update`).

### 3. Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000 and calls the backend at `http://localhost:8080/api`
(override with a `REACT_APP_API_URL` env var / `.env` file).

## API Endpoints

### Categories
| Method | Path                  | Description        |
|--------|-----------------------|---------------------|
| GET    | /api/categories        | List all categories |
| GET    | /api/categories/{id}   | Get one category    |
| POST   | /api/categories        | Create a category   |
| PUT    | /api/categories/{id}   | Update a category   |
| DELETE | /api/categories/{id}   | Delete a category   |

### Expenses
| Method | Path                | Description                                                                 |
|--------|----------------------|-------------------------------------------------------------------------------|
| GET    | /api/expenses         | Paginated list. Query params: `page`, `size`, `sort`, `categoryId`, `from`, `to`, `minAmount`, `maxAmount`, `keyword` |
| GET    | /api/expenses/{id}     | Get one expense                                                              |
| POST   | /api/expenses          | Create an expense                                                            |
| PUT    | /api/expenses/{id}     | Update an expense                                                            |
| DELETE | /api/expenses/{id}     | Delete an expense                                                            |

Example:
```
GET /api/expenses?page=0&size=10&sort=amount,desc&categoryId=2&from=2026-09-01&to=2026-09-30&keyword=uber
```

### Reports
| Method | Path                  | Description                                              |
|--------|------------------------|------------------------------------------------------------|
| GET    | /api/reports/monthly    | `year` & `month` query params (defaults to current month). Returns total + per-category breakdown. |

## Deploying to AWS EC2
1. Install Docker + Docker Compose on the EC2 instance.
2. Copy this project to the instance (`scp` or `git clone`).
3. Open ports 3000 (frontend), 8080 (backend, optional if only frontend is public), and 22 in the security group.
4. Run `docker-compose up -d --build`.
5. Point the frontend's `REACT_APP_API_URL` build arg at the instance's public IP/domain if the API needs to be reached from outside.

## Notes
- Filtering/sorting/pagination is implemented with Spring Data JPA `Specification` + `Pageable`.
- The monthly report uses a custom JPQL aggregation query (`GROUP BY` + `SUM`).
- Validation errors and 404s are handled centrally via `@RestControllerAdvice`.
