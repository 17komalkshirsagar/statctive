"use client";

import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (product.colors && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast.success(`${product.name} added to cart`);
  };
  
  const finalPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  return (
    <div>
      {/* Product Title and Category */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        <p className="text-muted-foreground mt-1">{product.category}</p>
      </div>
      
      {/* Price */}
      <div className="mt-4 flex items-center">
        {product.discount > 0 ? (
          <>
            <span className="text-xl md:text-2xl font-bold text-primary">
              ${finalPrice.toFixed(2)}
            </span>
            <span className="text-muted-foreground line-through ml-2">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="destructive" className="ml-3">
              {product.discount}% OFF
            </Badge>
          </>
        ) : (
          <span className="text-xl md:text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>
      
      {/* Rating */}
      {product.rating && (
        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating as number) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      )}
      
      {/* Description */}
      <p className="mt-6 text-muted-foreground">{product.description}</p>
      
      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`h-10 px-3 rounded-md border transition-all ${
                  selectedColor === color
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-input hover:border-primary"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Size</h3>
            <Button variant="link" className="p-0 h-auto text-sm">Size Guide</Button>
          </div>
          
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={size}
                  id={`size-${size}`}
                  className="hidden"
                />
                <Label
                  htmlFor={`size-${size}`}
                  className={`h-10 w-10 flex items-center justify-center rounded-md border cursor-pointer transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:border-primary"
                  }`}
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
      
      {/* Quantity */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">Quantity</h3>
        <div className="flex items-center w-32 h-10 border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-full rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <div className="flex-1 text-center">{quantity}</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-full rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      
      {/* Add to Cart and Wishlist */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <motion.div 
          className="flex-1"
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </motion.div>
        
        <Button variant="outline" size="icon" className="h-12 w-12">
          <Heart className="h-5 w-5" />
        </Button>
        
        <Button variant="outline" size="icon" className="h-12 w-12">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <p>Our {product.name} is crafted with premium materials to ensure longevity and comfort. Each piece is carefully inspected to meet our high-quality standards.</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Premium quality materials</li>
                <li>Designed for comfort and style</li>
                <li>Easy care instructions</li>
                <li>Versatile for multiple occasions</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <div className="space-y-4">
              <p>We offer multiple shipping options to meet your needs:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Standard Shipping (3-5 business days): $5.99</li>
                <li>Express Shipping (1-2 business days): $12.99</li>
                <li>Free shipping on orders over $75</li>
                <li>International shipping available to select countries</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="returns" className="pt-4">
            <div className="space-y-4">
              <p>We want you to be completely satisfied with your purchase:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>30-day return policy for unworn items</li>
                <li>Free returns for exchanges or store credit</li>
                <li>Original shipping fees are non-refundable</li>
                <li>See our full return policy for more details</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}