import { Sidebar } from "@components/layout/Sidebar";
import { Header } from "@components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar doctorName="Dr. Julien" specialty="Pneumologue" initials="DJ" />

      {/* lg:pl-[280px] compense la Sidebar fixed (desktop uniquement) */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-70">
        <Header />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}