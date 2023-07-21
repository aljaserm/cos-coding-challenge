import { injectable } from "inversify";
import { ILogger } from "./interface/ILogger";

@injectable()
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}
