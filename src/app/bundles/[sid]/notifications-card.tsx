"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email must not be empty.",
    })
    .email("Please entry a valid email address."),
  statusCallback: z.string().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

export const NotificationsCard = ({
  bundleSid,
  email,
  statusCallback,
}: {
  bundleSid: string;
  email: string;
  statusCallback?: string;
}) => {
  const updateNotificationsDetails =
    api.bundle.updateNotificationsDetails.useMutation({
      onSuccess: (updatedBundle) => {
        toast.success(`Notifications updated for ${updatedBundle.sid}`);
      },
      onError: (error) => {
        toast.error(`Bundle ${bundleSid} :${error.message}`);
      },
    });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      statusCallback: statusCallback,
    },
  });

  async function onSubmit(values: FormSchema) {
    updateNotificationsDetails.mutate({
      bundleSid,
      ...values,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Get notifications to stay up to date on the status of my Regulatory
          Bundle, outages, and related issues. We will not send any marketing
          emails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <div className="flex flex-col gap-4">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusCallback"
              render={({ field }) => (
                <FormItem className="flex-1 flex-col">
                  <FormLabel>Status Callback URL</FormLabel>
                  <div className="flex flex-col gap-4">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          type="submit"
          onClick={async () => {
            await form.trigger();
            if (form.formState.isValid) void onSubmit(form.getValues());
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
