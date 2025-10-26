# Amma — Newborn Care & Postpartum Companion

**Version:** 1.0.0 (Phase 1 MVP)  
**Stack:** React Native (Expo), Supabase, TypeScript

---

## Overview

Amma is India's warm, trustworthy AI companion for newborn care and postpartum recovery. This mobile app helps caregivers track feeds, diapers, sleep, pumping, and growth while providing gentle, memory-aware guidance.

See [MasterQRD.md](../MasterQRD.md) for full product & technical specification.

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- iOS Simulator (macOS) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Supabase credentials
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your-anon-key
```

### Run the App

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

---

## Project Structure

```
amma-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/           # Environment & app configuration
│   ├── lib/              # Supabase client & utilities
│   ├── navigation/       # React Navigation setup
│   ├── providers/        # Context providers (Query, Auth, etc.)
│   ├── screens/          # Main app screens
│   └── theme/            # Colors, typography, spacing
├── App.tsx               # Root component
├── app.config.ts         # Expo configuration
└── babel.config.js       # Babel + Reanimated plugin
```

---

## Phase 1 Scope (Current)

✅ **Completed:**
- Expo + TypeScript project scaffold
- Bottom tab navigation (Home, Log, Dashboard, Settings)
- Supabase client integration with AsyncStorage auth
- Theme system (Amma brand colors)
- Environment variable handling

🚧 **In Progress:**
- Activity logging forms (feed, diaper, sleep, pump, growth)
- Supabase schema setup & migrations
- Local-first storage with offline sync
- Auth flow (sign up, login, session management)

📋 **Next Steps:**
- Dashboard summaries (24h & 7d stats)
- Settings screen (caregiver management, quiet hours)
- Supabase RLS policies & database schema deployment

---

## Environment Variables

Create a `.env` file in the project root:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
EAS_PROJECT_ID=
```

**⚠️ Never commit `.env` to version control.** Use `.env.example` as a template.

---

## Supabase Setup

### Database Schema

Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- See MasterQRD.md section 8 for full schema
-- Quick start: families, caregivers, activities, memory, notifications, flags tables
```

Refer to [MasterQRD.md lines 345-407](../MasterQRD.md) for the complete schema.

### Row Level Security (RLS)

Enable RLS on all tables and create policies to ensure caregivers can only access their family's data.

---

## Tech Stack

- **Mobile Framework:** React Native (Expo SDK 54)
- **Navigation:** React Navigation v7 (bottom tabs + native stack)
- **State Management:** TanStack Query (React Query)
- **Backend:** Supabase (Auth, Postgres, Realtime)
- **Storage:** AsyncStorage (local), expo-secure-store (sensitive keys)
- **Styling:** StyleSheet API with theme constants

---

## Development Workflow

1. **Feature branches:** Create from `main` for each feature
2. **Commit messages:** Use conventional commits (feat, fix, docs, etc.)
3. **Testing:** Manual testing in Expo Go + iOS/Android simulators
4. **Deployment:** EAS Build for production (future phases)

---

## Known Issues

- TypeScript errors may appear during initial setup until all files are created
- Expo Go has limitations; use development builds for native modules in later phases

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [MasterQRD.md](../MasterQRD.md) — Full product specification

---

## License

Proprietary — EzyPath Solutions India

---

**Built with ❤️ for Indian families**
