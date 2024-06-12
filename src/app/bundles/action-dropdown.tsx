"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ActionDropdown({ bundleSid }: { bundleSid: string }) {
  const router = useRouter();
  const deleteBundle = api.bundle.deleteBundle.useMutation({
    onSuccess: () => {
      toast(`${bundleSid} successfully deleted`);
      router.refresh();
    },
    onError: (error) => {
      toast(`${bundleSid} ${error.message}`);
    },
  });

  if (deleteBundle.isPending) {
    return <LoadingSpinner />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => deleteBundle.mutate(bundleSid)}
          className="bg-red-500 text-white"
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
