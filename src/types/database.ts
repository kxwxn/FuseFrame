export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AttributionSource = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page: string | null;
  source: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string | null;
          status: string;
          plan_id: string;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id?: string | null;
          status: string;
          plan_id: string;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          plan_id?: string;
          current_period_end?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      attribution_events: {
        Row: {
          id: string;
          event_type: "visit" | "signup" | "payment";
          anonymous_id: string;
          user_id: string | null;
          stripe_customer_id: string | null;
          source: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          referrer: string | null;
          landing_page: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: "visit" | "signup" | "payment";
          anonymous_id: string;
          user_id?: string | null;
          stripe_customer_id?: string | null;
          source: string;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          referrer?: string | null;
          landing_page?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string | null;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      revenue_events: {
        Row: {
          id: string;
          stripe_event_id: string;
          stripe_customer_id: string | null;
          user_id: string | null;
          amount: number;
          currency: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          stripe_event_id: string;
          stripe_customer_id?: string | null;
          user_id?: string | null;
          amount: number;
          currency: string;
          source: string;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
      webhook_events: {
        Row: {
          id: string;
          provider: "stripe";
          provider_event_id: string;
          processed_at: string;
        };
        Insert: {
          id?: string;
          provider: "stripe";
          provider_event_id: string;
          processed_at?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
