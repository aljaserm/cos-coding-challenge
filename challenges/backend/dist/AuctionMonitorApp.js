"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionMonitorApp = void 0;
const inversify_1 = require("inversify");
let AuctionMonitorApp = class AuctionMonitorApp {
    // Use the @inject decorator to inject the dependencies
    constructor(logger, carOnSaleClient) {
        this.logger = logger;
        this.carOnSaleClient = carOnSaleClient;
    }
    async start() {
        this.logger.log(`Auction Monitor started.`);
        try {
            const auth = {
                auth: {
                    username: "buyer-challenge@caronsale.de",
                    password: "Test123."
                }
            };
            // Retrieve the list of running auctions from the CarOnSale API
            const runningAuctions = await this.carOnSaleClient.getRunningAuctions(auth);
            // Display the number of auctions
            console.log(`Number of auctions: ${runningAuctions.length}`);
            // Calculate the average number of bids on an auction
            const totalBids = runningAuctions.reduce((sum, auction) => sum + auction.bids, 0);
            const averageBids = totalBids / runningAuctions.length;
            console.log(`Average number of bids on an auction: ${averageBids}`);
            // Calculate the average percentage of the auction progress
            const totalProgress = runningAuctions.reduce((sum, auction) => sum + auction.progress, 0);
            const averageProgress = totalProgress / runningAuctions.length;
            console.log(`Average percentage of auction progress: ${averageProgress}%`);
        }
        catch (error) {
            console.error('Failed to retrieve running auctions:', error);
            process.exit(-1);
        }
        process.exit(0);
    }
};
AuctionMonitorApp = __decorate([
    __param(0, (0, inversify_1.inject)("ILogger")),
    __param(1, (0, inversify_1.inject)("ICarOnSaleClient")),
    __metadata("design:paramtypes", [Object, Object])
], AuctionMonitorApp);
exports.AuctionMonitorApp = AuctionMonitorApp;
