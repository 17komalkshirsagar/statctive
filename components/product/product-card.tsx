"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${product.name} added to wishlist`);
  };

  return (
    <motion.div 
      className={cn(
        "group relative rounded-lg overflow-hidden bg-card border",
        featured && "md:col-span-2"
      )}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
              {product.discount}% OFF
            </Badge>
          )}
          
          {isHovered && product.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-primary" : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="absolute inset-0 opacity-0 bg-black/5 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Button size="icon" variant="secondary" onClick={handleToggleWishlist}>
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" asChild>
              <Link href={`/products/${product.slug}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
            </div>
            <div className="flex items-center">
              {product.discount > 0 ? (
                <>
                  <span className="text-sm line-through text-muted-foreground mr-2">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="font-semibold text-primary">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}