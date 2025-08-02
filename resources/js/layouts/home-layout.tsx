import { AppShell } from "@/components/structure/app-shell";
import Header from "@/components/structure/header";
import MobileBottomNav from "@/components/structure/mobile-bottom-nav";

export default function HomeLayout({ children }: { children: React.ReactNode }){

  return(
    <AppShell>
      <Header />
      <div className="p-4 max-w-7xl mx-auto w-full border rounded-md space-y-4">
        {children}
      </div>
      <MobileBottomNav />
    </AppShell>
  );
}