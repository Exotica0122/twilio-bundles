"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  friendlyName: z.string().min(1, {
    message: "FriendlyName must not be empty.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export const PropertiesCard = ({
  bundle_sid,
  friendlyName,
  isoCountry,
  numberType,
  endUserType,
  validUntil,
}: {
  bundle_sid: string;
  friendlyName: string;
  isoCountry: string;
  numberType: string;
  endUserType: string;
  validUntil: Date | null;
}) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const router = useRouter();
  const updateFriendlyName = api.bundle.updateFriendlyName.useMutation({
    onSuccess: () => {
      toast("Friendly name updated");
      router.refresh();
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendlyName,
    },
  });

  async function onSubmit(values: FormSchema) {
    updateFriendlyName.mutate({
      bundleSid: bundle_sid,
      friendlyName: values.friendlyName,
    });
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="friendlyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friendly Name</FormLabel>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input placeholder="Store Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    {updateFriendlyName.isPending ? (
                      <LoadingSpinner />
                    ) : (
                      <Button>Save</Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col space-y-4">
          <Label>Country</Label>
          <p className="font-light">{regionNames.of(isoCountry)}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Label>SID for provisioning numbers</Label>
          <p className="font-light">{bundle_sid}</p>
        </div>
        <div className="hidden flex-col space-y-4 md:flex">
          {validUntil && (
            <>
              <Label>Valid Until</Label>
              <p className="font-light">{validUntil.toLocaleString()}</p>
            </>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Label>Number type</Label>
          <p className="font-light capitalize">{numberType}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Label>End-User type</Label>
          <p className="font-light capitalize">{endUserType}</p>
        </div>
      </CardContent>
    </Card>
  );
};
