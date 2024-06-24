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

export default async function ActiveNumbers() {
  const type = "mobile";
  const isoCountry = "GB";

  const phoneNumbers = await api.phoneNumber.getActivePhoneNumbers();

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Active Numbers</h1>
      <div className="mt-6 flex items-center">
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
                <TableHead>Friendly Name</TableHead>
                <TableHead className="hidden md:table-cell">Voice</TableHead>
                <TableHead className="hidden md:table-cell">SMS</TableHead>
                <TableHead className="hidden md:table-cell">MMS</TableHead>
                <TableHead className="hidden md:table-cell">Fax</TableHead>
                <TableHead className="hidden md:table-cell">
                  Active Configuration
                </TableHead>
              </TableRow>
            </TableHeader>
            {phoneNumbers.map(async (phoneNumber) => {
              console.log(phoneNumber);
              return (
                <TableBody key={phoneNumber.phoneNumber}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {phoneNumber.phoneNumber}
                    </TableCell>
                    <TableCell>{phoneNumber.friendlyName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.voice && (
                        <Phone className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.sms && (
                        <MessageSquareText className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.mms && (
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {phoneNumber.capabilities.fax && (
                        <Printer className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex">
                        <h3 className="w-24 font-bold">Voice</h3>
                        <p>{phoneNumber.voiceUrl}</p>
                      </div>
                      <div className="flex">
                        <h3 className="w-24 font-bold">Messaging</h3>
                        <p>{phoneNumber.smsUrl}</p>
                      </div>
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
