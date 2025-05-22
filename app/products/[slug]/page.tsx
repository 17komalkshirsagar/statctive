import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";
import { featuredProducts, newArrivals } from "@/lib/data/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Find the product by slug
  const product = [...featuredProducts, ...newArrivals].find(p => p.slug === params.slug);

  // If product not found, return 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </Suspense>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-muted">
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}
export async function generateStaticParams() {
  const allProducts = [...featuredProducts, ...newArrivals];
  return allProducts.map(product => ({
    slug: product.slug,
  }));
}