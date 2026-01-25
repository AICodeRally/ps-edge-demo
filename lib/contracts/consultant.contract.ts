import { z } from 'zod';

/**
 * Consultant Contract - Team Members
 *
 * Represents PPG staff and consultants
 */

export const ConsultantRoleSchema = z.enum([
  'MANAGING_DIRECTOR',
  'SENIOR_CONSULTANT',
  'CONSULTANT',
  'ASSOCIATE_CONSULTANT',
  'GRANT_WRITER',
  'TRAINER',
]);
export type ConsultantRole = z.infer<typeof ConsultantRoleSchema>;

export const ConsultantSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  personId: z.string(),

  // Professional Info
  role: ConsultantRoleSchema,
  title: z.string(),
  department: z.string(),

  // Expertise
  specializations: z.array(z.string()),
  certifications: z.array(z.string()),

  // Capacity
  weeklyCapacityHours: z.number().positive().max(60),
  currentUtilization: z.number().min(0).max(200), // Percentage (can exceed 100%)

  // Billing
  defaultBillingRate: z.number().positive(),

  // Status
  isActive: z.boolean(),
  hireDate: z.coerce.date(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Consultant = z.infer<typeof ConsultantSchema>;

export const CreateConsultantSchema = ConsultantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateConsultant = z.infer<typeof CreateConsultantSchema>;

export const UpdateConsultantSchema = ConsultantSchema.partial().required({ id: true });
export type UpdateConsultant = z.infer<typeof UpdateConsultantSchema>;

export const ConsultantFiltersSchema = z.object({
  tenantId: z.string().optional(),
  role: ConsultantRoleSchema.optional(),
  department: z.string().optional(),
  isActive: z.boolean().optional(),
  specialization: z.string().optional(),
}).partial();

export type ConsultantFilters = z.infer<typeof ConsultantFiltersSchema>;

// Role labels
export const CONSULTANT_ROLE_LABELS: Record<ConsultantRole, string> = {
  MANAGING_DIRECTOR: 'Managing Director',
  SENIOR_CONSULTANT: 'Senior Consultant',
  CONSULTANT: 'Consultant',
  ASSOCIATE_CONSULTANT: 'Associate Consultant',
  GRANT_WRITER: 'Grant Writer',
  TRAINER: 'Trainer',
};
