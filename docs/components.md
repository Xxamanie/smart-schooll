# Component Documentation

## Authentication Components

### ProtectedRoute
A higher-order component that handles authentication and authorization.

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Basic usage
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// With role restrictions
<ProtectedRoute allowedRoles={['admin', 'teacher']}>
  <AdminDashboard />
</ProtectedRoute>
```

### WithRole
A component for conditional rendering based on user roles.

```tsx
import { WithRole } from '@/components/auth/ProtectedRoute';

<WithRole roles={['admin']}>
  <AdminOnlyFeature />
</WithRole>
```

## Utility Hooks

### useAuthorization
A hook for checking user permissions.

```tsx
import { useAuthorization } from '@/components/auth/ProtectedRoute';

function AdminPanel() {
  const { isAdmin, hasRole } = useAuthorization();
  
  if (!isAdmin) {
    return null;
  }
  
  return <div>Admin Content</div>;
}
```

## State Management

### Auth Store
Manages authentication state using Zustand.

```tsx
import { useAuthStore } from '@/store/auth';

function LoginButton() {
  const { login, isLoading } = useAuthStore();
  
  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      // Handle error
    }
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

## Error Handling

### ErrorBoundary
A component for catching and handling React rendering errors.

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```