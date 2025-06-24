import { Link, usePage } from "@inertiajs/react";
import TextLink from "./text-link";
import { ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import AppLogo from "./app-logo";
import { buttonVariants } from "./ui/button";
import { SharedData } from "@/types";
import Cart from "./cart";
import WalletButton from "./wallet-button";
export default function Header() {
  const page = usePage<SharedData>();
  const { auth } = page.props;

  return(
      <header className="mx-auto flex flex-col p-4 max-w-7xl w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AppLogo />
        </div>
        <Input type="search" className="dark:bg-white dark:text-black w-72 focus:w-80 hidden lg:block transition-all" placeholder="Search..."/>
        <div className="flex gap-4 items-center">
          <Cart />
          { auth.user ?
          <div className="flex items-center gap-2">
            <WalletButton />
            <Link href={route('dashboard')} className={buttonVariants({variant: 'outline'})}>
              Dashboard
            </Link> 
          </div>
          :
          <div className="flex gap-2">
            <Link href={route('login')} className={buttonVariants({variant: 'default'})}>
              Login
            </Link>
            <Link href={route('register')} className={buttonVariants({variant: 'outline'})}>
              Register
            </Link>    
          </div>
          }
        </div>
      </div>
      <nav className="flex gap-2 items-center p-4">
        <div className="flex gap-2 items-center">
          <TextLink href="">Home</TextLink>
          <TextLink href={route('products')}>Store</TextLink>
          <TextLink href="">About</TextLink>
          <TextLink href="">Contact</TextLink>
        </div>
      </nav>        
    </header>
  );
}