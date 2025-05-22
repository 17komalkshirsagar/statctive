"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { featuredProducts, newArrivals } from "@/lib/data/products";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const allProducts = [...featuredProducts, ...newArrivals];

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("adminToken");
            router.push("/admin/login");
          }}
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>All products in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{allProducts.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>Revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$12,450</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Users online now</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>Latest products added to the store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.slice(0, 5).map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {product.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}