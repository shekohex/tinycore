import 'reflect-metadata';
import { ReflectiveInjector } from '@di/reflective-injector';
import { Provider } from '@di/provider';

export class ModulesContainer {
  private readonly modules = new Map<any, ModuleDependencies>();
  addModule(module: any) {
    if (!this.modules.has(module)) {
      this.modules.set(module, {
        imports: new Set<any>(),
        providers: new Set<Provider>(),
        exports: new Set<Provider>(),
        injector: undefined,
        parent: undefined
      });
    }
  }
  addImports(imported: any, module: any) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      const childModule = this.modules.get(imported);
      childModule.parent = module;
      storedModule.imports.add(imported);
    }
  }
  addProviders(provider: Provider, module: any) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      storedModule.providers.add(provider);
    }
  }
  addExports(provider: Provider, module: any) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      storedModule.exports.add(provider);
    }
  }
  getModule(module: any): ModuleDependencies {
    return this.modules.get(module);
  }

  getImports(module: any): Set<any> {
    return this.getModule(module).imports;
  }
  getProviders(module: any): Set<Provider> {
    return this.getModule(module).providers;
  }

  getModules(): Map<any, ModuleDependencies> {
    return this.modules;
  }
}
export interface ModuleDependencies {
  imports?: Set<any>;
  exports?: Set<Provider>;
  providers?: Set<Provider>;
  injector: ReflectiveInjector;
  parent: any;
}
