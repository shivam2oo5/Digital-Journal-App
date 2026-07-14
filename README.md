INTERN ID: CITS6183
# Digital Journal Application

A comprehensive full-stack digital journaling platform built with modern web technologies. This application allows users to create, manage, and analyze their journal entries with rich features and analytics.

## 📋 Project Overview

This is a monorepo project containing a complete journaling application with:
- **Frontend**: React-based web application with Vite
- **Backend**: TypeScript API server
- **Database**: Drizzle ORM with database schema
- **Libraries**: Shared utilities, API clients, and type definitions

## 🏗️ Project Structure

```
Journal-Master/
├── artifacts/
│   ├── api-server/          # Backend API server
│   ├── digital-journal/     # React frontend application
│   └── mockup-sandbox/      # UI component preview sandbox
├── lib/
│   ├── api-client-react/    # React API client library
│   ├── api-spec/            # OpenAPI specification
│   ├── api-zod/             # Zod schema definitions
│   └── db/                  # Database configuration
├── scripts/                 # Utility scripts
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # Monorepo workspace config
└── tsconfig.base.json       # Base TypeScript config
```

## ✨ Key Features

### Journal Management
- 📝 Create, edit, and delete journal entries
- 🏷️ Organize entries with categories
- ⭐ Mark favorite entries
- 🗑️ Trash and archive functionality
- 🔍 Search and filter entries

### Analytics & Insights
- 📊 Monthly activity charts
- 😊 Mood tracking and visualization
- 📈 Writing frequency analysis
- 🎯 Category-based analytics

### User Experience
- 🎨 Modern, responsive UI with dark mode support
- 📱 Mobile-friendly design
- ⚡ Fast performance with Vite
- 🔐 Data storage and management

### Data Management
- 💾 Local storage support
- 📤 Export functionality
- 🌱 Seed data for testing

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **pnpm** (v7 or higher)

### Installation

1. **Install pnpm** (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

### Running the Project

#### Development Mode

1. **Start the backend API server**:
   ```bash
   cd artifacts/api-server
   pnpm dev
   ```
   The API server will run on `http://localhost:3000`

2. **In a new terminal, start the frontend**:
   ```bash
   cd artifacts/digital-journal
   pnpm dev
   ```
   The frontend will run on `http://localhost:5173`

#### Building for Production

```bash
# Build all packages
pnpm build

# Or build specific package
cd artifacts/digital-journal
pnpm build
```

## 📦 Workspace Packages

### `artifacts/api-server`
- Backend API built with Express/Node.js
- RESTful endpoints for journal management
- Health check endpoint
- Middleware configuration
- Logger utility

**Key files:**
- `src/app.ts` - Express app configuration
- `src/routes/` - API route definitions
- `src/middlewares/` - Custom middleware

### `artifacts/digital-journal`
- Frontend React application
- Built with Vite for fast development
- Tailwind CSS for styling
- Radix UI components for accessibility

**Key files:**
- `src/pages/` - Application pages
- `src/components/` - Reusable components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and storage

### `lib/api-client-react`
- Typed API client for React applications
- Generated from OpenAPI specification
- Custom fetch wrapper for requests

### `lib/api-spec`
- OpenAPI/Swagger specification
- orval configuration for code generation
- API documentation and contracts

### `lib/api-zod`
- Zod schema definitions for runtime validation
- Type-safe request/response validation
- Generated from API specification

### `lib/db`
- Drizzle ORM configuration
- Database schema definitions
- Migration setup

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: Drizzle ORM
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Schema Validation**: Zod
- **API Documentation**: OpenAPI/Swagger

## 🔧 Development Workflow

### Creating a New Journal Entry
```bash
# Use the frontend UI to create entries
# Or use the API directly
POST /api/journals
{
  "title": "My Day",
  "content": "Today was productive...",
  "category": "personal",
  "mood": "happy"
}
```

### Accessing Analytics
- Navigate to the Analytics page in the frontend
- View mood trends, writing frequency, and category breakdowns
- Filter by date range for custom analysis

### Exporting Data
- Use the export functionality in Settings
- Download journal entries in JSON or CSV format

## 📝 Available Scripts

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🤝 Project Structure Notes

- The project uses **pnpm workspaces** for monorepo management
- **TypeScript** is configured with a base config at the root
- Each package has its own `tsconfig.json` extending the base
- All packages share dependency versions through the root `package.json`

## 📚 Useful Locations

- **Frontend pages**: `artifacts/digital-journal/src/pages/`
- **Frontend components**: `artifacts/digital-journal/src/components/`
- **Backend routes**: `artifacts/api-server/src/routes/`
- **Database schema**: `lib/db/src/schema/`
- **API specification**: `lib/api-spec/openapi.yaml`

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 (backend) or 5173 (frontend) is already in use:
- Change the port in `vite.config.ts` or API server configuration
- Or kill the process using that port

### Dependencies Not Installing
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
pnpm install
```

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Zod Documentation](https://zod.dev)

## 📄 License

This project is part of the codetech digital journal app initiative.

---

**Happy Journaling! 📔✨**
