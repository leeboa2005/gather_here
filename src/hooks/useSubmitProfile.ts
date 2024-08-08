// import { useState } from 'react';
// import { createClient } from '@/utils/supabase/client';
// import useSignupStore from '@/store/useSignupStore';

// const supabase = createClient();

// const useSubmitProfile = () => {
//   const { nextStep, setNickname, setBlog, user, job_title, experience, profile_image_url } = useSignupStore();
//   const [error, setError] = useState<string | null>(null);
//   const [blogError, setBlogError] = useState<string | null>(null);

//   const onSubmit = async (data: { nickname: string; blog: string }, nicknameAvailable: boolean | null) => {
//     if (!user?.email) {
//       setError('유효한 이메일을 확인할 수 없습니다.');
//       return;
//     }

//     if (nicknameAvailable === false) {
//       setError('이미 사용 중인 닉네임입니다.');
//       return;
//     }

//     let formattedBlog = data.blog;
//     if (!/^https?:\/\//i.test(data.blog)) {
//       formattedBlog = 'http://' + data.blog;
//     }

//     const urlPattern = new RegExp(
//       '^(https?:\\/\\/)?' + // protocol
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6})' + // domain name with minimum two letters TLD
//       '(:\\d+)?(\\/[-a-z\\d%_.~+\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF@]*)*' + // port and path with Unicode and @
//       '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//       '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
//     );

//     if (formattedBlog && !urlPattern.test(formattedBlog)) {
//       setBlogError('유효한 URL을 입력하세요.');
//       return;
//     }

//     setError('');
//     setBlogError('');

//     try {
//       const { data: userData, error: fetchError } = await supabase
//         .from('Users')
//         .select('user_id')
//         .eq('user_id', user.id);

//       if (fetchError) {
//         console.error('Error fetching data:', fetchError);
//         setError('Failed to fetch user data. Please try again.');
//         return;
//       }

//       if (userData && userData.length > 0) {
//         const { error: updateError } = await supabase
//           .from('Users')
//           .update({
//             job_title,
//             experience,
//             nickname: data.nickname,
//             blog: formattedBlog,
//             email: user.email,
//             profile_image_url,
//           })
//           .eq('user_id', user.id);

//         if (updateError) {
//           console.error('Error updating data:', updateError);
//           setError('Failed to update profile. Please try again.');
//           return;
//         }

//         setNickname(data.nickname);
//         setBlog(formattedBlog);
//       } else {
//         const { error: insertError } = await supabase.from('Users').insert({
//           user_id: user.id,
//           job_title,
//           experience,
//           nickname: data.nickname,
//           blog: formattedBlog,
//           email: user.email,
//           profile_image_url,
//         });

//         if (insertError) {
//           console.error('Error inserting data:', insertError);
//           setError('Failed to save profile. Please try again.');
//           return;
//         }

//         setNickname(data.nickname);
//         setBlog(formattedBlog);
//       }

//       nextStep();
//     } catch (err) {
//       console.error('Unexpected error:', err);
//       setError('An unexpected error occurred. Please try again.');
//     }
//   };

//   return { onSubmit, error, blogError };
// };

// export default useSubmitProfile;