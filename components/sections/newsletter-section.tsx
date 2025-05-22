"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24">
      <motion.div 
        className="container px-4 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Stay Updated</h2>
          <p className="mt-4 text-muted-foreground">
            Subscribe to our newsletter to receive updates on new arrivals, special offers, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="sm:flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}