import { LoginForm } from "@components/features/auth/LoginForm";
import { LoginIllustration } from "@components/features/auth/LoginIllustration";

export default function LoginPage() {
  return (
    <div className="h-screen w-full bg-background flex items-center justify-center px-8 overflow-hidden">
      <div className="bg-card rounded-[24px] overflow-hidden flex w-full max-w-[1000px] h-[560px] shadow-strong">
        <LoginForm />
        <LoginIllustration />
      </div>
    </div>
  );
}