/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "yrmjrxuealdugqizqtjg.supabase.co",
      // "https://lh3.googleusercontent.com",
      // "http://k.kakaocdn.net",
      // "https://avatars.githubusercontent.com",
      "lh3.googleusercontent.com", // 프로토콜 제거
      "k.kakaocdn.net", // 프로토콜 제거
      "avatars.githubusercontent.com", // 프로토콜 제거
    ],
  },
};
export default nextConfig;
