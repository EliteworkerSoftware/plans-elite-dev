-- Run this in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query → paste this → Run

-- Users table (roles)
CREATE TABLE IF NOT EXISTS markup_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'tech' CHECK (role IN ('admin', 'tech')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS markup_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client TEXT,
  created_by UUID REFERENCES markup_users(id),
  annotations JSONB DEFAULT '{"strokes":[],"icons":[]}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE markup_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE markup_projects ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON markup_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON markup_users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON markup_users FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can see all users
CREATE POLICY "Admins can view all users" ON markup_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM markup_users WHERE id = auth.uid() AND role = 'admin')
);

-- Project policies
CREATE POLICY "Users can view own projects" ON markup_projects FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "Users can create projects" ON markup_projects FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update own projects" ON markup_projects FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Users can delete own projects" ON markup_projects FOR DELETE USING (created_by = auth.uid());

-- Admins can see ALL projects
CREATE POLICY "Admins can view all projects" ON markup_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM markup_users WHERE id = auth.uid() AND role = 'admin')
);

-- Make yourself admin (run this AFTER you first log in to the app)
-- Replace the email below with your email
-- UPDATE markup_users SET role = 'admin' WHERE email = 'gregg@elitesmarthome.com';
