"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { featuredProducts, newArrivals } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Combine products and filter out current product
  const allProducts = [...featuredProducts, ...newArrivals].filter(
    product => product.id !== currentProductId
  );
  
  // Get related products (similar category, tags, etc.)
  const currentProduct = allProducts.find(product => product.id === currentProductId);
  const relatedProducts = currentProduct
    ? allProducts.filter(product => 
        product.category === currentProduct.category ||
        product.tags.some(tag => currentProduct.tags.includes(tag))
      ).slice(0, 8)
    : allProducts.slice(0, 8);
  
  const scrollLeft = () => {
    const container = document.getElementById("related-products-container");
    if (container) {
      const newPosition = Math.max(scrollPosition - 300, 0);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };
  
  const scrollRight = () => {
    const container = document.getElementById("related-products-container");
    if (container) {
      const newPosition = Math.min(
        scrollPosition + 300,
        container.scrollWidth - container.clientWidth
      );
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };
  
  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-80 hover:opacity-100"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-80 hover:opacity-100"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div
        id="related-products-container"
        className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="min-w-[250px] sm:min-w-[280px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}