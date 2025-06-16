
# Supabase Setup Guide

## Database Table Setup

You need to create a `messages` table in your Supabase database. Follow these steps:

1. Go to your Supabase dashboard: https://app.supabase.com/project/eqwkbafoxpkzockkypfu
2. Navigate to "Table Editor" in the sidebar
3. Click "Create a new table"
4. Name the table: `messages`
5. Add the following columns:

### Table Schema:
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### Or use the Table Editor:
- **id**: uuid, primary key, default value: `gen_random_uuid()`
- **text**: text, not null
- **timestamp**: timestamptz, not null, default value: `now()`
- **created_at**: timestamptz, not null, default value: `now()`

## Row Level Security (RLS)

Enable RLS and add policies for public access:

1. Go to "Authentication" > "Policies"
2. Enable RLS on the `messages` table
3. Add these policies:

### Read Policy:
```sql
CREATE POLICY "Enable read access for all users" ON "public"."messages"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
```

### Insert Policy:
```sql
CREATE POLICY "Enable insert for all users" ON "public"."messages"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);
```

After setting up the table and policies, your message board will work with Supabase!
