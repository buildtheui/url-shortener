import { IConfigHelpers } from "@domain/contracts/i-config-helpers";

export class ConfigHelpers implements IConfigHelpers {
  getHostURL(): string {
    return this.isDevelopment()
      ? `${process.env.DEV_HOST}:${process.env.DEV_PORT}`
      : `${process.env.HOST}`;
  }
  isDevelopment(): boolean {
    // TODO: validate what is the best way to get the environment  
    return !!process.env.TS_NODE_DEV;
  }
}
