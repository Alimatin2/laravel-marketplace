import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import SellerLayout from "@/layouts/seller/layout";
import { BreadcrumbItem, ProductForm, SharedData, Vendor } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/dashboard/admin/products',
    },
    {
        title: 'Create',
        href: '/dashboard/admin/products/create',
    },
];

export default function SellerProductCreate() {
    const { vendor } = usePage<SharedData & { vendor: Vendor }>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<ProductForm>>({
        name: '',
        description: '',
        image: null,
        price: 0,
        stock: 0,
        discount: 0,
        is_active: true,
        vendor: vendor.id,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('seller.products.store', {vendor: vendor.id}), { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <SellerLayout vendor_id={vendor.id}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
              <h1 className="text-2xl font-bold">Create Product</h1>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    <InputError message={errors.description} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file" onChange={(e) => setData('image', e.target.files?.[0] ?? null)} />
                    <InputError message={errors.image} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', Number(e.target.value))} />
                    <InputError message={errors.price} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" value={data.stock} onChange={(e) => setData('stock', Number(e.target.value))} />
                    <InputError message={errors.stock} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="discount">Discount</Label>
                    <Input id="discount" type="number" value={data.discount} onChange={(e) => setData('discount', Number(e.target.value))} />
                    <InputError message={errors.discount} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="is_active">Status</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{data.is_active ? 'Active' : 'Inactive'}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setData('is_active', true)}>Active</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setData('is_active', false)}>Inactive</DropdownMenuItem> 
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <Button type="submit" disabled={processing}>Create</Button>
              </form>
            </div>
          </SellerLayout>
        </AppLayout>
    )
}