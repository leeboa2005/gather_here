"use client"

import SignupForm from "@/components/Signup/SigupForm";
import { useModal } from "@/provider/ContextProvider";
import { useEffect } from 'react';


const SignupPage = () => {
  const { openModal } = useModal();

  useEffect(() => {
    
    openModal(
      <SignupForm />
    );
  },[])
  
  
  return (
    <>
    </>
  );
};

export default SignupPage;
