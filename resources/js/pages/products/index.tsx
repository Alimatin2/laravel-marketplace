import HomeLayout from '@/layouts/home-layout';
import { BreadcrumbItem, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/',

  },
  {
    title: 'Products',
    href: '/products',
  },
];

export default function Products() {
    const { products } = usePage<{ products: Product[] }>().props;

    return (
        <HomeLayout>
            <Head title="Products" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className='flex flex-wrap gap-2 justify-center'>
            {
              products.map((product, i) => {
                return(
                  <ProductCard
                    key={i}
                    product={product}
                  />
                );
              })
            }
            </div>
        </HomeLayout>
    );
}
