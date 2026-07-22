import { z } from "zod";

export const discussSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  organization: z.string().trim().min(2, "Organization is required").max(200),
  interest: z.enum(["services", "platform", "collaboration"], {
    message: "Select an interest",
  }),
  message: z.string().trim().min(10, "Tell us a bit more").max(4000),
  website: z.string().max(0).optional(),
});

export type DiscussInput = z.infer<typeof discussSchema>;

export const interestLabels: Record<DiscussInput["interest"], string> = {
  services: "Analytical Services",
  platform: "Platform Development",
  collaboration: "Strategic Collaboration",
};

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  organization: z.string().trim().min(2, "Organization is required").max(200),
  researchArea: z.string().trim().max(200).optional().or(z.literal("")),
  instrumentVendor: z.string().trim().max(120).optional().or(z.literal("")),
  instrumentModel: z.string().trim().max(120).optional().or(z.literal("")),
  samplesPerStudy: z.string().trim().max(60).optional().or(z.literal("")),
  sampleMatrix: z.string().trim().max(200).optional().or(z.literal("")),
  dataVolume: z.string().trim().max(120).optional().or(z.literal("")),
  currentSoftware: z.string().trim().max(200).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(4000),
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
