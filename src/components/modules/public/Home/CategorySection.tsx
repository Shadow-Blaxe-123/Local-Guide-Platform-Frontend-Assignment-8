"use client";

import Link from "next/link";

const categories = [
  { name: "Cultural", color: "bg-red-500" },
  { name: "Adventure", color: "bg-green-500" },
  { name: "Food", color: "bg-yellow-500" },
  { name: "Nature", color: "bg-blue-500" },
  { name: "Historical", color: "bg-purple-500" },
  { name: "Religious", color: "bg-indigo-500" },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-slate-100">
          Explore By Category
        </h2>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 dark:brightness-110 dark:saturate-110
"
        >
          {categories.map((cat) => (
            <Link
              href={`/explore?category=${cat.name.toUpperCase()}`}
              key={cat.name}
              className={`
            group relative rounded-xl
            shadow-xl dark:shadow-none
            hover:shadow-2xl dark:hover:shadow-lg
            transition-all
            p-8 flex items-center justify-center
            ${cat.color}
            text-white font-semibold text-lg
            dark:brightness-110 dark:saturate-110

          `}
            >
              <span className="transition-transform group-hover:scale-105">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
