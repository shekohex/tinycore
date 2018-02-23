import { ModuleDependencies, ModuleScanner, ModulesContainer, Module } from '../../core';
import { Injectable } from '../../di';
class Engine {}
class TurboEngine extends Engine {}

@Injectable()
class Car {
  constructor(public engine: Engine) {}
}

@Module({
  providers: [Engine, Car],
  exports: [Engine]
})
class VehicleModule {}

@Module({
  imports: [VehicleModule]
})
class AirospaceModule {}

@Module({
  imports: [VehicleModule, AirospaceModule]
})
class AppModule {}

describe('ModulesContainer', () => {
  let moduleScanner: ModuleScanner;
  let moduleContainer: ModulesContainer;
  beforeEach(() => {
    moduleContainer = new ModulesContainer();
    moduleScanner = new ModuleScanner(moduleContainer);
    moduleScanner.scanRoot(AppModule);
  });

  it('should have three modules', () => {
    expect(moduleContainer.getModules().size).toBe(3);
  });

  it('AppModule should have two imports', () => {
    const appModule = moduleContainer.getModule(AppModule);
    expect(appModule.imports.size).toBe(2);
    expect(moduleContainer.getImports(AppModule).size).toBe(2);
  });

  it('VehicleModule should have two providers', () => {
    const vehicleModule = moduleContainer.getModule(VehicleModule);
    expect(vehicleModule.providers.size).toBe(2);
    expect(moduleContainer.getProviders(VehicleModule).size).toBe(2);
  });

  it('VehicleModule should have a parent equal to AirospaceModule', () => {
    const vehicleModule = moduleContainer.getModule(VehicleModule);
    expect(vehicleModule.parent).toEqual(AirospaceModule);
  });

  it('VehicleModule should have a one exports', () => {
    const vehicleModule = moduleContainer.getModule(VehicleModule);
    expect(vehicleModule.exports.size).toEqual(1);
  });
});
