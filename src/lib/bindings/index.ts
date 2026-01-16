/**
 * PS-Edge Bindings Module
 *
 * Provides binding registration and retrieval for port implementations.
 */

export {
  getBindingMode,
  setBindingMode,
  registerBinding,
  getBinding,
  getBindingForMode,
  hasBinding,
  getRegisteredPorts,
  debugBindings,
  type BindingMode,
  type PortMap,
} from './registry';
