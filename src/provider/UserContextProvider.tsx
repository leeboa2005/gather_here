"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  userData: any;
  setUserData: (data: any) => void;
  fetchUserData: () => Promise<void>;
  loading: boolean;
  initializationUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  userData: null,
  setUserData: () => {},
  fetchUserData: async () => {},
  loading: true,
  initializationUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  const fetchUserAndData = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("사용자 정보 불러오기 실패:", error.message);
        return;
      }

      setUser(user);

      if (user) {
        const { data, error: dataError } = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", user.id)
          .limit(1)
          .single();

        if (dataError) {
          console.error("사용자 데이터 불러오기 실패:", dataError.message);
        } else {
          setUserData(data || null);
        }
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchUserData = useCallback(async () => {
    if (!user) {
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.from("Users").select("*").eq("user_id", user.id).limit(1).single();

      if (error) {
        console.error("사용자 데이터 불러오기 실패:", error.message);
      } else {
        setUserData(data || null);
      }
    } catch (error) {
      console.error("사용자 데이터 불러오기 중 예외 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const initializationUser = useCallback(() => {
    setUserData(null);
    setUser(null);
  }, []);

  useEffect(() => {
    fetchUserAndData();
  }, [fetchUserAndData]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  const contextValue = {
    user,
    userData,
    setUserData,
    fetchUserData,
    loading,
    initializationUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser는 UserProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
};
