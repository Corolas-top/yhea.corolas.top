import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Calculate heat scores for all published notes
    const { data: notes, error } = await supabase
      .from('notes')
      .select('id, likes_count, bookmarks_count, comments_count, shares_count, quality_score, published_at, author_id')
      .eq('visibility', 'published');

    if (error) throw error;

    const now = new Date();
    for (const note of notes || []) {
      const hoursSincePublish = (now.getTime() - new Date(note.published_at).getTime()) / (1000 * 3600);
      const timeDecay = 1 / (1 + 0.05 * hoursSincePublish);

      const interactionScore =
        (note.likes_count || 0) * 2 +
        (note.bookmarks_count || 0) * 3 +
        (note.comments_count || 0) * 5 +
        (note.shares_count || 0) * 8 +
        (note.quality_score || 0) * 0.5;

      const heatScore = Math.round(interactionScore * timeDecay);

      await supabase.from('notes').update({ heat_score: heatScore }).eq('id', note.id);
    }

    return new Response(JSON.stringify({ success: true, updated: notes?.length || 0 }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
