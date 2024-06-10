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
  FormDescription,
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

const formSchema = z.object({
  friendlyName: z.string().min(2, {
    message: "FriendlyName must be at least 2 characters.",
  }),
  endUserType: z.enum(["business", "individual"]),
  isoCountry: z
    .string()
    .min(2, { message: "IsoCountry must be at least 2 characters." }),
  numberType: z.enum(["local", "mobile", "national", "toll free"]),
  statusCallback: z.string(),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateBundleModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createBundle = api.bundle.createBundle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendlyName: "",
      endUserType: "business",
      numberType: "mobile",
      isoCountry: "",
      statusCallback: "",
      email: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    createBundle.mutate(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Regulatory Bundle
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Create Regulatory Bundle</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          When creating the Bundle, you will specify IsoCountry, NumberType, and
          EndUserType so you can follow compliance for a Regulation.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="friendlyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friendly Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bundle 1" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="endUserType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End User Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a End User type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Number Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Number Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"local"}>Local</SelectItem>
                        <SelectItem value={"mobile"}>Mobile</SelectItem>
                        <SelectItem value={"national"}>National</SelectItem>
                        <SelectItem value={"toll free"}>Toll Free</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isoCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISO Country</FormLabel>
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
                      <SelectItem value={"gb"}>United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusCallback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Callback</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
          <Button
            type="submit"
            onClick={async () => {
              await form.trigger();
              if (form.formState.isValid) void onSubmit(form.getValues());
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
