"use client";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/tokenHandler";
import { ApiResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteButton({ route }: { route: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const accessToken = await getCookie("accessToken");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${accessToken}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    const data = (await response.json()) as ApiResponse<unknown>;
    console.log(data);
    if (data.success) {
      router.refresh();
      toast.success("Deletion successful");
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
