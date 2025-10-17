import { Suspense } from "react";
import SearchClient from "./searchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search results...</div>}>
      <SearchClient />
    </Suspense>
  );
}