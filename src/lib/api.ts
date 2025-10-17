import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}