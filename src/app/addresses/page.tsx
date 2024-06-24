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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCountryName } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ListFilter, File, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Addresses() {
  const addresses = await api.address.getAddresses();

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/bundles/create">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Create Address
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
            <CardDescription>
              An Address instance resource represents your or your
              customer&apos;s physical location within a country. Around the
              world, some local authorities require the name and address of the
              user to be on file with Twilio to purchase and own a phone number.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Friendly Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Address
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Validated
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Emergency Enabled
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {addresses.map((address) => {
                return (
                  <TableBody key={address.sid}>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Link href={address.uri}>
                          {address.friendlyName ?? address.sid}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {address.sid}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getCountryName(address.isoCountry)}
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {address.street}, {address.region}, {address.city},{" "}
                          {address.postalCode}
                        </span>
                      </TableCell>
                      <TableCell>{address.validated ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {address.emergencyEnabled ? "Yes" : "No"}
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
      </TabsContent>
    </Tabs>
  );
}
