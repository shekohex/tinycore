import {
  ModuleDependencies,
  ModuleScanner,
  ModulesContainer,
  CoreInjector,
  Module
} from '../../core';
import { Injectable } from '../../di';
class Engine {}
class TurboEngine extends Engine {}

@Injectable()
class Car {
  constructor(public engine: Engine) {}
}
@Injectable()
class AeroPlane {
  constructor(public engine: TurboEngine) {}
}
@Module({
  providers: [Engine, Car],
  exports: [TurboEngine, Car]
})
class VehicleModule {}

@Module({
  imports: [VehicleModule],
  providers: [AeroPlane]
})
class AirospaceModule {}

@Module({
  imports: [VehicleModule, AirospaceModule]
})
class AppModule {}

describe('CoreInjector', () => {
  let moduleScanner: ModuleScanner;
  let moduleContainer: ModulesContainer;
  let coreInjector: CoreInjector;
  beforeEach(() => {
    moduleContainer = new ModulesContainer();
    moduleScanner = new ModuleScanner(moduleContainer);
    coreInjector = new CoreInjector(moduleContainer);
    moduleScanner.scanRoot(AppModule);
    coreInjector.createInstancesOfDependencies();
  });
  it('should resolve dependencies based on type information', () => {
    const vehicleInjector = moduleContainer.getModule(VehicleModule).injector;
    const airospaceInjector = moduleContainer.getModule(AirospaceModule).injector;
    const car = vehicleInjector.get(Car);
    const aeroPlane: AeroPlane = airospaceInjector.get(AeroPlane);
    expect(car instanceof Car).toBeTruthy();
    expect(car.engine instanceof Engine).toBeTruthy();
    expect(aeroPlane instanceof AeroPlane).toBeTruthy();
    expect(aeroPlane.engine instanceof Engine).toBeTruthy();
    expect(aeroPlane.engine instanceof TurboEngine).toBeTruthy();
  });
  it('should throw error', () => {
    expect(() => Module({ invalidProp: [] } as any)(undefined)).toThrowError();
  });
});
