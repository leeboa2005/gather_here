'use client';

import LoginForm from "@/components/Login/LoginForm";
import { useModal } from "@/provider/ContextProvider";

export default function LoginModalPage() {
    
    const { openModal } = useModal();
    return (
        openModal(
            <LoginForm />
        )      
    )
}