export interface PrayerRequestUser {
  email: string | null;
}

export interface PrayerResponse {
  id: string;
  content: string;
  created_at: string;
  user: PrayerRequestUser;
}

export interface PrayerRequest {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_anonymous: boolean | null;
  created_at: string;
  user: PrayerRequestUser;
  responses: PrayerResponse[];
}