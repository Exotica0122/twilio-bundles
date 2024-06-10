import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const bundleRouter = createTRPCRouter({
  getBundle: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const bundle = await ctx.twilio.numbers.v2.regulatoryCompliance
      .bundles(input)
      .fetch();
    return bundle;
  }),

  getBundles: publicProcedure.query(async ({ ctx }) => {
    const bundles =
      await ctx.twilio.numbers.v2.regulatoryCompliance.bundles.list({
        limit: 20,
      });
    return bundles;
  }),

  createBundle: publicProcedure
    .input(
      z.object({
        friendlyName: z.string(),
        endUserType: z.enum(["business", "individual"]).optional(),
        isoCountry: z.string(),
        numberType: z.string(),
        statusCallback: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.twilio.numbers.v2.regulatoryCompliance.bundles.create(input);
    }),

  deleteBundle: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.twilio.numbers.v2.regulatoryCompliance.bundles(input).remove();
    }),

  updateFriendlyName: publicProcedure
    .input(
      z.object({
        bundleSid: z.string(),
        friendlyName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.twilio.numbers.v2.regulatoryCompliance
        .bundles(input.bundleSid)
        .update({ friendlyName: input.friendlyName });
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        bundleSid: z.string(),
        status: z.enum(["draft", "pending-review"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const bundle = await ctx.twilio.numbers.v2.regulatoryCompliance
        .bundles(input.bundleSid)
        .update({ status: input.status });
      return bundle.toJSON();
    }),
});
