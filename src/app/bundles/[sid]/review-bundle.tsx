"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SubmitBundle = ({
  bundleSid,
  disable,
}: {
  bundleSid: string;
  disable: boolean;
}) => {
  const router = useRouter();
  const updateBundleStatus = api.bundle.updateStatus.useMutation({
    onError: (error) => {
      toast(`Failed to update bundle status, ${error.message}`);
    },
  });

  return (
    <Button
      onClick={async () => {
        await updateBundleStatus.mutateAsync({
          bundleSid,
          status: "pending-review",
        });
        router.push("/bundles");
      }}
      disabled={disable}
    >
      Submit
    </Button>
  );
};
