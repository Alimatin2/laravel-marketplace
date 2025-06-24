import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HomeLayout from "@/layouts/home-layout";
import { SharedData } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react"; 

export default function Wallet() {
  const { balance } = usePage<SharedData & {balance: number}>().props;
  const { setData, data, post, processing, errors } = useForm({
    balance: 0,
  });

  const setAmount = (amount: number) => {
    setData('balance', amount);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('wallet.update'));
  }

  return(
    <HomeLayout>
      <Head title="Wallet"/>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Increase your wallet balance.</p>
      </div>

      <div className="flex flex-col items-center gap-4 justify-center">
        <h2 className="text-3xl font-bold">Current balance: {balance}</h2>

        <form className="space-y-2 w-fit" onSubmit={handleSubmit}>

          <Input name="balance" placeholder="Balance" type="number" step={10000} min={0}
          onChange={(e) => setData('balance', Number(e.target.value))}
          value={data.balance}
          />
          <InputError message={errors.balance}/>

          <div className="flex flex-wrap gap-2">
            {
              [...Array(5)].map((_,i) => {
                return(
                  <Button key={i} type="button" variant={"outline"} onClick={() => setAmount(i * 100000)}>
                    {(i * 100000).toLocaleString()}
                  </Button>
                );
              })
            }
          </div>
          <RadioGroup defaultValue="zarinpal" className="my-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zarinpal" id="zarinpal"/>
              <Label htmlFor="zarinpal">Zarinpal</Label>
            </div>
          </RadioGroup>
          <Button className="w-full">Pay</Button>
        </form>
      </div>
    </HomeLayout>
  );
}