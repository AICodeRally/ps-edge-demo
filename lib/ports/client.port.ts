import type { Client, CreateClient, UpdateClient, ClientFilters } from '../contracts/client.contract';

/**
 * Client Port Interface
 *
 * Defines operations for client management.
 * Implementations can be synthetic (mock), mapped (API), or live (database).
 */
export interface IClientPort {
  /**
   * Get all clients, optionally filtered
   */
  getClients(filters?: ClientFilters): Promise<Client[]>;

  /**
   * Get a single client by ID
   */
  getClient(id: string): Promise<Client | null>;

  /**
   * Create a new client
   */
  createClient(data: CreateClient): Promise<Client>;

  /**
   * Update an existing client
   */
  updateClient(id: string, data: UpdateClient): Promise<Client>;

  /**
   * Delete a client
   */
  deleteClient(id: string): Promise<boolean>;

  /**
   * Search clients by name or other text fields
   */
  searchClients(query: string): Promise<Client[]>;
}
