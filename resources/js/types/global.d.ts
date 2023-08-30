import ziggyRoute, { Config as ZiggyConfig } from "ziggy-js";

declare global {
  var route: typeof ziggyRoute;
  var Ziggy: ZiggyConfig;
}
