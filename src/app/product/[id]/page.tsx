import { getProductById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm dark:text-[#6E6E6E]">
        <nav className="flex items-center space-x-2">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>&gt;</span>
          <Link href={`/category/${product.category}`} className="hover:text-orange-500 capitalize">
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="truncate">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center justify-center bg-[#EEF2F7] p-8 rounded-md shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain max-h-[400px]"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>

          <div className="text-[#E56100] text-2xl font-semibold mb-2">
            ${product.price}
          </div>

          <div className="flex items-center gap-2 text-sm mb-4">
            <Star size={16} className="text-[#E56100] fill-[#E56100]" />
            <span>
              {product.rating?.rate ?? "-"} ({product.rating?.count ?? 0})
            </span>
          </div>

          <p className="leading-relaxed mb-6">
            {product.description}
          </p>

          <button
            disabled
            className="
              w-full py-3 rounded-md
              bg-[#6E6E6E] 
              text-gray-500 dark:text-gray-400
              font-medium cursor-not-allowed
            "
          >
            Sold out!
          </button>
        </div>
      </div>

    </div>
  );
}