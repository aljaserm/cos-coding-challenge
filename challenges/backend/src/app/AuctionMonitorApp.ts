import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient, Auction } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { DependencyIdentifier } from "./DependencyIdentifiers";

@injectable()
export class AuctionMonitorApp {
  constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient,
  ) {
  }

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    try {
      const auth = {
        auth: {
          username: "buyer-challenge@caronsale.de",
          password: "Test123."
        }
      };

      // Retrieve the list of running auctions from the CarOnSale API
      const runningAuctions: Auction[] = await this.carOnSaleClient.getRunningAuctions(auth);

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
    } catch (error) {
      console.error('Failed to retrieve running auctions:', error);
      process.exit(-1);
    }

    process.exit(0);
  }
}
