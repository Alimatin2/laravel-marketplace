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
import HomeLayout from "@/layouts/home-layout";
import { Product } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";

export default function Home(){
  const { products } = usePage<{ products: Product[] }>().props;

  return(
    <HomeLayout>
      <Block header="Products" className="dark:bg-zinc-900 dark:text-white bg-zinc-200 text-white" link={"test"}>
        <Carousel>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem className="basis-1/3 lg:basis-1/4" key={product.id}>
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </Block>
    </HomeLayout>
  );
}