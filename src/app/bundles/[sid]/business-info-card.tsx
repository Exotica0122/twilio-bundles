import { CreateEndUserModal } from "@/components/create-end-user-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { snakeCaseToStartCase } from "@/lib/utils";
import type { EndUserInstance } from "twilio/lib/rest/numbers/v2/regulatoryCompliance/endUser";

export const BusinessInfoCard = ({
  bundleSid,
  endUser,
}: {
  bundleSid: string;
  endUser: EndUserInstance | null;
}) => {
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Business & legal representative information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        {endUser ? (
          <>
            <div className="flex flex-col space-y-4">
              <Label htmlFor="terms">Friendly Name</Label>
              <p className="font-light">{endUser.friendlyName}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <Label htmlFor="terms">Type</Label>
              <p className="font-light">{endUser.type}</p>
            </div>
            {Object.keys(endUser.attributes as Record<string, string>).map(
              (key) => (
                <div key={key} className="flex flex-col space-y-4">
                  <Label htmlFor="terms">{snakeCaseToStartCase(key)}</Label>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  <p className="font-light">{endUser.attributes[key]}</p>
                </div>
              ),
            )}
          </>
        ) : (
          <CreateEndUserModal bundleSid={bundleSid} />
        )}
      </CardContent>
    </Card>
  );
};
