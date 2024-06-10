import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const regulationRouter = createTRPCRouter({
  getRegulation: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const regulations = await ctx.twilio.numbers.v2.regulatoryCompliance
        .regulations(input)
        .fetch();
      return regulations;
    }),

  getRegulations: publicProcedure.query(async ({ ctx }) => {
    const regulations =
      await ctx.twilio.numbers.v2.regulatoryCompliance.regulations.list({
        limit: 20,
      });
    return regulations;
  }),
});
