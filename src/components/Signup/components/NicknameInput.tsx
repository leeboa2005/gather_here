import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FormValues } from "../Signup03";

interface NicknameInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  nicknameAvailable: boolean | null;
  watch: UseFormWatch<FormValues>;
}

const NicknameInput: React.FC<NicknameInputProps> = ({ register, errors, nicknameAvailable, watch }) => {
  const nickname = watch("nickname");

  const hasSpecialCharacter = (value: string) => /[^a-zA-Z0-9가-힣_]/.test(value);

  const getLengthMessageClass = () => {
    if (nickname && (nickname.length < 2 || nickname.length > 11)) {
      return "text-red-500";
    } else if (nickname && nickname.length >= 2 && nickname.length <= 11 && !hasSpecialCharacter(nickname)) {
      return "text-green-500";
    } else {
      return "text-gray-500";
    }
  };

  const getNicknameMessageClass = () => {
    if (errors.nickname && errors.nickname.type === "validate") {
      return "text-red-500";
    } else if (
      nicknameAvailable === true &&
      !hasSpecialCharacter(nickname) &&
      nickname.length >= 2 &&
      nickname.length <= 11
    ) {
      return "text-green-500";
    } else if (nicknameAvailable === false) {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  const getSpecialCharacterMessageClass = () => {
    if (hasSpecialCharacter(nickname)) {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  return (
    <div className="s:mt-6 mt-9">
      <label className="block text-sm ml-5 font-medium text-[#bebec1]">
        닉네임 <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        {...register("nickname", {
          required: "닉네임을 입력해주세요.",
          minLength: { value: 2, message: "닉네임은 2 ~ 11자 내로 작성해주세요." },
          maxLength: { value: 11, message: "닉네임은 2 ~ 11자 내로 작성해주세요." },
          validate: (value) => {
            if (value.trim() === "") return "닉네임에 공백이 포함될 수 없습니다.";
            if (/\s/.test(value)) return "닉네임에 공백이 포함될 수 없습니다.";
            if (hasSpecialCharacter(value)) return "닉네임에 공백 및 특수문자가 포함될 수 없습니다.";
            return true;
          },
        })}
        className="block focus:outline-primaryHeavy s:w-[300px] w-[350px] s:mt-1 mt-3 ml-5 h-[50px] p-2 bg-background rounded-md border-2 border-fillLight"
      />
      <p className={`text-xs mt-2 ml-5 ${getLengthMessageClass()}`}>
        {nickname && (nickname.length < 2 || nickname.length > 11)
          ? "닉네임은 2 ~ 11자 내로 작성해주세요."
          : "닉네임은 2 ~ 11자 내로 작성해주세요."}
      </p>
      {hasSpecialCharacter(nickname) && (
        <p className={`text-xs mt-2 ml-5 ${getSpecialCharacterMessageClass()}`}>
          닉네임에 공백 및 특수문자가 포함될 수 없습니다.
        </p>
      )}
      {nicknameAvailable === false && <p className="text-xs text-red-500 mt-1 ml-5">이미 사용 중인 닉네임입니다.</p>}
      {nicknameAvailable === true &&
        nickname &&
        nickname.length >= 2 &&
        nickname.length <= 11 &&
        !hasSpecialCharacter(nickname) && <p className="text-xs text-green-500 mt-1 ml-5">사용 가능한 닉네임입니다.</p>}
    </div>
  );
};

export default NicknameInput;
