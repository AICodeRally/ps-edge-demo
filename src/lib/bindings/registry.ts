/**
 * Binding Registry
 *
 * Manages which implementation (binding) to use for each port.
 * Supports three modes:
 * - synthetic: In-memory mock data (default, for demos and testing)
 * - mapped: External API adapters
 * - live: Direct database access via Prisma
 *
 * Usage:
 *   const clientPort = getBinding<IClientPort>('client');
 *   const clients = await clientPort.getClients();
 */

import type { IClientPort } from '../ports/client.port';
import type { IEngagementPort } from '../ports/engagement.port';
import type { IPulsePort } from '../ports/pulse.port';
import type { ITaskPort } from '../ports/task.port';

/**
 * Binding modes
 */
export type BindingMode = 'synthetic' | 'mapped' | 'live';

/**
 * Port type to interface mapping
 */
export interface PortMap {
  client: IClientPort;
  engagement: IEngagementPort;
  pulse: IPulsePort;
  task: ITaskPort;
}

/**
 * Current binding mode (from environment or default to synthetic)
 */
let currentMode: BindingMode = (process.env.NEXT_PUBLIC_BINDING_MODE as BindingMode) || 'synthetic';

/**
 * Binding registry storage
 */
const bindings: Partial<Record<BindingMode, Partial<PortMap>>> = {
  synthetic: {},
  mapped: {},
  live: {},
};

/**
 * Get the current binding mode
 */
export function getBindingMode(): BindingMode {
  return currentMode;
}

/**
 * Set the binding mode
 */
export function setBindingMode(mode: BindingMode): void {
  currentMode = mode;
}

/**
 * Register a binding for a port in a specific mode
 */
export function registerBinding<K extends keyof PortMap>(
  mode: BindingMode,
  portName: K,
  implementation: PortMap[K]
): void {
  if (!bindings[mode]) {
    bindings[mode] = {};
  }
  bindings[mode]![portName] = implementation;
}

/**
 * Get a binding for a port (uses current mode)
 */
export function getBinding<K extends keyof PortMap>(portName: K): PortMap[K] | null {
  const modeBindings = bindings[currentMode];
  if (!modeBindings) {
    console.warn(`No bindings registered for mode: ${currentMode}`);
    return null;
  }

  const binding = modeBindings[portName];
  if (!binding) {
    console.warn(`No binding registered for port "${portName}" in mode "${currentMode}"`);
    return null;
  }

  return binding as PortMap[K];
}

/**
 * Get a binding for a port in a specific mode
 */
export function getBindingForMode<K extends keyof PortMap>(
  mode: BindingMode,
  portName: K
): PortMap[K] | null {
  const modeBindings = bindings[mode];
  if (!modeBindings) {
    return null;
  }

  return (modeBindings[portName] as PortMap[K]) || null;
}

/**
 * Check if a binding is registered for a port
 */
export function hasBinding(portName: keyof PortMap, mode?: BindingMode): boolean {
  const checkMode = mode || currentMode;
  return !!bindings[checkMode]?.[portName];
}

/**
 * Get all registered port names for a mode
 */
export function getRegisteredPorts(mode?: BindingMode): (keyof PortMap)[] {
  const checkMode = mode || currentMode;
  const modeBindings = bindings[checkMode];
  if (!modeBindings) return [];
  return Object.keys(modeBindings) as (keyof PortMap)[];
}

/**
 * Debug: Log current binding registry state
 */
export function debugBindings(): void {
  console.log('Binding Registry State:');
  console.log('  Current Mode:', currentMode);
  console.log('  Registered Bindings:');
  for (const mode of Object.keys(bindings) as BindingMode[]) {
    const ports = getRegisteredPorts(mode);
    console.log(`    ${mode}: [${ports.join(', ')}]`);
  }
}
