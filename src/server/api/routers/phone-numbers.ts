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

  getActivePhoneNumbers: publicProcedure.query(async ({ ctx }) => {
    const phoneNumbers = await ctx.twilio.incomingPhoneNumbers.list({
      limit: 20,
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

  buyPhoneNumber: publicProcedure
    .input(
      z.object({
        friendlyName: z.string(),
        bundleSid: z.string(),
        phoneNumber: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newPhoneNumber = await ctx.twilio.incomingPhoneNumbers.create({
        phoneNumber: input.phoneNumber,
        friendlyName: input.friendlyName,
        bundleSid: input.bundleSid,
      });
      return newPhoneNumber.toJSON();
    }),
});
