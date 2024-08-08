// // components/NicknameInput.tsx
// import React from 'react';
// import { UseFormRegister, FieldErrors } from 'react-hook-form';
// import { FormValues } from '../Signup03';

// interface NicknameInputProps {
//   register: UseFormRegister<FormValues>;
//   errors: FieldErrors<FormValues>;
//   nicknameAvailable: boolean | null;
// }

// const NicknameInput: React.FC<NicknameInputProps> = ({ register, errors, nicknameAvailable }) => (
//   <div className="s:mt-6 mt-9">
//     <label className="block text-sm ml-5 font-medium text-[#bebec1]"> 닉네임 </label>
//     <input
//       type="text"
//       placeholder="닉네임을 입력해주세요"
//       {...register('nickname', { required: '닉네임을 입력해주세요.', minLength: { value: 2, message: '닉네임은 2 ~ 11자 사이여야 합니다.' }, maxLength: { value: 11, message: '닉네임은 2 ~ 11자 사이여야 합니다.' } })}
//       className="block s:w-[300px] w-[350px] s:mt-1 mt-3 ml-5 h-[50px] p-2 bg-background rounded-md border-2 border-fillLight"
//     />
//     <p className="text-xs text-gray-500 mt-2 ml-5">닉네임은 2 ~ 11자 내로 작성해주세요.</p>
//     {errors.nickname && <p className="text-xs text-red-500 mt-1 ml-5">{errors.nickname.message}</p>}
//     {nicknameAvailable === false && <p className="text-xs text-red-500 mt-1 ml-5">이미 사용 중인 닉네임입니다.</p>}
//     {nicknameAvailable === true && <p className="text-xs text-green-500 mt-1 ml-5">사용 가능한 닉네임입니다.</p>}
//   </div>
// );

// export default NicknameInput;