import { Home, Info, List, Search, ShoppingCartIcon, User } from "lucide-react";
import TextLink from "../text/text-link";
import Cart from "../cart";
export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 flex justify-around items-center lg:hidden z-50 p-4">
      <TextLink href="/" className="flex flex-col items-center text-sm">
        <Home size={17} />
        Home
      </TextLink>
      <TextLink href="/" className="flex flex-col items-center text-sm">
        <Search size={17} />
        Search
      </TextLink>
      <Cart />
    </nav>
  );
}