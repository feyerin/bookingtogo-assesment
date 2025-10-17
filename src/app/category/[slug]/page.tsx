// app/category/[slug]/page.tsx
import ProductGrid from "@/components/home/ProductGrid";
import { getAllProducts } from "@/lib/api";
import { notFound } from "next/navigation";

const categoryMap: Record<string, string> = {
  men: "men's clothing",
  women: "women's clothing",
  jewelry: "jewelery",
  electronic: "electronics",
};

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const products = await getAllProducts();

  const apiCategory = categoryMap[slug];
  if (!apiCategory) notFound();

  const filtered = products.filter(
    (p: any) => p.category.toLowerCase() === apiCategory.toLowerCase()
  );

  if (filtered.length === 0) notFound();

  const categoryTitle =
    slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">
            {categoryTitle}’s Product
          </h2>
          <p className="text-sm mb-6">
            See all new in from {categoryTitle.toLowerCase()} product here
          </p>

          <p className="text-sm ">
            Displaying{" "}
            <span className="text-orange-500">
              1 - {Math.min(8, filtered.length)}
            </span>{" "}
            of {filtered.length} products
          </p>
        </div>

        <ProductGrid initialProducts={filtered} showFilter={false} />
      </div>
    </div>
  );
}