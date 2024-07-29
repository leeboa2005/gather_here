'use client';

import { createClient } from '@/utils/supabase/client';
import useSignupStore from '@/store/useSignupStore';
import React, { useState, ChangeEvent, useEffect } from 'react';

const supabase = createClient();

const Signup03: React.FC = () => {
  const { nextStep, prevStep, setNickname, setBlog, setProfileImageUrl, user, job_title, experience, profile_image_url } = useSignupStore();
  const [nickname, setLocalNickname] = useState<string>('');
  const [blog, setLocalBlog] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setProfileImageUrl(user.user_metadata.avatar_url);
    }
  }, [user, setProfileImageUrl]);

  const handleNext = async () => {
    if (!user?.email) {
      setError('유효한 이메일을 확인할 수 없습니다.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 10) {
      setError('닉네임은 2 ~ 10자 사이여야 합니다.');
      return;
    }

    // // URL 패턴 유효성 검사 주석 처리 부분 활성화 (필요 시)
    // const urlPattern = new RegExp(
    //   '^(https?:\\/\\/)?' + // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //   '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    // );

    // if (blog && !urlPattern.test(blog)) {
    //   setError('유효한 블로그 주소를 입력하세요.');
    //   return;
    // }

    try {
      console.log('Attempting to insert data:', {
        user_id: user.id,
        job_title,
        experience,
        nickname,
        profile_image_url,
        blog,
        email: user.email,
      });

      // Check if the user already exists
      const { data, error: fetchError } = await supabase
        .from('Users')
        .select('user_id')
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError('Failed to fetch user data. Please try again.');
        return;
      }

      if (data && data.length > 0) {
        console.log('User already exists, updating profile.');
        // Update the existing user
        const { error: updateError } = await supabase
          .from('Users')
          .update({
            job_title,
            experience,
            nickname,
            blog,
            email: user.email,
            profile_image_url,
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating data:', updateError);
          setError('Failed to update profile. Please try again.');
          return;
        }

        setNickname(nickname);
        setBlog(blog);
        console.log('Profile updated:', { nickname, blog });
      } else {
        console.log('Inserting new user data.');
        // Insert new user
        const { error: insertError } = await supabase.from('Users').insert({
          user_id: user.id,
          job_title,
          experience,
          nickname,
          blog,
          email: user.email,
          profile_image_url,
        });

        if (insertError) {
          console.error('Error inserting data:', insertError);
          setError('Failed to save profile. Please try again.');
          return;
        }

        setNickname(nickname);
        setBlog(blog);
        console.log('Profile saved:', { nickname, blog });
      }

      nextStep();
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalNickname(e.target.value);
    setError(null);
  };

  const handleBlogChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalBlog(e.target.value);
    setError(null);
  };

  return (
    <div className="w-[400px] h-[500px] relative bg-white rounded-[20px] p-4">
      {prevStep && (
        <button onClick={prevStep} className="absolute left-4 top-4 text-gray-500">
          &larr;
        </button>
      )}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-black">1</div>
        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-black">2</div>
        <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-white">3</div>
      </div>
      <div className="text-center text-2xl font-medium text-gray-700 leading-9 mt-16">
        거의 다 왔어요
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">닉네임 *</label>
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          className="block w-full mt-1 p-2 rounded-md border"
        />
        <p className="text-xs text-gray-500 mt-1">2자 ~ 10자내로 작성해주세요.</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">블로그</label>
        <input
          type="text"
          placeholder="https://example.com"
          value={blog}
          onChange={handleBlogChange}
          className="block w-full mt-1 p-2 rounded-md border"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
        <button onClick={handleNext} className="w-full bg-blue-500 text-white py-2 rounded-md">
          프로필 저장하기
        </button>
      </div>
    </div>
  );
};

export default Signup03;