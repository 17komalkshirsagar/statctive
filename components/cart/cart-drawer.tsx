"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/components/cart/cart-provider";
import { ShoppingBag, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal } = useCart();
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" /> Your Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden">
          {items.length > 0 ? (
            <>
              <ScrollArea className="h-full pr-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </ScrollArea>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground text-center mt-2">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button
                className="mt-6"
                onClick={onClose}
                asChild
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="pt-4 border-t">
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button size="lg" asChild>
                <Link href="/checkout" onClick={onClose}>Checkout</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
            
            <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>Shipping and taxes calculated at checkout</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}