# Amma Database Migrations

This directory contains all database migrations for the Amma project, organized sequentially.

## Migration Naming Convention

Migrations follow the pattern: `{number}_{description}.sql`

- **001_initial_schema.sql** - Core tables (families, caregivers, activities, memory, notifications, flags)
- **002_rls_policies.sql** - Row Level Security policies for data isolation

## Running Migrations

### Push to Remote Database
```bash
npx supabase db push
```

### Reset Remote Database (⚠️ Destructive)
```bash
npx supabase db reset --linked
```

### Create New Migration
```bash
npx supabase migration new {description}
```

## Migration Log

| Number | Description | Date | Status |
|--------|-------------|------|--------|
| 001 | Initial schema | 2025-10-26 | ✅ Applied |
| 002 | RLS policies | 2025-10-26 | ✅ Applied |

## Notes

- Always test migrations locally before pushing to production
- Keep migrations idempotent where possible
- Document breaking changes in this README
- Store migration logs in `/logs` directory
