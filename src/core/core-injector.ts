import { ModulesContainer } from './container';
import { ReflectiveInjector } from '@di/reflective-injector';
import { Provider } from '@di/provider';
import { ModuleDependencies } from '.';

export class CoreInjector {
  constructor(private container: ModulesContainer) {}
  createInstancesOfDependencies() {
    const modules = this.container.getModules();
    this.createProviders(modules.keys().next().value);
  }

  private createInjector(
    providers: Provider[],
    parent: ReflectiveInjector = null
  ): ReflectiveInjector {
    const resolvedProviders = ReflectiveInjector.resolve(providers);
    if (parent !== null && parent !== undefined) {
      return parent.createChildFromResolved(resolvedProviders) as ReflectiveInjector;
    } else {
      return ReflectiveInjector.fromResolvedProviders(resolvedProviders) as ReflectiveInjector;
    }
  }
  private createProviders(module: any) {
    const _module = this.container.getModule(module);
    const externalProviders = this.flatExported(_module);
    if (!_module.parent) {
      _module.injector = this.createInjector([
        ..._module.providers.keys(),
        ...externalProviders.keys()
      ]);
    } else {
      const parentInjector = this.container.getModule(_module.parent).injector;
      _module.injector = this.createInjector(
        [..._module.providers.keys(), ...externalProviders.keys()],
        parentInjector
      );
    }
    this.createInstancesOfProviders(_module);
    const innerModules = this.container.getImports(module) || new Set<any>();
    innerModules.forEach(module => this.createProviders(module));
  }
  private createInstancesOfProviders(module: ModuleDependencies) {
    module.providers.forEach((provider: any) => {
      provider.instance = module.injector.get(provider);
    });
  }
  private flatExported(module: ModuleDependencies) {
    const exports = new Set();
    module.imports.forEach((imported: any) => {
      const importedMetadata = this.container.getModule(imported);
      importedMetadata.exports.forEach((ex: any) => {
        exports.add(ex);
      });
    });
    return exports;
  }
}
