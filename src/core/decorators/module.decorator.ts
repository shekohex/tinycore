import 'reflect-metadata';
import { ModuleMetadata } from '../../interfaces';
import { InvalidModuleConfigException } from '../../exceptions/bootstrapping';
import { metadata } from '../constants';

const metadataKeys = [metadata.IMPORTS, metadata.EXPORTS, metadata.PROVIDERS];

const validateKeys = (keys: string[]) => {
  const isKeyValid = (key: any) => metadataKeys.findIndex(k => k === key) < 0;
  const validateKey = (key: any) => {
    if (isKeyValid(key)) {
      throw new InvalidModuleConfigException(key);
    }
  };
  keys.forEach(validateKey);
};

/**
 * Defines the module
 * - `imports` - the set of the 'imported' modules
 * - `providers` - the list of providers that belong to this module. They can be injected between themselves.
 * - `exports` - the set of providers, which should be available for modules, which imports this module
 * @param obj {ModuleMetadata} Module metadata
 */
export function Module(obj: ModuleMetadata): ClassDecorator {
  const propsKeys = Object.keys(obj);
  validateKeys(propsKeys);
  return (target: object) => {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (obj as any)[property], target);
      }
    }
  };
}
