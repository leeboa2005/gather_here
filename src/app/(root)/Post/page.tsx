"use client";

import React, { useState, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import FormInput from "@/components/PostPage/FormInput";
import FormDropdown from "@/components/PostPage/FormDropdown";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const FormMultiSelect = dynamic(() => import("@/components/PostPage/FormMultiSelect"), { ssr: false });

interface Option {
  value: string;
  label: string;
}

const supabase = createClient();

const PostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [totalMembers, setTotalMembers] = useState<string>("");
  const [personalLink, setPersonalLink] = useState<string>("");
  const [targetPosition, setTargetPosition] = useState<Option[]>([]);
  const [recruitments, setRecruitments] = useState<string>("");
  const [techStack, setTechStack] = useState<Option[]>([]);
  const [deadline, setDeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      category,
      location,
      duration: Number(duration),
      total_members: Number(totalMembers),
      personal_link: personalLink,
      target_position: targetPosition.length > 0 ? `{${targetPosition.map((pos) => `"${pos.value}"`).join(",")}}` : "",
      recruitments: Number(recruitments),
      tech_stack: techStack.length > 0 ? `{${techStack.map((ts) => `"${ts.value}"`).join(",")}}` : "",
      deadline: deadline,
      content: content,
      place: place,
    };

    const { data, error } = await supabase.from("Posts").insert(payload);

    if (error) console.error("데이터 안들어간다:", error);
    else console.log("데이터 잘들어간다:", data);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
    };

  const handleMultiSelectChange =
    (setter: React.Dispatch<React.SetStateAction<Option[]>>) => (selectedOptions: Option[]) => {
      setter(selectedOptions);
    };

  const categoryOptions: Option[] = [
    { value: "스터디", label: "스터디" },
    { value: "프로젝트", label: "프로젝트" },
  ];

  const locationOptions: Option[] = [
    { value: "서울", label: "서울" },
    { value: "부산", label: "부산" },
    { value: "인천", label: "인천" },
    { value: "광주", label: "광주" },
  ];

  const durationOptions: Option[] = [
    { value: "1", label: "1개월" },
    { value: "2", label: "2개월" },
    { value: "3", label: "3개월" },
    { value: "6", label: "6개월" },
    { value: "7", label: "6개월 이상" },
  ];

  const totalMembersOptions: Option[] = [
    { value: "5", label: "5명" },
    { value: "10", label: "10명" },
  ];

  const targetPositionOptions: Option[] = [
    { value: "개발자", label: "개발자" },
    { value: "디자이너", label: "디자이너" },
  ];

  const recruitmentsOptions: Option[] = [
    { value: "1", label: "1명" },
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
  ];

  const techStackOptions: Option[] = [
    { value: "React", label: "React" },
    { value: "Vue", label: "Vue" },
    { value: "Python", label: "Python" },
  ];

  const placeOptions: Option[] = [
    { value: "온라인", label: "온라인" },
    { value: "오프라인", label: "오프라인" },
    { value: "온/오프라인", label: "온/오프라인" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <FormInput label="제목" value={title} onChange={handleInputChange(setTitle)} maxLength={30} />
      <FormDropdown label="분류" options={categoryOptions} value={category} onChange={handleInputChange(setCategory)} />
      <FormDropdown label="지역" options={locationOptions} value={location} onChange={handleInputChange(setLocation)} />
      <FormDropdown label="기간" options={durationOptions} value={duration} onChange={handleInputChange(setDuration)} />
      <FormDropdown
        label="총 인원"
        options={totalMembersOptions}
        value={totalMembers}
        onChange={handleInputChange(setTotalMembers)}
      />
      <FormInput label="연락 방법" value={personalLink} onChange={handleInputChange(setPersonalLink)} />
      <FormMultiSelect
        label="모집 대상"
        options={targetPositionOptions}
        value={targetPosition}
        onChange={handleMultiSelectChange(setTargetPosition)}
      />
      <FormDropdown
        label="모집 인원"
        options={recruitmentsOptions}
        value={recruitments}
        onChange={handleInputChange(setRecruitments)}
      />
      <FormMultiSelect
        label="기술 스택"
        options={techStackOptions}
        value={techStack}
        onChange={handleMultiSelectChange(setTechStack)}
      />
      <FormDropdown label="장소" options={placeOptions} value={place} onChange={handleInputChange(setPlace)} />
      <FormInput label="마감일" type="date" value={deadline || ""} onChange={handleInputChange(setDeadline)} />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">내용</label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        제출
      </button>
    </form>
  );
};

export default PostPage;
