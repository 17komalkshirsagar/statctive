import { Suspense } from "react";
import { ProductsGrid } from "@/components/product/products-grid";
import { ProductFilterSidebar } from "@/components/product/product-filter-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilterSidebar />
        </aside>
        
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="mt-2 text-muted-foreground">
              Browse our collection of premium products
            </p>
          </div>
          
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}