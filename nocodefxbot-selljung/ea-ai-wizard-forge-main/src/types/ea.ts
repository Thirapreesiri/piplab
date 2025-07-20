
/**
 * Types for EA Builder
 */

export interface Condition {
  id: string;
  type: string;
  name: string;
  parameters: Record<string, any>;
}

export interface EAConfig {
  entryConditions: Condition[];
  exitConditions: Condition[];
  riskManagement: {
    stopLoss: number;
    takeProfit: number;
    trailingStop: boolean;
    lotSize: number;
  };
}
