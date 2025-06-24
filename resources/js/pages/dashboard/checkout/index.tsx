import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { BreadcrumbItem } from "@/types";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import AppLayout from "@/layouts/app-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Home',
      href: '/',
  },
  {
      title: 'Checkout',
      href: '/checkout',
  },
];

type OrderForm = {
  name: string;
  email: string;
  address: string;
  postal_code: string;
  order: string;   
}

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const { data, setData, post, processing, errors } = useForm<OrderForm>({
    name: '',
    email: '',
    address: '',
    postal_code: '',
    order: JSON.stringify(items),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('checkout.create'), {
      preserveScroll: true,
      onSuccess: (response) => {
        //@ts-ignore
        const redirectUrl = response.redirect_url;
        if (redirectUrl) {
          router.visit(redirectUrl);
        }
      },
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Checkout" />
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-between p-4 gap-4">
      {
        items.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <Label>No items in cart</Label>
            <Link href="/" className={buttonVariants({variant: "default"})}>Go to home</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 lg:w-1/2">
              <h2>Details</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="Name" 
                value={data.name} 
                onChange={(e) => setData('name', e.target.value)}
              />
              <InputError message={errors.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Email" 
                value={data.email} 
                onChange={(e) => setData('email', e.target.value)}
              />
              <InputError message={errors.email} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                type="text" 
                placeholder="Address" 
                value={data.address} 
                onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input 
                id="postal_code"
                type="text" 
                placeholder="Postal Code" 
                value={data.postal_code} 
                onChange={(e) => setData('postal_code', e.target.value)}
              />
              <InputError message={errors.postal_code} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 border rounded-md lg:w-1/2 p-4">
            <h2>Your order</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">{totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <RadioGroup defaultValue="zarinpal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zarinpal" id="zarinpal"/>
                <Label htmlFor="zarinpal">Zarinpal</Label>
              </div>
            </RadioGroup>
            <Button type="submit" disabled={processing} className={buttonVariants({variant: "default"})}>
              {processing ? 'Processing...' : 'Pay now'}
            </Button>
          </div>
        </>
      )}
      </form>
    </AppLayout>
  );
}