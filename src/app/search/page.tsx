"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getAllProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import { ChevronDown } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const all = await getAllProducts();
      const filtered = all.filter((p: Product) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    };
    fetchProducts();
  }, [query]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prev) => prev + 8);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">
        Search Results For{" "}
        <span className="text-orange-500">“{query}”</span>
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Displaying{" "}
        <span className="text-orange-500">
          {Math.min(visible, products.length)}
        </span>{" "}
        - <span className="text-orange-500">{products.length}</span> products
      </p>

      <div className="flex justify-end mb-6">
        <div className="relative inline-block">
          <select
            className="
              appearance-none
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-100
              text-sm text-gray-800 dark:text-gray-900
              rounded-md
              px-4 pr-10 py-2.5
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-orange-500
              transition-all duration-300
            "
          >
            <option value="">Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronic</option>
          </select>

          <ChevronDown
            size={18}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-500 dark:text-gray-700
              pointer-events-none
            "
          />
        </div>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.slice(0, visible).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visible < products.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="
                  px-6 py-2.5
                  border border-gray-300 dark:border-gray-600
                  rounded-md shadow-sm
                  text-sm font-medium
                  hover:bg-orange-500 hover:text-white
                  transition-colors duration-300
                "
                disabled={loading}
              >
                {loading ? "Loading..." : "Muat lebih banyak"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 mt-8 text-center">
          Tidak ada hasil untuk “{query}”
        </p>
      )}
    </section>
  );
}