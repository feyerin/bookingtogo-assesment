import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/shared/StarRating";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-56">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 rounded-xl bg-[#EEF2F7]"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <div className="flex items-center gap-1 text-sm mb-1">
          <StarRating rating={product.rating.rate} />
          <span className="text-gray-500 text-xs">
            ({product.rating.count})
          </span>
        </div>
        <h3 className="text-sm font-medium line-clamp-2 mb-2 dark:text-black">
          {product.title}
        </h3>
        <p className="font-semibold text-black">
          {formatCurrency(product.price)}
        </p>
      </div>
    </Link>
  );
}