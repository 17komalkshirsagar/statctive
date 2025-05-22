"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilterSidebar } from "@/components/product/product-filter-sidebar";
import { featuredProducts, newArrivals } from "@/lib/data/products";

export default function ClothingPage() {
  const allProducts = [...featuredProducts, ...newArrivals].filter(
    (product) => product.category.toLowerCase() === "clothing"
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilterSidebar />
        </aside>
        
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Clothing</h1>
            <p className="mt-2 text-muted-foreground">
              Discover our latest clothing collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}