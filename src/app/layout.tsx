import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShoppingCart from "@/components/ShoppingCart";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Store",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-gray-900">
                  Online Store
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </header>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {children}
              </div>
              <div className="bg-white rounded-lg shadow-lg">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
