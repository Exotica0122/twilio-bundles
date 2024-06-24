"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { useState } from "react";

export const BundleView = () => {
  const bundlePage = api.bundle.getBundlePage.useQuery();

  const [currBundlePage, setCurrBundlePage] = useState(bundlePage.data);
  const [bundles, setBundles] = useState(currBundlePage?.instances);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bundle Name</TableHead>
          <TableHead className="hidden sm:table-cell">Country</TableHead>
          <TableHead className="hidden md:table-cell">
            Type & end user
          </TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      {bundles?.map(async (bundle) => {
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
              <TableCell className="hidden sm:table-cell">
                {getCountryName(regulations.isoCountry)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="capitalize">{regulations.endUserType}</span> -{" "}
                <span className="capitalize">{regulations.numberType}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">
                  <span className="text-nowrap capitalize">
                    {kebabCaseToStartCase(bundle.status)}
                  </span>
                </Badge>
              </TableCell>

              <TableCell>
                <ActionDropdown bundleSid={bundle.sid} />
              </TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
};
