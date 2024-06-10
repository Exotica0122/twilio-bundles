/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NIRZPX7wzpj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Clipboard({ copy }: { copy: string }) {
  return (
    <React.Fragment>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(copy);
              }}
            >
              Copy to Clipboard
              <ClipboardIcon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              Copied
              <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copied for 2 seconds</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </React.Fragment>
  );
}

function CheckIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClipboardIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
