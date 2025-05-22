"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/data/categories";
import Image from "next/image";

export function CategoriesShowcase() {
  return (
    <section className="py-16 bg-muted/50 dark:bg-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">Browse our curated collections</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/categories/${category.slug}`}
                className="group block relative h-[300px] rounded-lg overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{category.productCount} Products</p>
                  <div className="mt-4 inline-flex items-center text-white font-medium">
                    Explore <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}