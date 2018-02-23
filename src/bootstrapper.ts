import { ModulesContainer, ModuleScanner, CoreInjector } from './core';

export class Bootstrapper {
  private static readonly modulesContainer = new ModulesContainer();
  private static readonly moduleScanner = new ModuleScanner(Bootstrapper.modulesContainer);
  private static readonly coreInjector = new CoreInjector(Bootstrapper.modulesContainer);
  static run(rootModule: any) {
    Bootstrapper.moduleScanner.scanRoot(rootModule);
    Bootstrapper.coreInjector.createInstancesOfDependencies();
  }
}
