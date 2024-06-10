import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const itemAssignmentRouter = createTRPCRouter({
  getItemAssignment: publicProcedure
    .input(
      z.object({
        bundleSid: z.string(),
        sid: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const itemAssignment = await ctx.twilio.numbers.v2.regulatoryCompliance
        .bundles(input.bundleSid)
        .itemAssignments(input.sid)
        .fetch();
      return itemAssignment;
    }),

  createItemAssignment: publicProcedure
    .input(
      z.object({
        bundleSid: z.string(),
        objectSid: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const itemAssignment = await ctx.twilio.numbers.v2.regulatoryCompliance
        .bundles(input.bundleSid)
        .itemAssignments.create({ objectSid: input.objectSid });
      return itemAssignment.toJSON();
    }),
});
