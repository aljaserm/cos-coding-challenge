import "reflect-metadata";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import container from "./inversify.config";

const app = container.resolve<AuctionMonitorApp>(AuctionMonitorApp);

(async () => {
  try {
    await app.start();
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(-1);
  }

  process.exit(0);
})();



// import "reflect-metadata";
// import axios, { AxiosRequestConfig, AxiosError } from "axios";
// import { Container } from "inversify";
// import { AuctionMonitorApp } from "./AuctionMonitorApp";
// import { DependencyIdentifier } from "./DependencyIdentifiers";
// import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
// import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
// import { ConsoleLogger } from "./services/Logger/ConsoleLogger";
// import { ILogger } from "./services/Logger/interface/ILogger";


// /*
//  * Create the DI container.
//  */
// const container = new Container({
//   defaultScope: 'Singleton',
// });

// /*
//  * Register dependencies in DI environment.
//  */
// container.bind<ILogger>(DependencyIdentifier.LOGGER).to(ConsoleLogger); // Use ConsoleLogger here
// container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);

// /*
//  * Inject all dependencies in the application & retrieve application instance.
//  */
// const app = container.resolve<AuctionMonitorApp>(AuctionMonitorApp); // Use AuctionMonitorApp instead of "App" if it was a typo


// /*
//  * Start the application
//  */
// (async () => {
//   try {
//     // Start the application
//     await app.start();

//     // Inject the dependencies (CarOnSaleClient) into the app
//     const carOnSaleClient = container.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);

//     // If the application started successfully, perform the API request
//     const username = "buyer-challenge@caronsale.de";
//     const password = "Test123.";

//     // Make the API request using the client and provided credentials
//     const auth: AxiosRequestConfig = {
//       auth: {
//         username,
//         password,
//       },
//     };
//     const auctions = await carOnSaleClient.getRunningAuctions(auth);

//     // Handle the API response here
//     console.log("Auction Monitor started.");
//     console.log("Running Auctions:", auctions);
//   } catch (error) {
//     // Handle API errors
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       console.error("Failed to retrieve running auctions:", axiosError.message);
//       console.error("Status code:", axiosError.response?.status);
//       console.error("Response data:", axiosError.response?.data);
//     } else {
//       console.error("An error occurred:", error);
//     }
//   }
// })();
