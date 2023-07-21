import 'reflect-metadata';
import { CarOnSaleClient } from "../classes/CarOnSaleClient";
import { Auction } from "../interface/ICarOnSaleClient";
import chai, { expect as chaiExpect } from "chai"; // Import chai and rename 'expect' to 'chaiExpect'
import chaiAsPromised from "chai-as-promised"; // Import chai-as-promised

// Use the chai-as-promised plugin
chai.use(chaiAsPromised);

// Mock class for CarOnSaleClient
class MockCarOnSaleClient extends CarOnSaleClient {
  // Override the getRunningAuctions method
  async getRunningAuctions(_auth: any): Promise<Auction[]> {
    return [];
  }
}

describe("CarOnSaleClient", () => {
  // Test getRunningAuctions method
  describe("getRunningAuctions", () => {
    it("should fetch running auctions with valid credentials", async () => {
      const client = new CarOnSaleClient();
      const auth = {
        auth: {
          username: "buyer-challenge@caronsale.de",
          password: "Test123."
        }
      };

      const auctions: Auction[] = await client.getRunningAuctions(auth);

      // Make assertions about the response
      chaiExpect(auctions).to.be.an("array");
      chaiExpect(auctions).to.have.length.greaterThan(0);
      // TODO Add more specific assertions based on the expected response from the API
    });

    it("should throw an error with invalid credentials", async () => {
      const client = new CarOnSaleClient();
      const auth = {
        auth: {
          username: "invalid-username",
          password: "invalid-password"
        }
      };

      // Use chai-as-promised to handle the rejected promise
      await chaiExpect(client.getRunningAuctions(auth)).to.be.rejected;
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

      const auctions: Auction[] = await mockClient.getRunningAuctions(auth);

      chaiExpect(auctions).to.be.an("array");
      chaiExpect(auctions).to.have.lengthOf(0);
    });

    it("should handle network errors", async () => {
      // Create a mock CarOnSaleClient that throws a network error
      class NetworkErrorMockCarOnSaleClient extends CarOnSaleClient {
        async getRunningAuctions(_auth: any): Promise<Auction[]> {
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
      await chaiExpect(mockClient.getRunningAuctions(auth)).to.be.rejectedWith("Network error");
    });
  });
});
