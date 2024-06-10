"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export const SubmitBundle = ({
  bundleSid,
  disable,
}: {
  bundleSid: string;
  disable: boolean;
}) => {
  const updateBundleStatus = api.bundle.updateStatus.useMutation({
    onError: (error) => {
      toast(`Failed to update bundle status, ${error.message}`);
    },
  });

  return (
    <Button
      onClick={() =>
        updateBundleStatus.mutate({ bundleSid, status: "pending-review" })
      }
      disabled={disable}
    >
      Submit
    </Button>
  );
};
