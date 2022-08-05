import { Log } from "./log.model";

export interface User {
  name: string,
  nameHistory: Log[],
}
