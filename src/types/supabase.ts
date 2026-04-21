export interface Database {
  public: {
    Tables: {
      users: { Row: { id: string; email: string; name: string; avatar_url: string | null; role: string; created_at: string }; Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>; Update: Partial<Database['public']['Tables']['users']['Row']> };
      student_profiles: { Row: { id: string; user_id: string; curriculum: string; year: number; subjects: any; target_universities: any; target_scores: any; learning_style: string | null; timezone: string; created_at: string; updated_at: string }; Insert: any; Update: any };
      courses: { Row: { id: string; curriculum: string; subject_code: string; subject_name: string; full_name: string; description: string | null; total_units: number; estimated_hours: number | null; official_guide_url: string | null; is_active: boolean; created_at: string }; Insert: any; Update: any };
      course_units: { Row: { id: string; course_id: string; unit_number: number; unit_title: string; description: string | null; estimated_hours: number | null; created_at: string }; Insert: any; Update: any };
      knowledge_nodes: { Row: { id: string; course_id: string; unit_id: string; parent_node_id: string | null; level: number; node_number: string; title: string; content: string; content_summary: string | null; key_concepts: any; key_formulas: any; common_mistakes: any; source_document: string; source_page: string | null; source_url: string | null; prerequisites: any; related_nodes: any; linked_exercises: any; embedding: any; difficulty: number | null; estimated_minutes: number | null; created_at: string; updated_at: string }; Insert: any; Update: any };
      exercises: { Row: any; Insert: any; Update: any };
      student_knowledge_progress: { Row: any; Insert: any; Update: any };
      universities: { Row: { id: string; name: string; short_name: string; country: string; region: string | null; type: string | null; ranking_us_news: number | null; ranking_qs: number | null; ranking_the: number | null; website: string | null; logo_url: string | null; description: string | null; campus_info: string | null; tuition_range: string | null; acceptance_rate: number | null; student_population: number | null; is_active: boolean }; Insert: any; Update: any };
      university_majors: { Row: any; Insert: any; Update: any };
      admission_stats: { Row: any; Insert: any; Update: any };
      application_deadlines: { Row: any; Insert: any; Update: any };
      application_guides: { Row: any; Insert: any; Update: any };
      student_university_targets: { Row: any; Insert: any; Update: any };
      chat_sessions: { Row: any; Insert: any; Update: any };
      chat_messages: { Row: any; Insert: any; Update: any };
      agent_memories: { Row: any; Insert: any; Update: any };
      notes: { Row: any; Insert: any; Update: any };
      note_interactions: { Row: any; Insert: any; Update: any };
      point_balances: { Row: any; Insert: any; Update: any };
      point_transactions: { Row: any; Insert: any; Update: any };
      ai_usage_quotas: { Row: any; Insert: any; Update: any };
      tasks: { Row: any; Insert: any; Update: any };
      focus_sessions: { Row: any; Insert: any; Update: any };
      activity_logs: { Row: any; Insert: any; Update: any };
      daily_checkins: { Row: any; Insert: any; Update: any };
      achievements: { Row: any; Insert: any; Update: any };
      user_achievements: { Row: any; Insert: any; Update: any };
    };
    Enums: {};
  };
}
