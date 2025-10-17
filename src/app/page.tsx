import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import { getAllProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getAllProducts(); 

  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <HeroSection />
      </div>
      <div className="!bg-[#EEF2F7] dark:bg-gray-900 h-[24px]">

      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProductGrid initialProducts={products} />
      </div>
    </div>
  );
}