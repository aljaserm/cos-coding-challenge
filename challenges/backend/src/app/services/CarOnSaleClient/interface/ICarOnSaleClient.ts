import { AxiosRequestConfig } from "axios";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions(auth: AxiosRequestConfig): Promise<Auction[]>;
}

export interface Auction {
  id: number;
  title: string;
  bids: number;
  progress: number;
}
