import { Container } from "inversify";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ConsoleLogger } from "./services/Logger/ConsoleLogger";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient"; // Make sure to import the interface
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient"; // Make sure to import the implementation class

const container = new Container({
  defaultScope: "Singleton",
});

container.bind<ILogger>(DependencyIdentifier.LOGGER).to(ConsoleLogger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient); // Correctly bind the interface to the implementation

export default container;
