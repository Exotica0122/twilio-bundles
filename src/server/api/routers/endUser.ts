import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const endUserRouter = createTRPCRouter({
  getEndUser: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const endUser = await ctx.twilio.numbers.v2.regulatoryCompliance
        .endUsers(input)
        .fetch();
      return endUser;
    }),

  getEndUsers: publicProcedure.query(async ({ ctx }) => {
    const endUsers =
      await ctx.twilio.numbers.v2.regulatoryCompliance.endUsers.list({
        limit: 20,
      });
    return endUsers;
  }),

  createEndUser: publicProcedure
    .input(
      z.object({
        friendlyName: z.string(),
        type: z.enum(["business", "individual"]),
        attributes: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string(),
          phoneNumber: z.string(),
          crnNumber: z.string(),
          businessName: z.string(),
          businessWebsite: z.string(),
          comments: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const endUser =
        await ctx.twilio.numbers.v2.regulatoryCompliance.endUsers.create({
          friendlyName: input.friendlyName,
          type: input.type,
          attributes: {
            first_name: input.attributes.firstName,
            last_name: input.attributes.lastName,
            phone_number: input.attributes.phoneNumber,
            business_identity: "INDEPENDENT_SOFTWARE_VENDOR",
            business_website: input.attributes.businessWebsite,
            comments: input.attributes.comments,
            is_subassigned: "NO",
            business_registration_number: input.attributes.crnNumber,
            business_name: input.attributes.businessName,
            business_registration_identifier: "UK:CRN",
            email: input.attributes.email,
          },
        });
      return endUser.toJSON();
    }),
});
