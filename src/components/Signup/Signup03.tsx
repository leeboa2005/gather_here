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
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null); 

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setProfileImageUrl(user.user_metadata.avatar_url);
    }
  }, [user, setProfileImageUrl]);

  const checkNicknameAvailability = async (nickname: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('nickname')
      .eq('nickname', nickname);

    if (error) {
      console.error('Error checking nickname availability:', error);
      return;
    }

    setNicknameAvailable(data.length === 0);
  };

  const handleNext = async () => {
    if (!user?.email) {
      setError('유효한 이메일을 확인할 수 없습니다.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 10) {
      setError('닉네임은 2 ~ 10자 사이여야 합니다.');
      return;
    }

    if (nicknameAvailable === false) {
      setError('이미 사용 중인 닉네임입니다.');
      return;
    }
    // URL 패턴 유효성 검사 정규식
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6})' + // domain name with minimum two letters TLD
      '(:\\d+)?(\\/[-a-z\\d%_.~+\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF@]*)*' + // port and path with Unicode and @
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );

    // URL에 프로토콜이 없으면 추가
    let formattedBlog = blog;
    if (!/^https?:\/\//i.test(blog)) {
      formattedBlog = 'http://' + blog;
    }

    // URL 유효성 검사
    if (formattedBlog && !urlPattern.test(formattedBlog)) {
      setBlogError('유효한 블로그 주소를 입력하세요.');
      return;
    }

    setError('');
    setBlogError('');

    try {
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
        const { error: updateError } = await supabase
          .from('Users')
          .update({
            job_title,
            experience,
            nickname,
            blog: formattedBlog,
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
        setBlog(formattedBlog);
      } else {
        const { error: insertError } = await supabase.from('Users').insert({
          user_id: user.id,
          job_title,
          experience,
          nickname,
          blog: formattedBlog,
          email: user.email,
          profile_image_url,
        });

        if (insertError) {
          console.error('Error inserting data:', insertError);
          setError('Failed to save profile. Please try again.');
          return;
        }

        setNickname(nickname);
        setBlog(formattedBlog);
      }

      nextStep();
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setLocalNickname(newNickname);
    setError(null);

    if (newNickname.length >= 2 && newNickname.length <= 10) {
      checkNicknameAvailability(newNickname);
    } else {
      setNicknameAvailable(null);
    }
  };

  const handleBlogChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalBlog(e.target.value);
    setBlogError(null);
  };

  return (
    <div className="w-[400px] h-[500px] relative bg-white rounded-[20px] p-4">
      {prevStep && (
        <button onClick={prevStep} className="absolute left-4 top-4 text-gray-500">
          &larr;
        </button>
      )}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">1</div>
        <div className="w-5 h-5 bg-gray-300 flex items-center justify-center text-black rounded-md">2</div>
        <div className="w-5 h-5 bg-gray-800 flex items-center justify-center text-white rounded-md">3</div>
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
        {nicknameAvailable === false && <p className="text-xs text-red-500 mt-1">이미 사용 중인 닉네임입니다.</p>}
        {nicknameAvailable === true && <p className="text-xs text-green-500 mt-1">사용 가능한 닉네임입니다.</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">블로그</label>
        <input
          type="text"
          placeholder="example.com"
          value={blog}
          onChange={handleBlogChange}
          className="block w-full mt-1 p-2 rounded-md border"
        />
        {blogError && <p className="text-xs text-red-500 mt-1">{blogError}</p>} {/* 블로그 에러 메시지 */}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
      <button
         onClick={handleNext}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-800 hover:text-white active:scale-95 active:bg-gray-800 active:text-gray-200"
        >
          프로필 저장하기
      </button>
      </div>
    </div>
  );
};

export default Signup03;