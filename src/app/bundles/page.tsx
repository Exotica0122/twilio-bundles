import { Badge } from "@/components/ui/badge";
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
import { api } from "@/trpc/server";
import { ListFilter, File } from "lucide-react";
import Link from "next/link";
import { ActionDropdown } from "./action-dropdown";
import { CreateBundleModal } from "@/components/create-bundle-modal";

export default async function Bundles() {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const bundles = await api.bundle.getBundles();

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
          <CreateBundleModal />
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Bundles</CardTitle>
            <CardDescription>
              The Bundle is a container that references the required Regulatory
              Compliance information set forth by the regulating telecom body of
              the end-user who actually answers the phone call or receives the
              message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bundle Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Type & end user
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Status Details
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {bundles.map(async (bundle) => {
                const regulations = await api.regulation.getRegulation(
                  bundle.regulationSid,
                );
                return (
                  <TableBody key={bundle.sid}>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Link href={`/bundles/${bundle.sid}`}>
                          {bundle.friendlyName}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {bundle.sid}
                        </div>
                      </TableCell>
                      <TableCell>
                        {regionNames.of(regulations.isoCountry)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="capitalize">
                          {regulations.endUserType}
                        </span>{" "}
                        -{" "}
                        <span className="capitalize">
                          {regulations.numberType}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">
                          <span className="text-nowrap capitalize">
                            {bundle.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {/* ...Put status details here... */}
                      </TableCell>
                      <TableCell>
                        <ActionDropdown bundleSid={bundle.sid} />
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
