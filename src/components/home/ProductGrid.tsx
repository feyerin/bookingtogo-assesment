"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/types/product";

interface Props {
  initialProducts: Product[];
  showFilter?: boolean;
}

export default function ProductGrid({ initialProducts, showFilter = true }: Props) {
  const [products] = useState<Product[]>(initialProducts);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prev) => prev + 8);
      setLoading(false);
    }, 800);
  };

  return (
    <section>
      {showFilter && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            All Products
          </h2>

          <div className="relative inline-block">
            <select
              className="
                appearance-none
                border border-gray-300
                bg-white 
                text-[14px] text-gray-800
                rounded-xl
                px-4 pr-26 py-3
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
                text-gray-500
                pointer-events-none
              "
            />
          </div>
        </div>
      )}

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
    </section>
  );
}