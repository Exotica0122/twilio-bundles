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
import { ListFilter, File, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function EndUserTypes() {
  const endUserTypes = await api.endUserType.getEndUserTypes();

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
                Create End Users
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>End User Types</CardTitle>
            <CardDescription>
              Due to country specific regulations, you’ll need to create a
              Regulatory Bundle for each type of phone number, so you can
              provision and use phone numbers legally.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Friendly Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Country
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Type & end user
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {endUserTypes.map(async (endUserType) => {
                return (
                  <TableBody key={endUserType.sid}>
                    <TableRow>
                      <TableCell className="font-medium">
                        <Link href={endUserType.url}>
                          {endUserType.friendlyName}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {endUserType.sid}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {endUserType.machineName}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {endUserType.fields.map((field) => (
                          <>{JSON.stringify(field)}</>
                        ))}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {/* ...Put status details here... */}
                      </TableCell>
                      <TableCell>
                        {/* <ActionDropdown bundleSid={bundle.sid} /> */}
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
