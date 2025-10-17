// src/components/home/HeroSection.tsx
"use client"; // safe to add so we can read theme if needed (optional)

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Fall/Winter Collection"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
      </div>

      <div
        className="
          absolute inset-0 z-10
          bg-black/30 dark:bg-black/60
          flex flex-col justify-center px-6
          transition-colors duration-300
        "
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
          Discover Our Fall/Winter 2025 Collection
        </h1>
        <p className="text-sm md:text-base text-gray-200">
          Step into the season with fresh new arrivals.
        </p>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60" />
    </section>
  );
}