"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { Product } from "@/lib/types";
import Link from "next/link";
import { toast } from "sonner";

interface CartItemProps {
  item: Product & { quantity: number };
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleRemove = () => {
    removeItem(item.id);
    toast.success(`${item.name} removed from cart`);
  };
  
  const finalPrice = item.discount > 0
    ? item.price * (1 - item.discount / 100)
    : item.price;
  
  return (
    <div className="flex py-4 border-b">
      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted relative flex-shrink-0">
        <Image
          src={item.images[0]}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-medium hover:underline line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {item.category}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center h-8 border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <div className="font-medium">
              ${(finalPrice * item.quantity).toFixed(2)}
            </div>
            {item.discount > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}