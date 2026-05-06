# Campus Notifications System Design

## Overview
A modular, observability-first platform for real-time campus notifications (Placements, Results, Events). The system features a priority-based inbox that intelligently ranks updates using importance weights and exponential recency decay.

## Core Components

### 1. Logging Middleware (`logging_middleware/`)
A standalone TypeScript package designed for structured observability.
- **Features**: 
  - Strict type-union validation for Stack, Level, and Package.
  - Asynchronous log delivery to the evaluation service.
  - Reusable across both frontend and backend environments.
- **Tech**: TypeScript, Fetch API.

### 2. Priority Ranking Algorithm
Notifications are scored and ranked using the following model:
`Score = Weight(Type) + (10 * e^(-age_hours / 24))`
- **Weights**:
  - `Placement`: 30
  - `Result`: 20
  - `Event`: 10
- **Recency**: Uses a 24-hour half-life decay to ensure fresh news stays relevant while preventing old updates from cluttering the inbox.

### 3. Frontend Platform (`notification_app_fe/`)
A high-performance React application built for scale.
- **Tech Stack**: React 18, Vite, Material UI, TypeScript.
- **Key Features**:
  - **Infinite Pagination**: Efficient data loading with type-based filtering.
  - **Viewed-State Tracking**: Automated read tracking using `IntersectionObserver` API.
  - **Local Persistence**: View state is persisted across sessions via `localStorage`.
  - **Network Layer**: Robust error handling and automated event logging.

## Data Flow
1. **Fetch**: Frontend requests notifications via the API layer.
2. **Transform**: Raw data is processed through the ranking algorithm.
3. **Log**: Every lifecycle event (requests, views, errors) is shipped via the Logging Middleware.
4. **Persist**: User interaction states are stored locally for consistent UX.
