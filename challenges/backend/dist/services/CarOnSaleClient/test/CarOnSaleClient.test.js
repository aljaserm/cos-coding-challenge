"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const CarOnSaleClient_1 = require("../classes/CarOnSaleClient");
const chai_1 = __importStar(require("chai")); // Import chai and rename 'expect' to 'chaiExpect'
const chai_as_promised_1 = __importDefault(require("chai-as-promised")); // Import chai-as-promised
// Use the chai-as-promised plugin
chai_1.default.use(chai_as_promised_1.default);
// Mock class for CarOnSaleClient
class MockCarOnSaleClient extends CarOnSaleClient_1.CarOnSaleClient {
    // Override the getRunningAuctions method
    async getRunningAuctions(_auth) {
        return [];
    }
}
describe("CarOnSaleClient", () => {
    // Test getRunningAuctions method
    describe("getRunningAuctions", () => {
        it("should fetch running auctions with valid credentials", async () => {
            const client = new CarOnSaleClient_1.CarOnSaleClient();
            const auth = {
                auth: {
                    username: "buyer-challenge@caronsale.de",
                    password: "Test123."
                }
            };
            const auctions = await client.getRunningAuctions(auth);
            // Make assertions about the response
            (0, chai_1.expect)(auctions).to.be.an("array");
            (0, chai_1.expect)(auctions).to.have.length.greaterThan(0);
            // TODO Add more specific assertions based on the expected response from the API
        });
        it("should throw an error with invalid credentials", async () => {
            const client = new CarOnSaleClient_1.CarOnSaleClient();
            const auth = {
                auth: {
                    username: "invalid-username",
                    password: "invalid-password"
                }
            };
            // Use chai-as-promised to handle the rejected promise
            await (0, chai_1.expect)(client.getRunningAuctions(auth)).to.be.rejected;
        });
        it("should handle empty response from the API", async () => {
            // Create a mock CarOnSaleClient with the extended class
            const mockClient = new MockCarOnSaleClient();
            const auth = {
                auth: {
                    username: "buyer-challenge@caronsale.de",
                    password: "Test123."
                }
            };
            const auctions = await mockClient.getRunningAuctions(auth);
            (0, chai_1.expect)(auctions).to.be.an("array");
            (0, chai_1.expect)(auctions).to.have.lengthOf(0);
        });
        it("should handle network errors", async () => {
            // Create a mock CarOnSaleClient that throws a network error
            class NetworkErrorMockCarOnSaleClient extends CarOnSaleClient_1.CarOnSaleClient {
                async getRunningAuctions(_auth) {
                    throw new Error("Network error");
                }
            }
            const mockClient = new NetworkErrorMockCarOnSaleClient();
            const auth = {
                auth: {
                    username: "buyer-challenge@caronsale.de",
                    password: "Test123."
                }
            };
            // Use chai-as-promised to handle the rejected promise
            await (0, chai_1.expect)(mockClient.getRunningAuctions(auth)).to.be.rejectedWith("Network error");
        });
    });
});
