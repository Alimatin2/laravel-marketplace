import InputError from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import SellerLayout from "@/layouts/seller/layout";
import { BreadcrumbItem, SharedData, Vendor } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

type InvitationForm = { 
  email: string,
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
  const { vendor } = usePage<SharedData & {vendor: Vendor}>().props;
  const { data, setData, post, processing, errors, reset } = useForm<Required<InvitationForm>>({
    email: "",
  });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('seller.users.store', {vendor: vendor}), {
            onFinish: () => reset('email'),
        });
    };

  return(
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Invite new seller" />
      <SellerLayout vendor_id={vendor.id}>
        <form onSubmit={submit} className="p-4 flex flex-col gap-2">
          <Input 
            id="email"
            type="text" 
            placeholder="Email" 
            value={data.email} 
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError message={errors.email} />
          <Button type="submit" disabled={processing}>Send request</Button>
        </form>
      </SellerLayout>

    </AppLayout>
  );
}