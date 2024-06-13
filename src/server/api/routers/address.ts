import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const addressRouter = createTRPCRouter({
  getAddress: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const address = await ctx.twilio.addresses(input).fetch();
      return address;
    }),

  getAddresses: publicProcedure.query(async ({ ctx }) => {
    const addresses = await ctx.twilio.addresses.list({ limit: 20 });
    return addresses;
  }),

  createAddress: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        street: z.string(),
        region: z.string(),
        city: z.string(),
        postalCode: z.string(),
        isoCountry: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const address = await ctx.twilio.addresses.create(input);
      return address.toJSON();
    }),
});
