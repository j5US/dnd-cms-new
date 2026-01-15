# Database Save Feature - Setup Instructions

## Prerequisites
Your Postgres container should be running. Check with:
```powershell
docker ps
```

You should see `my-app-postgres` in the list.

## Database Schema Setup

### Option 1: Using Adminer (Recommended)
1. Open http://localhost:8080 in your browser
2. Login with:
   - System: `PostgreSQL`
   - Server: `postgres`
   - Username: `myuser`
   - Password: `mypassword`
   - Database: `myappdb`
3. Click "SQL command"
4. Copy and paste the contents of `db/schema.sql`
5. Click "Execute"

### Option 2: Using psql CLI
```powershell
# Connect to Postgres container
docker exec -it my-app-postgres psql -U myuser -d myappdb

# Then paste the schema from db/schema.sql
# Or run it directly:
docker exec -i my-app-postgres psql -U myuser -d myappdb < db/schema.sql
```

### Option 3: Using pg npm package directly
Create a script in `scripts/init-db.ts` to run the schema automatically (see implementation plan).

## Verify Setup

After running the schema, verify the table was created:

```sql
SELECT * FROM campaigns;
```

Should return an empty result set (table exists but no rows yet).

## Testing the Feature

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Create a simple design (add a Flex Block and Button)
4. Click "💾 Save to Database"
5. Enter a name when prompted
6. Check your database - you should see the campaign!

```sql
SELECT id, name, created_at FROM campaigns;
```

## Files Created
- `lib/db.ts` - Database connection utilities
- `lib/api-client.ts` - Client-side API functions
- `app/api/campaigns/save/route.ts` - Save campaign API
- `app/api/campaigns/list/route.ts` - List campaigns API
- `app/api/campaigns/[id]/route.ts` - Load/delete campaign API
- `.env.local` - Database connection string
- `db/schema.sql` - Database schema

## Next Steps
If everything works, you can:
- Save multiple campaigns with different names
- Load any saved campaign from the "📁 Load Saved" dropdown
- Still import from JSON files using "📥 Import from File"
