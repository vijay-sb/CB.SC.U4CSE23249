# Campus Notifications Microservice (CB.SC.U4CSE23249)

A modular React-based notification platform with an intelligent priority inbox and integrated observability middleware.

## Project Structure

- `logging_middleware/`: Reusable TypeScript logging package.
- `notification_app_fe/`: React + Vite frontend application.
- `notification_app_be/`: Backend services (placeholder).
- `notification_system_design.md`: Technical architecture and algorithm details.

## Features

- **Priority Inbox**: Automated ranking of notifications based on type-weighting and exponential decay.
- **Observability**: Integrated middleware for structured logging of all application events.
- **Persistence**: Local tracking of "Viewed" states for notifications.
- **Clean Architecture**: Decoupled packages and typed API integration.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- NPM

### 2. Setup Logging Middleware
```bash
cd logging_middleware
npm install
npm run build
```

### 3. Setup Frontend
```bash
cd ../notification_app_fe
npm install
npm run dev
```

### 4. Verification
Run the algorithm verification script:
```bash
cd notification_app_fe
npx tsx scripts/stage1_verify.ts
```

## Algorithm Model
The system uses a weighted importance model combined with recency decay:
`Score = Weight(Type) + (10 * e^(-age_hours / 24))`

- **Weights**: Placement (30), Result (20), Event (10).
