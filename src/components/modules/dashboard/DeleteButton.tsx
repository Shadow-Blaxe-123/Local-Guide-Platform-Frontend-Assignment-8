"use client";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteButton({ route }: { route: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    const data = (await response.json()) as ApiResponse<unknown>;
    if (data.success) {
      router.refresh();
      toast.success("User deleted");
    }
    return data;
  };
  return (
    <Button variant={"destructive"} onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;
