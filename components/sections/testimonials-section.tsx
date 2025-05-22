"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Customers Say</h2>
          <p className="mt-2 text-muted-foreground">Hear from our satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-card rounded-lg p-6 shadow-sm border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-card-foreground mb-6 italic">"{testimonial.text}"</p>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}