import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NotificationsCard = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Get notifications to stay up to date on the status of my Regulatory
          Bundle, outages, and related issues. We will not send any marketing
          emails.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="terms">Email</Label>
          <Input />
        </div>
        <div className="flex flex-col space-y-4">
          <Label htmlFor="terms">Status Callback URL</Label>
          <Input />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
};
