"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const categories = ["Men", "Women", "Jewelry", "Electronic"];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // --- Detect dark mode ---
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // --- Fetch data ketika user ngetik ---
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const filtered = data.filter((item: any) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5)); // limit hasil ke 5
      } catch (err) {
        console.error("Error fetching search:", err);
      }
    };

    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // --- Handle enter ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setResults([]);
    }
  };

  // --- Tutup dropdown kalau klik di luar ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Clear input ---
  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 transition-colors duration-500 shadow-md
        ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
      `}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Left: logo + menu */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-[16px] font-semibold transition-colors ${
              isDark
                ? "text-orange-400 hover:text-orange-300"
                : "text-orange-500 hover:text-orange-600"
            }`}
          >
            Orange Store
          </Link>

          <ul className="hidden md:flex gap-4 text-[16px]">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/category/${cat.toLowerCase()}`}
                  className={`transition-colors ${
                    isDark ? "hover:text-orange-400" : "hover:text-orange-500"
                  }`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: search + toggle */}
        <div className="flex items-center gap-3 relative" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari di Orange Store"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`
                w-48 md:w-60
                border rounded-md px-3 py-2 pr-10 text-sm
                focus:outline-none focus:ring-2 focus:ring-orange-500
                transition-all
                ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }
              `}
            />

            {/* Ganti icon tergantung kondisi */}
            {query ? (
              <X
                size={18}
                onClick={clearSearch}
                className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              />
            ) : (
              <Search
                size={18}
                className={`absolute right-2 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
            )}
          </div>

          {/* Dropdown Search */}
          {results.length > 0 && (
            <div
              className={`absolute top-11 right-0 w-72 shadow-lg rounded-lg border mt-1 z-50
                ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
            >
              <ul className="py-2">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/product/${item.id}`}
                      onClick={() => setResults([])}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Search size={16} className="text-gray-500" />
                      <span className="truncate text-sm">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}