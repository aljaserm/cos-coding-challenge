"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Logger_1 = require("./services/Logger/classes/Logger");
const CarOnSaleClient_1 = require("./services/CarOnSaleClient/classes/CarOnSaleClient");
const container = new inversify_1.Container();
// Bind the ILogger interface to the Logger class
container.bind("ILogger").to(Logger_1.Logger);
// Bind the ICarOnSaleClient interface to the CarOnSaleClient class
container.bind("ICarOnSaleClient").to(CarOnSaleClient_1.CarOnSaleClient);
exports.default = container;
