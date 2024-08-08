// // components/BlogInput.tsx
// import React from 'react';
// import { UseFormRegister } from 'react-hook-form';
// import { FormValues } from '../Signup03';

// interface BlogInputProps {
//   register: UseFormRegister<FormValues>;
//   blogError: string | null;
// }

// const BlogInput: React.FC<BlogInputProps> = ({ register, blogError }) => (
//   <div className="s:mt-4 mt-9">
//     <label className="block text-sm ml-5 font-medium text-[#bebec1]">URL </label>
//     <input
//       type="text"
//       placeholder="URL을 입력해주세요"
//       {...register('blog')}
//       className="block s:w-[300px] w-[350px] s:mt-1 mt-3 ml-5 h-[50px] p-2 bg-background rounded-md border-2 border-fillLight"
//     />
//     <p className="text-xs text-gray-500 ml-5 mt-2">Blog / Github / Notion / Tistory / Velog / Figma / Etc </p>
//     {blogError && <p className="text-xs text-red-500 s:mt-1 mt-1 ml-5 ">{blogError}</p>}
//   </div>
// );

// export default BlogInput;