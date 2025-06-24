import { AppContent } from "@/components/app-content";
import { AppHeader } from "@/components/app-header";
import AppLogo from "@/components/app-logo";
import { AppShell } from "@/components/app-shell";
import Block from "@/components/block";
import Header from "@/components/header";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import ProductCard from "@/components/product-card";
import TextLink from "@/components/text-link";
import { buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";

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