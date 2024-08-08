// import { useState, useEffect } from 'react';
// import { createClient } from '@/utils/supabase/client';

// const supabase = createClient();

// const useCheckNickname = (nickname: string) => {
//   const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkNicknameAvailability = async (nickname: string) => {
//       const { data, error } = await supabase
//         .from('Users')
//         .select('nickname')
//         .eq('nickname', nickname);

//       if (error) {
//         console.error('Error checking nickname availability:', error);
//         return;
//       }

//       setNicknameAvailable(data.length === 0);
//     };

//     if (nickname) {
//       if (nickname.length >= 2 && nickname.length <= 10) {
//         checkNicknameAvailability(nickname);
//       } else {
//         setNicknameAvailable(null);
//       }
//     }
//   }, [nickname]);

//   return nicknameAvailable;
// };

// export default useCheckNickname;