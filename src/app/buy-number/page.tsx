import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/server";
import {
  Phone,
  MessageSquareText,
  ImageIcon,
  Printer,
  SearchIcon,
} from "lucide-react";
import { CountrySelect } from "./country-select";

export default async function PhoneNumbers() {
  const type = "mobile";
  const isoCountry = "GB";

  const phoneNumbers = await api.phoneNumber.getMobilePhoneNumbers({
    isoCountry,
    beta: false,
    smsEnabled: true,
    voiceEnabled: true,
    faxEnabled: true,
  });
  const pricing = await api.phoneNumber.getPricing(isoCountry);

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Buy a phone number</h1>
      <div className="mt-6 flex items-center">
        <CountrySelect />
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            Reset Filters
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <SearchIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Search
            </span>
          </Button>
        </div>
      </div>
      <Card className="mt-4">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Voice</TableHead>
                <TableHead className="hidden md:table-cell">SMS</TableHead>
                <TableHead className="hidden md:table-cell">MMS</TableHead>
                <TableHead className="hidden md:table-cell">Fax</TableHead>
                <TableHead className="hidden md:table-cell">
                  Address Requirement
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Monthly fee
                </TableHead>
                <TableHead>
                  <span className="sr-only">Buy</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {phoneNumbers.map(async (phoneNumber) => {
              return (
                <TableBody key={phoneNumber.phoneNumber}>
                  <TableRow>
                    <TableCell className="font-medium">
                      <h3>{phoneNumber.friendlyName}</h3>
                      <div className="text-xs text-muted-foreground">
                        {phoneNumber.region} {phoneNumber.locality}{" "}
                        {phoneNumber.isoCountry}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{type}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.voice && (
                        <Phone className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.SMS && (
                        <MessageSquareText className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.MMS && (
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.fax && (
                        <Printer className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="capitalize">
                        {phoneNumber.addressRequirements}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {
                        pricing.inboundCallPrices.filter(
                          (inbound) => inbound.number_type === type,
                        )[0]?.current_price
                      }
                    </TableCell>
                    <TableCell>
                      <Button>Buy</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </CardContent>
        <CardFooter>
          {/* Show pagination */}
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
