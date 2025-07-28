import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import TextLink from "./text/text-link";

export default function WalletButton() {
  const { balance } = usePage<SharedData & {balance: number}>().props;

  return(
    <TextLink href="/wallet" className="text-sm text-muted-foreground">
      {
        balance > 0 ? (
          <p>
            Balance: {balance.toLocaleString()}
          </p>
        )
        :
        "Increase Balance"
      }
      </TextLink>
  );
}