import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const phoneNumbersRouter = createTRPCRouter({
  getMobilePhoneNumbers: publicProcedure
    .input(
      z.object({
        isoCountry: z.string(),
        beta: z.boolean().optional(),
        smsEnabled: z.boolean().optional(),
        voiceEnabled: z.boolean().optional(),
        faxEnabled: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const phoneNumbers = await ctx.twilio
        .availablePhoneNumbers(input.isoCountry)
        .mobile.list({
          limit: 20,
          beta: input.beta,
          smsEnabled: input.smsEnabled,
          voiceEnabled: input.voiceEnabled,
          faxEnabled: input.faxEnabled,
        });
      return phoneNumbers;
    }),

  getPricing: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const pricing = await ctx.twilio.pricing.v1.voice
        .countries(input)
        .fetch();
      return pricing.toJSON();
    }),
});
