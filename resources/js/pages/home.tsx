import ProductCard from "@/components/product/product-card";
import Block from "@/components/structure/block";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import HomeLayout from "@/layouts/home-layout";
import { Product } from "@/types";
import { usePage } from "@inertiajs/react";

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
