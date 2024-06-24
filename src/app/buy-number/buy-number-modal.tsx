"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

const formSchema = z.object({
  friendlyName: z.string().min(2, {
    message: "Customer Name must be at least 2 characters.",
  }),
  bundleSid: z.string().min(2, {
    message: "Bundle is required.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export const BuyNumberModal = ({ phoneNumber }: { phoneNumber: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const buyPhoneNumber = api.phoneNumber.buyPhoneNumber.useMutation({
    onError: (error) => {
      toast(error.message);
    },
  });

  const approvedBundles = api.bundle.getApprovedBundles.useQuery();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendlyName: "",
      bundleSid: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const newPhoneNumber = await buyPhoneNumber.mutateAsync({
      ...values,
      phoneNumber,
    });

    setOpen(false);
    toast(`Successfully created phone number: ${newPhoneNumber.phoneNumber}`);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Buy
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Buy Phone Number</DialogTitle>
        </DialogHeader>
        <h1 className="text-lg font-bold text-white">{phoneNumber}</h1>
        <DialogDescription>
          Creates a new Phone Number within your account.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-x-8 gap-y-4"
          >
            <FormField
              control={form.control}
              name="friendlyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friendly Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bundleSid"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Bundle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bundle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!approvedBundles.data ? (
                        <LoadingSpinner />
                      ) : (
                        approvedBundles.data.map(({ sid, friendlyName }) => (
                          <SelectItem key={sid} value={sid}>
                            <span className="font-bold">{friendlyName}</span>{" "}
                            <span className="font-light">({sid})</span>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {form.formState.isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <Button
              type="submit"
              onClick={async () => {
                await form.trigger();
                if (form.formState.isValid) void onSubmit(form.getValues());
              }}
            >
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
