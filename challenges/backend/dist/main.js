"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const Logger_1 = require("./services/Logger/classes/Logger");
const DependencyIdentifiers_1 = require("./DependencyIdentifiers");
const AuctionMonitorApp_1 = require("./AuctionMonitorApp");
const CarOnSaleClient_1 = require("./services/CarOnSaleClient/classes/CarOnSaleClient");
const axios_1 = __importDefault(require("axios"));
/*
 * Create the DI container.
 */
const container = new inversify_1.Container({
    defaultScope: 'Singleton',
});
/*
 * Register dependencies in DI environment.
 */
container.bind(DependencyIdentifiers_1.DependencyIdentifier.LOGGER).to(Logger_1.Logger);
container.bind(DependencyIdentifiers_1.DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient_1.CarOnSaleClient);
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp_1.AuctionMonitorApp);
/*
 * Start the application
 */
(async () => {
    var _a, _b;
    try {
        // Start the application
        await app.start();
        // Inject the dependencies (CarOnSaleClient) into the app
        const carOnSaleClient = container.get(DependencyIdentifiers_1.DependencyIdentifier.CAR_ON_SALE_CLIENT);
        // If the application started successfully, perform the API request
        const username = "buyer-challenge@caronsale.de";
        const password = "Test123.";
        // Make the API request using the client and provided credentials
        const auth = {
            auth: {
                username,
                password,
            },
        };
        const auctions = await carOnSaleClient.getRunningAuctions(auth);
        // Handle the API response here
        console.log("Auction Monitor started.");
        console.log("Running Auctions:", auctions);
    }
    catch (error) {
        // Handle API errors
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            console.error("Failed to retrieve running auctions:", axiosError.message);
            console.error("Status code:", (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status);
            console.error("Response data:", (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data);
        }
        else {
            console.error("An error occurred:", error);
        }
    }
})();
