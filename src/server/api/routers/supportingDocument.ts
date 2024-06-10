import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { get } from "http";
import { z } from "zod";

export const supportingDocumentRouter = createTRPCRouter({
  getSupportingDocument: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const supportingDocument =
        await ctx.twilio.numbers.v2.regulatoryCompliance
          .supportingDocuments(input)
          .fetch();
      return supportingDocument;
    }),

  createSupportingDocument: publicProcedure
    .input(
      z.object({
        friendlyName: z.string(),
        type: z.enum(["business_address", "emergency_address"]),
        attributes: z.record(z.string(), z.string().or(z.string().array())),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const supportingDocument =
        await ctx.twilio.numbers.v2.regulatoryCompliance.supportingDocuments.create(
          input,
        );
      return supportingDocument.toJSON();
    }),
});
