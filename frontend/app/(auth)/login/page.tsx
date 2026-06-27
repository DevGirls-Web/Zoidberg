import { LoginForm } from "@components/features/auth/LoginForm";
import { LoginIllustration } from "@components/features/auth/LoginIllustration";

export default function LoginPage() {
  return (
    <div className="h-screen w-full bg-background flex items-center justify-center px-8 overflow-hidden">
      <div className="flex w-full max-w-[1000px] h-[560px] rounded-[24px] bg-white/5 backdrop-blur-[8px] border border-white/10 shadow-2xl overflow-hidden">
        <LoginForm />
        <LoginIllustration />
      </div>
    </div>
  );
}