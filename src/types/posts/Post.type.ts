export type Post = {
  post_id: string;
  user_id: string;
  created_at: string;
  category: string;
  duration: number;
  location: string;
  total_members: number;
  personal_link?: string;
  target_position: string[];
  recruitments: number;
  tech_stack: string | string[];
  deadline: string;
  title: string;
  content: string;
  place?: string;
};
