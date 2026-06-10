import { z } from "zod";

/**
 * Zod validation schema for Portfolio creation and updates.
 */
export const portfolioSchema = z.object({
  name: z.string().min(1, "Portfolio name is required").max(100),
  currency: z.string().min(3).max(3).default("USD"),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
