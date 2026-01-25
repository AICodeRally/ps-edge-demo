/**
 * Binding Configuration (PS-Edge)
 *
 * Defines which provider implementation to use for each data source.
 * Modes: synthetic (in-memory) | live (Neon DB via Prisma)
 */

export type BindingMode = 'synthetic' | 'live';

export interface BindingConfig {
  /**
   * Provider mode selection per domain
   */
  providers: {
    client: BindingMode;
    engagement: BindingMode;
    consultant: BindingMode;
    timeEntry: BindingMode;
    invoice: BindingMode;
    deliverable: BindingMode;
    proposal: BindingMode;
    clientTenant: BindingMode;
    clientSignal: BindingMode;
    clientBenchmark: BindingMode;
    partnerRevenue: BindingMode;
    apiUsageLog: BindingMode;
  };

  /**
   * Data loading configuration
   * Controls which data types are loaded at startup
   */
  dataLoad: {
    /** Load demo data (sample data for demonstrations) */
    demo: boolean;
    /** Load template data (baseline frameworks) */
    templates: boolean;
  };

  /**
   * Live mode configuration (when mode = 'live')
   */
  live?: {
    databaseUrl: string;
    poolSize?: number;
  };
}

/**
 * Default configuration (synthetic mode for all providers)
 */
export const defaultBindingConfig: BindingConfig = {
  providers: {
    client: 'synthetic',
    engagement: 'synthetic',
    consultant: 'synthetic',
    timeEntry: 'synthetic',
    invoice: 'synthetic',
    deliverable: 'synthetic',
    proposal: 'synthetic',
    clientTenant: 'synthetic',
    clientSignal: 'synthetic',
    clientBenchmark: 'synthetic',
    partnerRevenue: 'synthetic',
    apiUsageLog: 'synthetic',
  },
  dataLoad: {
    demo: true,
    templates: false,
  },
};

/**
 * Load configuration from environment variables
 */
export function loadBindingConfig(): BindingConfig {
  const mode = (process.env.BINDING_MODE || 'synthetic') as BindingMode;

  return {
    providers: {
      client: (process.env.BINDING_MODE_CLIENT || mode) as BindingMode,
      engagement: (process.env.BINDING_MODE_ENGAGEMENT || mode) as BindingMode,
      consultant: (process.env.BINDING_MODE_CONSULTANT || mode) as BindingMode,
      timeEntry: (process.env.BINDING_MODE_TIME_ENTRY || mode) as BindingMode,
      invoice: (process.env.BINDING_MODE_INVOICE || mode) as BindingMode,
      deliverable: (process.env.BINDING_MODE_DELIVERABLE || mode) as BindingMode,
      proposal: (process.env.BINDING_MODE_PROPOSAL || mode) as BindingMode,
      clientTenant: (process.env.BINDING_MODE_CLIENT_TENANT || mode) as BindingMode,
      clientSignal: (process.env.BINDING_MODE_CLIENT_SIGNAL || mode) as BindingMode,
      clientBenchmark: (process.env.BINDING_MODE_CLIENT_BENCHMARK || mode) as BindingMode,
      partnerRevenue: (process.env.BINDING_MODE_PARTNER_REVENUE || mode) as BindingMode,
      apiUsageLog: (process.env.BINDING_MODE_API_USAGE_LOG || mode) as BindingMode,
    },
    dataLoad: {
      demo: process.env.ENABLE_DEMO_DATA === 'true',
      templates: process.env.ENABLE_TEMPLATE_DATA === 'true',
    },
    live: process.env.DATABASE_URL
      ? {
          databaseUrl: process.env.DATABASE_URL,
          poolSize: parseInt(process.env.DB_POOL_SIZE || '10'),
        }
      : undefined,
  };
}

/**
 * Check if demo data is enabled
 */
export function isDemoDataEnabled(): boolean {
  return process.env.ENABLE_DEMO_DATA === 'true' || process.env.NODE_ENV === 'development';
}

/**
 * Check if template data is enabled
 */
export function isTemplateDataEnabled(): boolean {
  return process.env.ENABLE_TEMPLATE_DATA === 'true';
}

/**
 * Get current data load configuration
 */
export function getDataLoadConfig(): { demo: boolean; templates: boolean } {
  return {
    demo: isDemoDataEnabled(),
    templates: isTemplateDataEnabled(),
  };
}
