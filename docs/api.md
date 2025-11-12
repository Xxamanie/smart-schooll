# API Documentation

## Authentication

### Login
- **POST** `/auth/login`
- **Body**: 
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "teacher" | "student" | "parent"
  }
}
```

### Register
- **POST** `/auth/register`
- **Body**:
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "role": "admin" | "teacher" | "student" | "parent"
}
```

## User Management

### Get User Profile
- **GET** `/users/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "string"
}
```

### Update User Profile
- **PUT** `/users/me`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "name": "string",
  "email": "string"
}
```

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": { ... }
}
```

### 401 Unauthorized
```json
{
  "error": "AUTH_ERROR",
  "message": "Authentication failed"
}
```

### 403 Forbidden
```json
{
  "error": "AUTH_ERROR",
  "message": "Insufficient permissions"
}
```

### 500 Server Error
```json
{
  "error": "SERVER_ERROR",
  "message": "Internal server error"
}
```