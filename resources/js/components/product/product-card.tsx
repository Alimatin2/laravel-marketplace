import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import { Check, CheckCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/types";
import { useEffect } from "react";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, items, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(items.some((item) => item.id === product.id));
  }, [items, product.id]);


  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.discount > 0 ? product.discounted_price : product.price,
      quantity: 1,
      image: product.image,
      stock: product.stock,
    };

    addToCart(cartItem);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col w-72 bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow hover:shadow-md transition duration-300 text-black dark:text-white gap-2">
      <Link
        href={`/products/${product.id}`}
        className="hover:opacity-90 transition"
      >
        <img
          src={`${product.image}`}
          alt={product.name}
          className="w-full h-56 object-cover rounded-md"
        />
      </Link>

      <Link
        href={`/products/${product.id}`}
        className="hover:underline font-semibold mt-2"
      >
        {product.name}
      </Link>

      <div className="flex justify-between items-center mb-10">
        {product.discount > 0 && product.discounted_price ? (
          <div className="flex flex-col text-xs">
            <div className="flex items-center gap-2">
              <p className="line-through text-gray-500 dark:text-gray-400">
                {formatter.format(product.price)}
              </p>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">
                -{product.discount}%
              </span>
            </div>
            <p className="text-base">
              {formatter.format(product.discounted_price)}
            </p>
          </div>
        ) : (
          <p className="text-black dark:text-white text-base">
            {formatter.format(product.price)}
          </p>
        )}

        <button
          className={`rounded-full border border-gray-300 dark:border-gray-600 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${isInCart ? "bg-green-400 text-white" : ""}`}
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          
        >
          {
            isInCart ? (
              <Check size={17} />
            ) : (
              <ShoppingCart size={17} />
            )
          }
        </button>
      </div>
    </div>
  );
}

