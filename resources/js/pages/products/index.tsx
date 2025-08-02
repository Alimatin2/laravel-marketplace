import HomeLayout from '@/layouts/home-layout';
import { BreadcrumbItem, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/structure/breadcrumbs';
import ProductCard from '@/components/product/product-card';

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
              products.length > 0 
              ?
              products.map((product, i) => {
                return(
                  <ProductCard
                    key={i}
                    product={product}
                  />
                );
              }) 
              :
              <p>No products available.</p>
            }
            </div>
        </HomeLayout>
    );
}
