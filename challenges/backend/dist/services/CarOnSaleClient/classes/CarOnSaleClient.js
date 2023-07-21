"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOnSaleClient = void 0;
const inversify_1 = require("inversify");
const axios_1 = __importDefault(require("axios"));
let CarOnSaleClient = class CarOnSaleClient {
    constructor() {
        this.apiUrl = 'https://api-core-dev.caronsale.de';
    }
    async getRunningAuctions(auth) {
        const response = await axios_1.default.get(`${this.apiUrl}/auctions/running`, auth);
        // Assuming the API response contains an array of auction objects with the specified properties
        return response.data;
    }
};
CarOnSaleClient = __decorate([
    (0, inversify_1.injectable)()
], CarOnSaleClient);
exports.CarOnSaleClient = CarOnSaleClient;
