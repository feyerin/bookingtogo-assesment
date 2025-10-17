import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-[#2C2C2C] text-sm text-gray-600 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p>© 2025 Orange Store. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-orange-500">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-orange-500">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-orange-500">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}