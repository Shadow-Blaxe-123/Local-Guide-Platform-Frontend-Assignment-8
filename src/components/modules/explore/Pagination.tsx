"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const qs = new URLSearchParams(searchParams.toString());
    qs.set("page", page.toString());

    router.push(`/explore?${qs.toString()}`);
  };

  if (totalPages < 1) return null; // no pagination needed

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  // optional: display pages dynamically
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <Button
        variant="outline"
        disabled={prevDisabled}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={nextDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
