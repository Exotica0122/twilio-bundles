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
import { PhoneInput } from "./ui/phone-input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  friendlyName: z.string().min(2, {
    message: "FriendlyName must be at least 2 characters.",
  }),
  type: z.enum(["business", "individual"]),
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters." }),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(2, { message: "Phone Number be at least 2 characters." }),
  crnNumber: z
    .string()
    .min(2, { message: "CRN Number must be at least 2 characters." }),
  businessName: z
    .string()
    .min(2, { message: "Business Name must be at least 2 characters." }),
  businessWebsite: z
    .string()
    .min(2, { message: "Business Website must be at least 2 characters." }),
  comments: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateEndUserModal = ({ bundleSid }: { bundleSid: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createEndUser = api.endUser.createEndUser.useMutation({
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
      friendlyName: "",
      type: "business",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      crnNumber: "",
      businessName: "",
      businessWebsite: "",
      comments: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const endUser = await createEndUser.mutateAsync({
      friendlyName: values.friendlyName,
      type: values.type,
      attributes: {
        businessName: values.businessName,
        businessWebsite: values.businessWebsite,
        comments: values.comments,
        crnNumber: values.crnNumber,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      },
    });

    const itemAssignment = await createItemAssignment.mutateAsync({
      bundleSid,
      objectSid: endUser.sid,
    });

    toast(
      `End User ${endUser.sid} created linked to bundle ${bundleSid} with item assignment ${itemAssignment.sid}`,
    );
    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create End User
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Create End User</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          The End-User is the individual or business who answers the phone call
          or receives the message.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-8 gap-y-4"
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
              name="type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <PhoneInput {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Website</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crnNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CRN Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
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
