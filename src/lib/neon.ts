import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const isNeonConfigured = !!databaseUrl && !databaseUrl.includes('your-database-url');

// SQL client for queries
export const sql = isNeonConfigured 
  ? neon(databaseUrl) 
  : null as any;

// Helper to check and log configuration
if (!isNeonConfigured) {
  console.warn("⚠️ Neon Database URL not configured. Database queries will fall back to local mock data.");
}
