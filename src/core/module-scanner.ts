import 'reflect-metadata';
import { ModulesContainer } from './container';
export class ModuleScanner {
  constructor(private container: ModulesContainer) {}
  scanRoot(parentModule: any) {
    this.scanForModules(parentModule);
    this.scanModulesForDependencies();
  }
  private scanForModules(parentModule: any) {
    this.storeModule(parentModule);

    const importedModules = Reflect.getMetadata('imports', parentModule) || [];
    importedModules.map((importedModule: any) => this.scanForModules(importedModule));
  }

  private storeModule(parentModule: any) {
    this.container.addModule(parentModule);
  }
  private scanModulesForDependencies() {
    const modules = this.container.getModules();
    modules.forEach((deps, parentModule) => {
      const imports = Reflect.getMetadata('imports', parentModule) || [];
      imports.map((imported: any) => this.container.addImports(imported, parentModule));

      const providers = Reflect.getMetadata('providers', parentModule) || [];
      providers.map((provider: any) => this.container.addProviders(provider, parentModule));

      const exports = Reflect.getMetadata('exports', parentModule) || [];
      exports.map((exported: any) => this.container.addExports(exported, parentModule));
    });
  }
}
