# Makeup Shade Finder

## Overview

This is a full-stack web application that helps users find makeup products matching their skin tone. The application allows users to upload selfies for automated skin tone analysis or input their skin tone characteristics manually, then provides personalized makeup recommendations with virtual try-on capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: REST endpoints with JSON responses
- **Development**: Hot reload with Vite middleware integration

### Key Components

#### Image Analysis System
- **Client-side Processing**: Canvas-based image analysis for skin tone detection
- **Color Analysis**: RGB color extraction and undertone/depth classification
- **Confidence Scoring**: Algorithm-based confidence metrics for analysis results

#### Product Database
- **Categories**: Foundation, concealer, highlighter products
- **Attributes**: Brand, shade, undertone, depth, price, affiliate links
- **Matching Algorithm**: Score-based product recommendations using skin tone analysis

#### Virtual Try-On Feature
- **Canvas Manipulation**: Real-time makeup overlay on uploaded images
- **Shade Visualization**: Color blending and makeup application simulation
- **Interactive Controls**: Makeup type selection and shade adjustment

## Data Flow

1. **Image Upload**: Users upload selfies through drag-and-drop interface
2. **Analysis Processing**: Client-side skin tone analysis using Canvas API
3. **Data Storage**: Analysis results saved to PostgreSQL database
4. **Product Matching**: Server-side algorithm matches skin tone to product database
5. **Recommendation Display**: Scored recommendations presented with virtual try-on
6. **Manual Input Alternative**: Users can bypass image upload and input skin characteristics directly

## External Dependencies

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Database & ORM
- **Drizzle ORM**: Type-safe database queries and migrations
- **Neon Database**: Serverless PostgreSQL hosting
- **Zod**: Schema validation for API requests

### Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express API integration
- **Hot Reload**: Automatic refresh for both frontend and backend changes
- **Environment Variables**: DATABASE_URL required for database connection

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Static Assets**: Served through Express static middleware
- **Database**: Drizzle migrations applied via `db:push` command

### Database Schema
- **Users**: Authentication and user management
- **Skin Tone Analysis**: Stored analysis results with confidence scores
- **Products**: Makeup product catalog with matching attributes
- **Recommendations**: Scored matches between analyses and products

The application uses an in-memory storage implementation for development that can be easily replaced with the PostgreSQL implementation when the database is provisioned.