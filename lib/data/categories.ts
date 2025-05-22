import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    slug: "clothing",
    description: "Explore our latest clothing collection for all seasons.",
    image: "https://images.pexels.com/photos/6046227/pexels-photo-6046227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 87,
    featured: true,
  },
  {
    id: "2",
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look with our stylish accessories.",
    image: "https://images.pexels.com/photos/3951790/pexels-photo-3951790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 56,
    featured: true,
  },
  {
    id: "3",
    name: "Footwear",
    slug: "footwear",
    description: "Step out in style with our premium footwear collection.",
    image: "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productCount: 42,
    featured: true,
  },
];