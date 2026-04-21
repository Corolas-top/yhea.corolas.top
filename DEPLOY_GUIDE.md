# Yhea Deployment Guide

## Step 1: Supabase Setup (You need to do this manually)

### 1.1 Create Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Enter project name: `yhea`
4. Choose region closest to your users (e.g., Singapore for Asia)
5. Wait for project to be created

### 1.2 Get your Supabase credentials
1. Go to Project Settings > API
2. Copy:
   - **Project URL** (e.g., `https://xxxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 1.3 Run the database migration
1. Go to the SQL Editor in Supabase Dashboard
2. Open the file `supabase/migrations/001_init.sql`
3. Copy ALL the SQL content and paste into the editor
4. Click "Run"
5. Verify tables are created in the Table Editor

### 1.4 Enable Authentication
1. Go to Authentication > Providers
2. **Email provider**: Keep enabled (default)
3. **Google OAuth** (optional):
   - Go to https://console.cloud.google.com
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

### 1.5 Set up Edge Functions (for AI chat)
1. Install Supabase CLI locally:
   ```bash
   npm install -g supabase
   ```
2. Link your project:
   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   ```
3. Set environment variables:
   ```bash
   supabase secrets set KIMI_API_KEY=your_kimi_api_key
   supabase secrets set SUPABASE_URL=your_supabase_url
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
4. Deploy Edge Functions:
   ```bash
   supabase functions deploy agent-chat
   supabase functions deploy heat-calculate
   ```

### 1.6 Set up Row Level Security (RLS) policies
The migration file includes basic RLS policies. For production, add more:
```sql
-- Notes: users can only update/delete their own
CREATE POLICY "Users can update own notes" ON public.notes FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own notes" ON public.notes FOR DELETE USING (auth.uid() = author_id);

-- Tasks: users can only see their own
CREATE POLICY "Users can manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);

-- Chat: users can only see their own sessions
CREATE POLICY "Users can manage own chats" ON public.chat_sessions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Users can manage own messages" ON public.chat_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.chat_sessions s WHERE s.id = session_id AND s.student_id = auth.uid())
);
```

## Step 2: Kimi API Setup (You need to do this)

### 2.1 Get Kimi API Key
1. Go to https://platform.moonshot.cn
2. Sign up and create an API key
3. Copy the API key

### 2.2 Add Kimi API key to Supabase secrets
```bash
supabase secrets set KIMI_API_KEY=sk-your-kimi-api-key
```

## Step 3: Deploy Frontend (Vercel)

### 3.1 Option A: Deploy via Vercel Dashboard (Recommended for beginners)
1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository (or upload files)
4. Set environment variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click "Deploy"

### 3.2 Option B: Deploy via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Configure Environment Variables

Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For Vercel deployment, add these in Project Settings > Environment Variables.

## Step 5: Manual Data Entry (Admin Panel)

Once deployed, go to `/admin` and manually enter:

### 5.1 Courses
- Course name, code, curriculum type
- Number of units
- Description

### 5.2 Units & Knowledge Nodes
For each course:
- Unit number and title
- For each unit, add topics with:
  - Content (standard explanation)
  - Source document reference
  - Key formulas
  - Common mistakes
  - Difficulty level

### 5.3 Universities
- Name, short name, country
- Rankings (QS, US News, THE)
- Acceptance rate
- Tuition range
- Description

### 5.4 Majors
- For each university, add available majors
- Include: degree type, duration, requirements, career paths

### 5.5 Application Guides
- By country (USA, UK, Canada, etc.)
- By section (overview, timeline, essays, testing)
- Step-by-step instructions

## Step 6: Google Cloud Run (Optional - for heavy computing)

When you need to process large amounts of data:

### 6.1 Enable Google Cloud
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable Cloud Run API and Cloud Scheduler API

### 6.2 Deploy a Cloud Run function for heat calculation
```bash
# Create a Dockerfile
FROM denoland/deno:1.40
WORKDIR /app
COPY . .
CMD ["deno", "run", "--allow-net", "--allow-env", "heat-calculate.ts"]

# Build and deploy
gcloud builds submit --tag gcr.io/YOUR_PROJECT/yhea-heat
gcloud run deploy yhea-heat --image gcr.io/YOUR_PROJECT/yhea-heat --platform managed
```

### 6.3 Set up Cloud Scheduler
```bash
gcloud scheduler jobs create http heat-calculate-daily \
  --schedule="0 * * * *" \
  --uri="YOUR_CLOUD_RUN_URL" \
  --http-method=POST
```

This will run the heat calculation every hour automatically.

## Step 7: Post-Deployment Checklist

- [ ] Sign up as first user
- [ ] Make yourself admin in Supabase:
  ```sql
  UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
  ```
- [ ] Add first course content via Admin panel
- [ ] Test Agent chat (make sure Kimi API key is working)
- [ ] Test note creation and publishing
- [ ] Check AI quota system
- [ ] Verify all pages load correctly

## Troubleshooting

### "Kimi API error"
- Check if KIMI_API_KEY is set in Supabase secrets
- Verify the API key is valid at https://platform.moonshot.cn

### "Authentication not working"
- Check if Supabase URL and anon key are correct
- Verify redirect URLs in Supabase Auth settings

### "Database permission denied"
- Make sure RLS policies are created
- Check if user is authenticated

### "Edge Function not found"
- Make sure functions are deployed: `supabase functions list`
- Check function logs: `supabase functions logs agent-chat`
