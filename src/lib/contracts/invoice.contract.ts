import { z } from 'zod';

/**
 * Invoice Contract - Billing and Invoicing
 *
 * Represents invoices sent to clients
 */

export const InvoiceStatusSchema = z.enum([
  'DRAFT',
  'SENT',
  'PAID',
  'OVERDUE',
  'CANCELLED',
]);
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;

export const ExpenseLineSchema = z.object({
  description: z.string(),
  amount: z.number(),
});

export const InvoiceSchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Invoice Details
  invoiceNumber: z.string(),
  clientId: z.string(),
  engagementId: z.string().optional(),

  // Amounts
  subtotal: z.number(),
  taxAmount: z.number().optional(),
  totalAmount: z.number(),
  amountPaid: z.number().default(0),

  // Dates
  invoiceDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  paidDate: z.coerce.date().optional(),

  // Line Items
  timeEntryIds: z.array(z.string()),
  expenses: z.array(ExpenseLineSchema).optional(),

  // Status
  status: InvoiceStatusSchema,

  // Payment
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export const CreateInvoiceSchema = InvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateInvoice = z.infer<typeof CreateInvoiceSchema>;

export const UpdateInvoiceSchema = InvoiceSchema.partial().required({ id: true });
export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>;

export const InvoiceFiltersSchema = z.object({
  tenantId: z.string().optional(),
  clientId: z.string().optional(),
  engagementId: z.string().optional(),
  status: InvoiceStatusSchema.optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
}).partial();

export type InvoiceFilters = z.infer<typeof InvoiceFiltersSchema>;
