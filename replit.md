# PrepQuiz Pro - Replit.md

## Overview

PrepQuiz Pro is a professional offline-first Progressive Web App (PWA) designed for technical interview preparation. The application provides an interactive quiz experience with multiple subjects, allowing users to test their knowledge and track their progress. Built with modern web technologies, it emphasizes offline functionality and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for client-side routing
- **PWA Features**: Service worker implementation for offline functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Server**: Vite middleware integration with Express

### Build and Development
- **Development**: Vite dev server with HMR
- **Production**: Static build served by Express
- **TypeScript**: Strict mode enabled with modern ES features
- **Module System**: ES modules throughout

## Key Components

### Database Schema
- **users**: User authentication and management
- **quiz_subjects**: Quiz categories (JavaScript, React, Node.js, etc.)
- **quiz_questions**: Individual questions with multiple choice options
- **quiz_attempts**: User quiz attempt tracking and scoring

### Core Features
- **Offline Storage**: IndexedDB implementation for caching subjects and questions
- **PWA Capabilities**: Install prompt, service worker, and manifest configuration
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Progress Tracking**: Real-time quiz progress and scoring
- **Subject Management**: Multiple quiz subjects with difficulty levels

### Frontend Components
- **Quiz Engine**: Question display, answer selection, and progress tracking
- **Subject Selection**: Interactive cards showing available quiz topics
- **Results Display**: Score calculation and performance metrics
- **Offline Indicators**: Network status and cached content indicators

## Data Flow

1. **Initial Load**: Application fetches subjects from `/api/subjects`
2. **Subject Selection**: User selects a subject, triggering fetch of questions from `/api/subjects/:id/questions`
3. **Quiz Flow**: Questions are displayed sequentially with answer tracking
4. **Score Calculation**: Results are calculated and can be submitted to `/api/quiz-attempts`
5. **Offline Fallback**: Cached data is used when network is unavailable

### API Endpoints
- `GET /api/subjects` - Retrieve all quiz subjects with statistics
- `GET /api/subjects/:id/questions` - Get questions for specific subject
- `POST /api/quiz-attempts` - Submit quiz attempt results

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority
- **Forms**: React Hook Form with Zod validation
- **Utilities**: date-fns, clsx, lucide-react icons

### Backend Dependencies
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Validation**: Zod for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL sessions

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Replit Integration**: Replit-specific plugins and error handling

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend
- **Database**: Drizzle migrations with `npm run db:push`
- **Type Checking**: `npm run check` for TypeScript validation

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild compiles server code to `dist/index.js`
- **Start Command**: `npm start` runs the production server

### Database Management
- **Migrations**: Stored in `./migrations` directory
- **Schema**: Defined in `./shared/schema.ts`
- **Connection**: Uses DATABASE_URL environment variable

### PWA Deployment
- **Service Worker**: Handles offline caching and network requests
- **Manifest**: Configured for app installation and branding
- **Icons**: SVG-based icons for cross-platform compatibility

### Environment Configuration
- **Development**: NODE_ENV=development with Vite middleware
- **Production**: NODE_ENV=production with static file serving
- **Database**: Requires DATABASE_URL for PostgreSQL connection