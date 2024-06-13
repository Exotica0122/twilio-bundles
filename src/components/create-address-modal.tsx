"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
import { countryMap } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Customer Name must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  region: z.string().min(2, {
    message: "Region must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(2, {
    message: "Postal Code must be at least 2 characters.",
  }),
  isoCountry: z.string().min(2, {
    message: "Iso Country must be at least 2 characters.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateAddressModal = ({ bundleSid }: { bundleSid: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createAddress = api.address.createAddress.useMutation({
    onError: (error) => {
      toast(error.message);
    },
  });
  const createSupportingDocument =
    api.supportingDocument.createSupportingDocument.useMutation({
      onError: (error) => {
        toast(error.message);
      },
    });
  const createItemAssignment =
    api.itemAssignment.createItemAssignment.useMutation({
      onError: (error) => {
        toast(error.message);
      },
    });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      street: "",
      region: "",
      city: "",
      postalCode: "",
      isoCountry: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    setOpen(false);

    // Create address
    const address = await createAddress.mutateAsync(values);

    // 1. Create supporting doc - business_address
    const businessAddress = await createSupportingDocument.mutateAsync({
      friendlyName: `${values.customerName} - Main Address`,
      type: "business_address",
      attributes: { address_sids: [address.sid] },
    });

    // 2. Create supporting doc - emergency_address
    const emergencyAddress = await createSupportingDocument.mutateAsync({
      friendlyName: `${values.customerName} - Emergency Address`,
      type: "emergency_address",
      attributes: { address_sids: [address.sid] },
    });

    // 1. Link by Item Assignment
    const businessAddressItemAssignment =
      await createItemAssignment.mutateAsync({
        bundleSid,
        objectSid: businessAddress.sid,
      });
    // 2. Link by Item Assignment
    const emergencyAddressItemAssignment =
      await createItemAssignment.mutateAsync({
        bundleSid,
        objectSid: emergencyAddress.sid,
      });

    toast(
      `Address created: ${address.sid} with assignments: ${businessAddressItemAssignment.sid} and ${emergencyAddressItemAssignment.sid}.`,
    );
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Address
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Create Address</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Creates a new Address within your account.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-8 gap-y-4"
          >
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isoCountry"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryMap.map(({ name, code }) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
