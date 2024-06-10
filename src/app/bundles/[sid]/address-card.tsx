import { CreateAddressModal } from "@/components/create-address-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countries } from "countries-list";
import type { AddressInstance } from "twilio/lib/rest/api/v2010/account/address";

export const AddressCard = ({
  bundleSid,
  address,
}: {
  bundleSid: string;
  address: AddressInstance | null;
}) => {
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        {address ? (
          <div className="flex flex-col gap-2">
            <p className="font-light">{address.friendlyName}</p>
            <p className="font-bold">
              {address.street}, {address.region}, {address.city},{" "}
              {address.isoCountry}, {address.postalCode}
            </p>
            <p className="font-light">{address.sid}</p>
          </div>
        ) : (
          <CreateAddressModal bundleSid={bundleSid} countries={countries} />
        )}
      </CardContent>
    </Card>
  );
};
