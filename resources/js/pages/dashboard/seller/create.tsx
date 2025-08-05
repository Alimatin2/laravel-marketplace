import InputError from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type VendorForm = { 
  name: string,
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/',

  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Vendors',
    href: '/dashboard/vendors',
  },
  {
    title: 'Join',
    href: '/dashboard/seller-form',
  },
];

export default function SellerForm() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<VendorForm>>({
    name: "",
  });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('seller.create'), {
            onFinish: () => reset('name'),
        });
    };

  return(
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Join as a seller" />
      <form onSubmit={submit} className="p-4 flex flex-col gap-2">
        <Input 
          id="name"
          type="text" 
          placeholder="Name" 
          value={data.name} 
          onChange={(e) => setData('name', e.target.value)}
        />
        <InputError message={errors.name} />
        <Button type="submit" disabled={processing}>Send request</Button>
      </form>
    </AppLayout>
  );
}