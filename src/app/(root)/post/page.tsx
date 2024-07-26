"use client";

import React, { useState, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import FormInput from "@/components/MainDetail/FormInput";
import FormDropdown from "@/components/MainDetail/FormDropdown";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const FormMultiSelect = dynamic(() => import("@/components/MainDetail/FormMultiSelect"), { ssr: false });

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
      user_id: "2e47ab8c-da7a-4590-b114-b0512b1b22cd",
      title,
      category,
      location,
      duration: Number(duration),
      total_members: Number(totalMembers),
      personal_link: personalLink,
      target_position: targetPosition.map((pos) => pos.value),
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
    { value: "인천", label: "인천" },
    { value: "대전", label: "대전" },
    { value: "광주", label: "광주" },
    { value: "대구", label: "대구" },
    { value: "부산", label: "부산" },
    { value: "울산", label: "울산" },
    { value: "제주", label: "제주" },
  ];

  const durationOptions: Option[] = [
    { value: "1", label: "1개월" },
    { value: "2", label: "2개월" },
    { value: "3", label: "3개월" },
    { value: "6", label: "6개월" },
    { value: "7", label: "6개월 이상" },
  ];

  const totalMembersOptions: Option[] = [
    { value: "3", label: "3명 이하" },
    { value: "4", label: "4명" },
    { value: "5", label: "5명" },
    { value: "6", label: "6명" },
    { value: "7", label: "7명 이상" },
  ];

  const targetPositionOptions: Option[] = [
    { value: "프론트엔드", label: "프론트엔드" },
    { value: "백엔드", label: "백엔드" },
    { value: "디자이너", label: "디자이너" },
    { value: "IOS", label: "IOS" },
    { value: "안드로이드", label: "안드로이드" },
    { value: "데브옵스", label: "데브옵스" },
    { value: "PM", label: "PM" },
    { value: "기획자", label: "기획자" },
    { value: "마케터", label: "마케터" },
  ];

  const recruitmentsOptions: Option[] = [
    { value: "1", label: "1명" },
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
    { value: "4", label: "4명" },
    { value: "5", label: "5명" },
    { value: "6", label: "5명 이상" },
  ];

  const techStackOptions: Option[] = [
    { value: "AWS", label: "AWS" },
    { value: "Docker", label: "Docker" },
    { value: "Django", label: "Django" },
    { value: "Express", label: "Express" },
    { value: "Figma", label: "Figma" },
    { value: "Firebase", label: "Firebase" },
    { value: "Flutter", label: "Flutter" },
    { value: "Git", label: "Git" },
    { value: "Go", label: "Go" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Java", label: "Java" },
    { value: "Javascript", label: "Javascript" },
    { value: "Jest", label: "Jest" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Nestjs", label: "Nestjs" },
    { value: "Nextjs", label: "Nextjs" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "Php", label: "Php" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "ReactNative", label: "ReactNative" },
    { value: "Spring", label: "Spring" },
    { value: "Svelte", label: "Svelte" },
    { value: "Swift", label: "Swift" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Unity", label: "Unity" },
    { value: "Vue", label: "Vue" },
    { value: "Zeplin", label: "Zeplin" },
  ];

  const placeOptions: Option[] = [
    { value: "온라인", label: "온라인" },
    { value: "오프라인", label: "오프라인" },
    { value: "온/오프라인", label: "온/오프라인" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <FormInput
        label="제목"
        value={title}
        onChange={handleInputChange(setTitle)}
        maxLength={30}
        placeholder="제목을 입력해주세요"
      />
      <FormDropdown label="분류" options={categoryOptions} value={category} onChange={handleInputChange(setCategory)} />
      <FormDropdown label="지역" options={locationOptions} value={location} onChange={handleInputChange(setLocation)} />
      <FormDropdown label="기간" options={durationOptions} value={duration} onChange={handleInputChange(setDuration)} />
      <FormDropdown
        label="총 인원"
        options={totalMembersOptions}
        value={totalMembers}
        onChange={handleInputChange(setTotalMembers)}
      />
      <FormInput
        label="연락 방법"
        value={personalLink}
        onChange={handleInputChange(setPersonalLink)}
        placeholder="연락 방법을 입력해주세요"
      />
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
        <label className="block text-gray-700 text-sm font-bold mb-2"> 상세 내용</label>
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
