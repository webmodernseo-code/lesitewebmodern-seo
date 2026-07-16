import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || '';

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not defined in environment variables.");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function initDb() {
  console.log("⚙️ Initializing Neon Database Schema...");
  try {
    // Enable uuid-ossp extension for uuid generation if not already active
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // 1. Table content_items
    await sql`
      CREATE TABLE IF NOT EXISTS content_items (
        id SERIAL PRIMARY KEY,
        type TEXT DEFAULT 'blog',
        title TEXT NOT NULL,
        brief TEXT,
        focus_keyword TEXT,
        content TEXT,
        hashtags TEXT[],
        status TEXT DEFAULT 'draft',
        seo_score INTEGER DEFAULT 0,
        channel_score INTEGER DEFAULT 0,
        seo_details JSONB,
        featured_image TEXT,
        image_source TEXT DEFAULT 'generated',
        meta_description TEXT,
        scheduled_at TIMESTAMP WITH TIME ZONE,
        published_at TIMESTAMP WITH TIME ZONE,
        wp_post_id INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    console.log("✓ Table 'content_items' initialized.");

    // 2. Table projects
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        client TEXT,
        deadline DATE,
        status TEXT DEFAULT 'in_progress',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    console.log("✓ Table 'projects' initialized.");

    // 3. Table project_phases
    await sql`
      CREATE TABLE IF NOT EXISTS project_phases (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    console.log("✓ Table 'project_phases' initialized.");

    // 4. Table project_tasks
    await sql`
      CREATE TABLE IF NOT EXISTS project_tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        phase_id UUID REFERENCES project_phases(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'medium',
        is_completed BOOLEAN DEFAULT false,
        deadline DATE,
        position INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    console.log("✓ Table 'project_tasks' initialized.");

    // 5. Table leads for contact form
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `;
    console.log("✓ Table 'leads' initialized.");

    // Indices
    await sql`CREATE INDEX IF NOT EXISTS idx_scheduled ON content_items (status, scheduled_at);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_type ON content_items (type);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_phases_project ON project_phases (project_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_tasks_phase ON project_tasks (phase_id);`;
    console.log("✓ Database indexes initialized.");
    console.log("🎉 Database initialization completed successfully!");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
}

initDb();
