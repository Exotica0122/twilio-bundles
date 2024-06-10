import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { postRouter } from "@/server/api/routers/post";
import { bundleRouter } from "./routers/bundle";
import { regulationRouter } from "./routers/regulation";
import { endUserRouter } from "./routers/endUser";
import { endUserTypeRouter } from "./routers/endUserType";
import { itemAssignmentRouter } from "./routers/itemAssignment";
import { addressRouter } from "./routers/address";
import { supportingDocumentRouter } from "./routers/supportingDocument";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  bundle: bundleRouter,
  regulation: regulationRouter,
  endUser: endUserRouter,
  endUserType: endUserTypeRouter,
  itemAssignment: itemAssignmentRouter,
  address: addressRouter,
  supportingDocument: supportingDocumentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
