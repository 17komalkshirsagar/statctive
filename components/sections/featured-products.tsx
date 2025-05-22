"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import { featuredProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
    { id: "footwear", name: "Footwear" },
  ];
  
  const filteredProducts = activeCategory === "all" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between mb-12 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">Shop our most popular items curated for you</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}