import { create } from 'zustand';

interface SignupState {
  step: number;
  job_title: string;
  experience: string;
  nickname: string;
  blog: string;
  profile_image_url: string;
  user: any;
  setJob: (job: string) => void;
  setExperience: (experience: string) => void;
  setNickname: (nickname: string) => void;
  setBlog: (blog: string) => void;
  setProfileImageUrl: (url: string) => void;
  setUser: (user: any, profileImageUrl?: string) => void;
  resetUser: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  job_title: '',
  experience: '',
  nickname: '',
  blog: '',
  profile_image_url: '',
  user: null,
  setJob: (job) => set({ job_title: job }),
  setExperience: (experience) => set({ experience }),
  setNickname: (nickname) => set({ nickname }),
  setBlog: (blog) => set({ blog }),
  setProfileImageUrl: (url) => set({ profile_image_url: url }),
  setUser: (user, profileImageUrl) => set({ user, profile_image_url: profileImageUrl ?? '' }),
  resetUser: () => set({
    step: 1,
    job_title: '',
    experience: '',
    nickname: '',
    blog: '',
    profile_image_url: '',
    user: null,
  }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
}));

export default useSignupStore;