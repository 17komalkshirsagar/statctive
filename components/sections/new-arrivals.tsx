"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { newArrivals } from "@/lib/data/products";
import { motion } from "framer-motion";
import Link from "next/link";

export function NewArrivals() {
  const [visibleProducts, setVisibleProducts] = useState(4);
  
  const showMoreProducts = () => {
    setVisibleProducts(Math.min(visibleProducts + 4, newArrivals.length));
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">New Arrivals</h2>
            <p className="mt-2 text-muted-foreground">Fresh styles added to our collection</p>
          </div>
          
          <Link href="/products/new-arrivals" className="hidden md:flex items-center text-sm font-medium hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {newArrivals.slice(0, visibleProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        
        {visibleProducts < newArrivals.length && (
          <div className="flex justify-center mt-12">
            <Button onClick={showMoreProducts} variant="outline" size="lg">
              Load More
            </Button>
          </div>
        )}
        
        <div className="flex justify-center mt-8 md:hidden">
          <Link href="/products/new-arrivals" className="text-sm font-medium hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}