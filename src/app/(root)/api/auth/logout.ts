import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient();

  // 로그아웃 처리
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // 쿠키 삭제 (선택 사항)
  res.setHeader('Set-Cookie', 'sb:token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

  return res.status(200).json({ message: 'Logged out successfully' });
}