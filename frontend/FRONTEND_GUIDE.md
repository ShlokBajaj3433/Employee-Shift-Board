# Employee Shift Board - Frontend

## Overview
A comprehensive React-based frontend application for managing employees, shifts, and role assignments. Built with React 18, Vite, TailwindCSS, and Axios.

## Features

### 🔐 Authentication
- Secure JWT-based login system
- Role-based access control (ADMIN/USER)
- Persistent login sessions using localStorage
- Protected routes with automatic redirects

### 📊 Dashboard
- Welcome screen with personalized greeting
- Real-time statistics (employees count, today's shifts)
- Recent shifts overview
- Quick action cards for navigation
- Role-specific content display

### 👥 Employee Management
- **View Employees**: Paginated table with search functionality
- **Add Employee**: Modal form for creating new employees
  - Name, Employee Code, Department (required)
  - Email, Phone (optional)
- **Delete Employee**: Admin-only with confirmation
- **Search/Filter**: Real-time search by name, code, or department
- **Employee Details**: ID, Name, Code, Department, Contact Info

### 📅 Shift Management
- **View Shifts**: Comprehensive shift listing with filters
- **Create Shift**: Modal form with employee selection
  - Employee dropdown (searchable)
  - Date picker
  - Shift type selector (MORNING/AFTERNOON/EVENING/NIGHT)
  - Automatic time allocation based on type
- **Delete Shift**: Admin-only with confirmation
- **Filter Shifts**: By employee ID and/or date
- **Shift Details**: ID, Employee, Date, Type, Start/End Time
- **Visual Indicators**: Color-coded shift type badges

### ⚙️ Admin Panel (Admin Only)
- **Role Assignment**: Assign USER or ADMIN roles to employees
- **System Statistics**: 
  - Total employees count
  - Total users count
  - Admin users count
- **Role Descriptions**: Clear explanation of USER vs ADMIN capabilities
- **User Account Overview**: See which employees have user accounts

## Technology Stack

- **React**: 18.3.1 - UI library
- **React Router**: 6.28.0 - Client-side routing
- **Axios**: 1.7.9 - HTTP client
- **TailwindCSS**: 3.4.17 - Utility-first CSS framework
- **Vite**: 6.0.3 - Build tool and dev server
- **PostCSS**: 8.4.49 - CSS processing

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── axios.js       # Axios configuration with JWT interceptor
│   ├── components/
│   │   ├── AdminRoute.jsx         # Admin-only route protection
│   │   ├── Layout.jsx             # Navigation and layout wrapper
│   │   ├── ProtectedRoute.jsx    # Authentication route guard
│   │   ├── ShiftAssignmentForm.jsx # Quick shift creation form
│   │   └── ShiftTable.jsx         # Shift viewing table
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── pages/
│   │   ├── AdminPanel.jsx        # Admin role management
│   │   ├── Dashboard.jsx         # Home dashboard
│   │   ├── EmployeesPage.jsx     # Employee CRUD operations
│   │   ├── Login.jsx             # Login page
│   │   └── ShiftsPage.jsx        # Shift CRUD operations
│   ├── App.jsx            # Main app with routing
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.jsx           # React entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.js         # Vite configuration
└── vercel.json           # Deployment configuration
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Backend API running on http://localhost:8080

### Steps

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure API Endpoint** (Optional)
Edit `src/api/axios.js` if backend is not on localhost:8080:
```javascript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

3. **Run Development Server**
```bash
npm run dev
```
Runs on http://localhost:5173 (Vite default)

4. **Build for Production**
```bash
npm run build
```
Output in `dist/` folder

5. **Preview Production Build**
```bash
npm run preview
```

## Environment Variables

Create `.env` file in frontend root (optional):
```env
VITE_API_URL=http://localhost:8080/api
```

Then update `axios.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

## Usage Guide

### Login
**Default Credentials:**
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### Navigation
- **Dashboard** (📊): Overview and statistics
- **Employees** (👥): Manage employee records
- **Shifts** (📅): View and manage shift schedules
- **Admin Panel** (⚙️): Assign roles (Admin only)

### Admin Operations

#### Create Employee
1. Navigate to Employees page
2. Click "+ Add Employee"
3. Fill in required fields (Name, Code, Department)
4. Click "Add Employee"

#### Assign Shift
1. Navigate to Shifts page
2. Click "+ Create Shift"
3. Select employee from dropdown
4. Pick date
5. Choose shift type (MORNING/AFTERNOON/EVENING/NIGHT)
6. Click "Create Shift"

#### Assign Role
1. Navigate to Admin Panel
2. Select employee from dropdown
3. Choose role (USER or ADMIN)
4. Click "Assign Role"
5. Note the temporary password displayed

### User Operations

#### View Shifts
1. Navigate to Shifts page
2. Enter Employee ID (yours) and/or Date
3. Click "Search"
4. View your assigned shifts

## API Integration

### Axios Configuration
All API calls include JWT token automatically via interceptor:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | User login |
| GET | /employees | List all employees |
| POST | /employees | Create new employee |
| DELETE | /employees/{id} | Delete employee |
| GET | /shifts | List shifts (with filters) |
| POST | /shifts | Create new shift |
| DELETE | /shifts/{id} | Delete shift |
| POST | /admin/assign-role | Assign role to employee |
| GET | /admin/users | List all users |

## Features by Role

### USER Role
✅ View Dashboard  
✅ View Employees (read-only)  
✅ View Own Shifts  
❌ Create/Delete Employees  
❌ Create/Delete Shifts  
❌ Access Admin Panel  

### ADMIN Role
✅ View Dashboard  
✅ Full Employee Management (Create/Delete)  
✅ Full Shift Management (Create/Delete)  
✅ View All Shifts  
✅ Access Admin Panel  
✅ Assign Roles to Employees  

## Shift Types

| Type | Time Range | Badge Color |
|------|-----------|-------------|
| MORNING | 6:00 AM - 2:00 PM | Yellow |
| AFTERNOON | 2:00 PM - 10:00 PM | Orange |
| EVENING | 4:00 PM - 12:00 AM | Purple |
| NIGHT | 10:00 PM - 6:00 AM | Blue |

## Responsive Design

- **Mobile**: Single column layouts, hamburger menus
- **Tablet**: Two column grids, optimized spacing
- **Desktop**: Full multi-column layouts, expanded tables

## Error Handling

- **Network Errors**: Displays user-friendly error messages
- **Validation Errors**: Shows field-specific validation messages
- **401 Unauthorized**: Automatically redirects to login
- **403 Forbidden**: Shows access denied message
- **404 Not Found**: Custom error for missing resources

## Development

### Code Style
- React functional components with hooks
- Async/await for API calls
- Consistent file naming (PascalCase for components)
- TailwindCSS utility classes for styling

### State Management
- React Context API for authentication
- Local component state for forms and UI
- No external state management libraries

### Form Validation
- HTML5 required attributes
- Custom error display
- Disabled submit during loading

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

Configuration in `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Other Platforms
1. Build: `npm run build`
2. Upload `dist/` folder contents
3. Configure SPA routing (all routes → index.html)

## Troubleshooting

### API Connection Issues
**Problem**: "Network Error" or CORS errors  
**Solution**: 
- Ensure backend is running on port 8080
- Check CORS configuration in backend SecurityConfig
- Verify API_BASE_URL in axios.js

### Login Fails
**Problem**: 401 Unauthorized  
**Solution**:
- Check credentials (admin/admin123 or user/user123)
- Verify backend DataSeeder has created users
- Clear localStorage and retry

### Shifts Not Showing
**Problem**: Empty table after search  
**Solution**:
- Verify filters (Employee ID and Date must match existing shifts)
- Check backend for shift data
- Look at browser console for API errors

### Admin Panel Not Accessible
**Problem**: Redirected to dashboard  
**Solution**:
- Login as admin (username: admin, password: admin123)
- Check role in localStorage: `localStorage.getItem('role')`

## Performance Optimization

- **Code Splitting**: React.lazy() for route-based splitting (can be added)
- **Memoization**: Use React.memo for expensive components
- **Debouncing**: Add debounce for search inputs
- **Caching**: Consider React Query for API caching

## Future Enhancements

- [ ] Employee profile editing
- [ ] Shift swap requests
- [ ] Calendar view for shifts
- [ ] Bulk shift assignment
- [ ] Export shifts to CSV/PDF
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Real-time updates with WebSockets

## License
Part of Employee Shift Board project

## Support
For issues or questions, contact the development team.
