import { Provider } from '@di/provider';
export interface ModuleMetadata {
  imports?: any[];
  providers?: Provider[];
  exports?: Provider[];
}
