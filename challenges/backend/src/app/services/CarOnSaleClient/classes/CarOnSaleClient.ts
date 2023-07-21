import { injectable } from 'inversify';
import axios, { AxiosRequestConfig } from 'axios';
import { ICarOnSaleClient, Auction } from '../interface/ICarOnSaleClient';

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  private apiUrl = 'https://api-core-dev.caronsale.de';

  async getRunningAuctions(auth: AxiosRequestConfig): Promise<Auction[]> {
    const response = await axios.get(`${this.apiUrl}/auctions/running`, auth);

    // Assuming the API response contains an array of auction objects with the specified properties
    return response.data as Auction[];
  }
}
