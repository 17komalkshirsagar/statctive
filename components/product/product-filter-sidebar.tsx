"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";

export function ProductFilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const categories = [
    { id: "clothing", label: "Clothing" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ];
  
  const colors = [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "blue", label: "Blue" },
    { id: "brown", label: "Brown" },
    { id: "gray", label: "Gray" },
    { id: "red", label: "Red" },
  ];
  
  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ];
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => 
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => 
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };
  
  const toggleSize = (sizeId: string) => {
    setSelectedSizes((prev) => 
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };
  
  const clearAllFilters = () => {
    setPriceRange([0, 300]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };
  
  const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 300;
  
  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
            Clear All
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Price Range */}
        <div className="pb-4 border-b">
          <h4 className="font-medium mb-4">Price Range</h4>
          <Slider
            defaultValue={[0, 300]}
            max={300}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm">${priceRange[0]}</p>
            <p className="text-sm">${priceRange[1]}</p>
          </div>
        </div>
        
        {/* Categories */}
        <Accordion type="multiple" defaultValue={["categories"]}>
          <AccordionItem value="categories" className="border-b">
            <AccordionTrigger className="py-3 text-base font-medium">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Colors */}
        <Accordion type="multiple" defaultValue={["colors"]}>
          <AccordionItem value="colors" className="border-b">
            <AccordionTrigger className="py-3 text-base font-medium">Colors</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.id}`}
                      checked={selectedColors.includes(color.id)}
                      onCheckedChange={() => toggleColor(color.id)}
                    />
                    <label
                      htmlFor={`color-${color.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {color.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Sizes */}
        <Accordion type="multiple" defaultValue={["sizes"]}>
          <AccordionItem value="sizes" className="border-b">
            <AccordionTrigger className="py-3 text-base font-medium">Sizes</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {sizes.map((size) => (
                  <div key={size.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size.id}`}
                      checked={selectedSizes.includes(size.id)}
                      onCheckedChange={() => toggleSize(size.id)}
                    />
                    <label
                      htmlFor={`size-${size.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {size.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="pt-4">
            <h4 className="font-medium mb-2">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find(c => c.id === categoryId);
                return (
                  <Button
                    key={categoryId}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toggleCategory(categoryId)}
                  >
                    {category?.label} <X className="ml-1 h-3 w-3" />
                  </Button>
                );
              })}
              
              {selectedColors.map((colorId) => {
                const color = colors.find(c => c.id === colorId);
                return (
                  <Button
                    key={colorId}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toggleColor(colorId)}
                  >
                    {color?.label} <X className="ml-1 h-3 w-3" />
                  </Button>
                );
              })}
              
              {selectedSizes.map((sizeId) => {
                const size = sizes.find(s => s.id === sizeId);
                return (
                  <Button
                    key={sizeId}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toggleSize(sizeId)}
                  >
                    {size?.label} <X className="ml-1 h-3 w-3" />
                  </Button>
                );
              })}
              
              {(priceRange[0] > 0 || priceRange[1] < 300) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setPriceRange([0, 300])}
                >
                  ${priceRange[0]} - ${priceRange[1]} <X className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}