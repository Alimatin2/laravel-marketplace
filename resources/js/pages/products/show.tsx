import HomeLayout from '@/layouts/home-layout';
import { CartItem, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';

export default function ProductShow() {
    const { items, addToCart, removeFromCart } = useCart();
    const { product } = usePage<{ product: Product }>().props;
    const [quantity, setQuantity] = useState(1);

    const isInCart = items.some(item => item.id === product.id);
    const cartItem = items.find(item => item.id === product.id);

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.discount > 0 ? product.discounted_price : product.price,
            quantity: quantity,
            image: product.image,
            stock: product.stock,
        };

        addToCart(cartItem);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
    };

    return (
        <HomeLayout>
            <Head title={product.name} />
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <img
                                src={`/storage/products/${product.image}`}
                                alt={product.name}
                                className="aspect-square w-full object-cover"
                            />
                        </CardContent>
                    </Card>


                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-muted-foreground mt-2">{product.description}</p>
                        </div>

                        <Separator />

                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold">${product.discounted_price.toFixed(2)}</span>
                            {product.discount > 0 && (
                                <>
                                    <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                                    <span className="text-green-600 font-medium">{product.discount}% OFF</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={isInCart}
                                >
                                    -
                                </Button>
                                <span className="w-8 text-center">{isInCart ? cartItem?.quantity : quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={isInCart}
                                >
                                    +
                                </Button>
                            </div>
                            <Button 
                                className={`flex-1 ${isInCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                size="lg"
                                onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
                                disabled={product.stock === 0 && !isInCart}
                                variant={isInCart ? "default" : "default"}
                            >
                                {isInCart ? (
                                    <>
                                        <Check className="mr-2 h-5 w-5" />
                                        In Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                {product.stock > 0 
                                    ? `${product.stock} units in stock` 
                                    : 'Currently out of stock'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
