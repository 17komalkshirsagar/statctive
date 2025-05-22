"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 mix-blend-multiply" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }} 
        />
      </div>
      
      <div className="container relative z-10 px-4 py-16 mx-auto md:py-24 lg:py-32 xl:py-40">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Elevate Your Style With Our Latest Collection
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg text-gray-300 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover premium quality clothing that combines timeless elegance with contemporary trends. Shop the season's most coveted pieces.
          </motion.p>
          
          <motion.div 
            className="flex flex-col space-y-4 mt-8 sm:flex-row sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories">Explore Collections</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}