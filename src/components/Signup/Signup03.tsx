'use client';
import { createClient } from '@/utils/supabase/client';
import useSignupStore from '@/store/useSignupStore';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const supabase = createClient();

interface FormValues {
  nickname: string;
  blog: string;
}

const Signup03: React.FC = () => {
  const { nextStep, prevStep, setNickname, setBlog, setProfileImageUrl, user, job_title, experience, profile_image_url, setUser } = useSignupStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);
  const watchNickname = watch('nickname');
  const watchBlog = watch('blog');

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setProfileImageUrl(user.user_metadata.avatar_url);
    }
  }, [user, setProfileImageUrl]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, [setUser]);

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

  useEffect(() => {
    if (watchNickname) {
      if (watchNickname.length >= 2 && watchNickname.length <= 10) {
        checkNicknameAvailability(watchNickname);
      } else {
        setNicknameAvailable(null);
      }
    }
  }, [watchNickname]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    if (!user?.email) {
      setError('유효한 이메일을 확인할 수 없습니다.');
      return;
    }

    if (nicknameAvailable === false) {
      setError('이미 사용 중인 닉네임입니다.');
      return;
    }

    let formattedBlog = data.blog;
    if (!/^https?:\/\//i.test(data.blog)) {
      formattedBlog = 'http://' + data.blog;
    }

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6})' + // domain name with minimum two letters TLD
      '(:\\d+)?(\\/[-a-z\\d%_.~+\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF@]*)*' + // port and path with Unicode and @
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );

    if (formattedBlog && !urlPattern.test(formattedBlog)) {
      setBlogError('유효한 URL을 입력하세요.');
      return;
    }

    setError('');
    setBlogError('');

    try {
      const { data: userData, error: fetchError } = await supabase
        .from('Users')
        .select('user_id')
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError('Failed to fetch user data. Please try again.');
        return;
      }

      if (userData && userData.length > 0) {
        const { error: updateError } = await supabase
          .from('Users')
          .update({
            job_title,
            experience,
            nickname: data.nickname,
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

        setNickname(data.nickname);
        setBlog(formattedBlog);
      } else {
        const { error: insertError } = await supabase.from('Users').insert({
          user_id: user.id,
          job_title,
          experience,
          nickname: data.nickname,
          blog: formattedBlog,
          email: user.email,
          profile_image_url,
        });

        if (insertError) {
          console.error('Error inserting data:', insertError);
          setError('Failed to save profile. Please try again.');
          return;
        }

        setNickname(data.nickname);
        setBlog(formattedBlog);
      }

      nextStep();
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div className="s:w-[370px] s:h-[550px] w-[430px] h-[610px] relative bg-background rounded-[20px] p-4 select-none">
      {prevStep && (
        <button onClick={prevStep} className="absolute left-9 top-10 text-[c4c4c4]">
          &larr;
        </button>
      )}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
        <div className="w-[136px] s:h-18 h-20 justify-start items-center gap-2 inline-flex">
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">1</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium font-['Pretendard'] leading-[21px]">2</div>
          </div>
          <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#c3e88d] flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="self-stretch text-center text-[#c3e88d] text-sm font-medium font-['Pretendard'] leading-[21px]">3</div>
          </div>
        </div>
      </div>
  
      <div className="text-center text-2xl font-medium text-[#fffff] leading-9 mt-20">
        거의 다 왔어요!
      </div>
      <div className="text-center text-[#9a9a9a] s:mt-1 mt-3">
        자신을 나타낼 수 있는 포트폴리오 링크를 알려주시면 <br /> 함께 할 동료를 만나는 데 큰 도움이 될거예요.
      </div>
  
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="s:mt-6 mt-9">
          <label className="block text-sm ml-5 font-medium text-[#bebec1]"> 닉네임 </label>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', { required: '닉네임을 입력해주세요.', minLength: { value: 2, message: '닉네임은 2 ~ 11자 사이여야 합니다.' }, maxLength: { value: 11, message: '닉네임은 2 ~ 11자 사이여야 합니다.' } })}
            className="block s:w-[300px] w-[350px] s:mt-1 mt-3 ml-5 h-[50px] p-2 bg-background rounded-md border-2 border-fillLight"
          />
          <p className="text-xs text-gray-500 mt-2 ml-5">닉네임은 2 ~ 11자 내로 작성해주세요.</p>
          {errors.nickname && <p className="text-xs text-red-500 mt-1 ml-5">{errors.nickname.message}</p>}
          {nicknameAvailable === false && <p className="text-xs text-red-500 mt-1 ml-5">이미 사용 중인 닉네임입니다.</p>}
          {nicknameAvailable === true && <p className="text-xs text-green-500 mt-1 ml-5">사용 가능한 닉네임입니다.</p>}
        </div>
  
        <div className="s:mt-4 mt-9">
          <label className="block text-sm ml-5 font-medium text-[#bebec1]">URL </label>
          <input
            type="text"
            placeholder="URL을 입력해주세요"
            {...register('blog')}
            className="block s:w-[300px] w-[350px] s:mt-1 mt-3 ml-5 h-[50px] p-2 bg-background rounded-md border-2 border-fillLight"
          />
          <p className="text-xs text-gray-500 ml-5 mt-2">Blog / Github / Notion / Tistory / Velog / Figma / Etc </p>
          {blogError && <p className="text-xs text-red-500 s:mt-1 mt-1 ml-5 ">{blogError}</p>}
        </div>
  
        <div className="absolute s:bottom-8 bottom-9 left-1/2 transform -translate-x-1/2 w-full px-4">
          <button
            type="submit"
            className={`s:w-[300px] w-[350px] h-[40px] ml-5 py-2 rounded-md transition-transform transform hover:scale-105 active:scale-95 active:bg-gray-800 active:text-gray-200 ${
              watchNickname && watchBlog ? 'bg-[#c3e88d] text-[#343437] hover:bg-[#c3e88d] hover:text-[#343437]' : 'bg-[#343437] text-[#ffffff]'
            }`}
          >
            프로필 저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup03;