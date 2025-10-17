export async function getAllProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string | number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}