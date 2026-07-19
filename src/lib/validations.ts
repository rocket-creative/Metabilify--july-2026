import { z } from "zod";

export const discussSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  organization: z.string().trim().min(2, "Organization is required").max(200),
  interest: z.enum(["services", "platform", "collaboration"], {
    message: "Select an interest",
  }),
  message: z.string().trim().min(10, "Tell us a bit more").max(4000),
  website: z.string().max(0).optional(), // honeypot
});

export type DiscussInput = z.infer<typeof discussSchema>;

export const interestLabels: Record<DiscussInput["interest"], string> = {
  services: "Analytical Services",
  platform: "Platform Development",
  collaboration: "Strategic Collaboration",
};
