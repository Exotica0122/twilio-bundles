import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const endUserTypeRouter = createTRPCRouter({
  getEndUserTypes: publicProcedure.query(async ({ ctx }) => {
    const endUsers =
      await ctx.twilio.numbers.v2.regulatoryCompliance.endUserTypes.list({
        limit: 20,
      });
    return endUsers;
  }),
});
