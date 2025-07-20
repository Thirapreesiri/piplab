/**
 * EA Generator Utility
 * 
 * This utility creates MQL4/MQL5 code for Expert Advisors
 * based on the configuration provided through the Builder interface.
 */

import { EAConfig } from '@/types/ea';
import siteConfig from '@/config/config';

/**
 * Generate EA code based on the provided configuration
 */
export const generateEACode = (config: EAConfig, eaName: string = "CustomEA"): string => {
  const timestamp = new Date().toISOString();
  
  // Header section
  let code = `//+------------------------------------------------------------------+
//|                      ${eaName}.mq4                                |
//|               Created by ${siteConfig.eaCopyright} at ${timestamp}               |
//|                      ${siteConfig.eaWebsite}                        |
//+------------------------------------------------------------------+
#property copyright "${siteConfig.eaCopyright}"
#property link      "${siteConfig.eaWebsite}"
#property version   "1.00"
#property strict

// Global Variables
double g_stopLoss = 0;
double g_takeProfit = 0;
bool g_useTrailingStop = false;
double g_lotSize = 0.1;
datetime g_lastTradeTime = 0;

// Input Parameters
input double StopLoss = ${config.riskManagement.stopLoss};         // Stop Loss in pips
input double TakeProfit = ${config.riskManagement.takeProfit};     // Take Profit in pips
input bool   UseTrailingStop = ${config.riskManagement.trailingStop ? "true" : "false"};  // Use trailing stop
input double LotSize = ${config.riskManagement.lotSize};           // Lot size
`;

  // Add entry condition parameters
  if (config.entryConditions.length > 0) {
    code += "\n// Entry Conditions\n";
    
    config.entryConditions.forEach((condition, index) => {
      const conditionId = condition.id.split('-')[0];
      switch(conditionId) {
        case 'ma':
          code += `input int FastMA_Period_${index+1} = ${condition.parameters.fastPeriod || 9};     // Fast MA Period (${condition.name})
input int SlowMA_Period_${index+1} = ${condition.parameters.slowPeriod || 21};     // Slow MA Period (${condition.name})
input string MA_Direction_${index+1} = "${condition.parameters.direction || 'bullish'}"; // MA Cross Direction (${condition.name})
`;
          break;
        case 'rsi':
          code += `input int RSI_Period_${index+1} = ${condition.parameters.period || 14};        // RSI Period (${condition.name})
input int RSI_Overbought_${index+1} = ${condition.parameters.overbought || 70};  // RSI Overbought Level (${condition.name})
input int RSI_Oversold_${index+1} = ${condition.parameters.oversold || 30};    // RSI Oversold Level (${condition.name})
`;
          break;
        case 'macd':
          code += `input int MACD_FastEMA_${index+1} = ${condition.parameters.fastEMA || 12};     // MACD Fast EMA (${condition.name})
input int MACD_SlowEMA_${index+1} = ${condition.parameters.slowEMA || 26};     // MACD Slow EMA (${condition.name})
input int MACD_SignalPeriod_${index+1} = ${condition.parameters.signalPeriod || 9}; // MACD Signal Period (${condition.name})
`;
          break;
        case 'bollinger':
          code += `input int Bollinger_Period_${index+1} = ${condition.parameters.period || 20};     // Bollinger Period (${condition.name})
input double Bollinger_Deviations_${index+1} = ${condition.parameters.deviations || 2.0};  // Bollinger Deviations (${condition.name})
input string Bollinger_Action_${index+1} = "${condition.parameters.action || 'touch_lower'}"; // Bollinger Action (${condition.name})
`;
          break;
        case 'support-resistance':
          code += `input double Support_Level_${index+1} = ${condition.parameters.supportLevel || 1.2000};     // Support Level (${condition.name})
input double Resistance_Level_${index+1} = ${condition.parameters.resistanceLevel || 1.3000};     // Resistance Level (${condition.name})
input string SR_Action_${index+1} = "${condition.parameters.action || 'bounce_support'}"; // Support/Resistance Action (${condition.name})
`;
          break;
      }
    });
  }

  // Add exit condition parameters
  if (config.exitConditions.length > 0) {
    code += "\n// Exit Conditions\n";
    
    config.exitConditions.forEach((condition, index) => {
      const conditionId = condition.id.split('-')[0];
      
      switch(conditionId) {
        case 'time':
          code += `input int ExitAfterMinutes_${index+1} = ${condition.parameters.minutes || 60};  // Exit after minutes (${condition.name})
`;
          break;
        case 'profit-target':
          code += `input double ProfitTarget_${index+1} = ${condition.parameters.pips || 50}; // Profit target in pips (${condition.name})
`;
          break;
        case 'trailing-stop':
          code += `input double TrailingActivation_${index+1} = ${condition.parameters.activation || 30}; // Trailing activation in pips (${condition.name})
input double TrailingStop_${index+1} = ${condition.parameters.pips || 20}; // Trailing stop in pips (${condition.name})
`;
          break;
      }
    });
  }

  // Add init function
  code += `
//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   // Initialize global variables
   g_stopLoss = StopLoss;
   g_takeProfit = TakeProfit;
   g_useTrailingStop = UseTrailingStop;
   g_lotSize = LotSize;
   
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   // Clean up code here
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   // Check if we have an open position
   if(OrdersTotal() == 0)
   {
      // Check entry conditions
      bool buySignal = false;
      bool sellSignal = false;
      
`;

  // Add entry condition checks
  if (config.entryConditions.length > 0) {
    config.entryConditions.forEach((condition, index) => {
      const idx = index + 1;
      const conditionId = condition.id.split('-')[0];
      
      switch(conditionId) {
        case 'ma':
          code += `      // Entry Condition ${idx}: ${condition.name}
      double fastMA_${idx} = iMA(Symbol(), 0, FastMA_Period_${idx}, 0, MODE_EMA, PRICE_CLOSE, 1);
      double slowMA_${idx} = iMA(Symbol(), 0, SlowMA_Period_${idx}, 0, MODE_EMA, PRICE_CLOSE, 1);
      double fastMA_prev_${idx} = iMA(Symbol(), 0, FastMA_Period_${idx}, 0, MODE_EMA, PRICE_CLOSE, 2);
      double slowMA_prev_${idx} = iMA(Symbol(), 0, SlowMA_Period_${idx}, 0, MODE_EMA, PRICE_CLOSE, 2);
      
      if(StringCompare(MA_Direction_${idx}, "bullish") == 0)
      {
         if(fastMA_prev_${idx} <= slowMA_prev_${idx} && fastMA_${idx} > slowMA_${idx})
         {
            buySignal = true;
            Print("Buy signal from MA cross condition");
         }
      }
      else if(StringCompare(MA_Direction_${idx}, "bearish") == 0)
      {
         if(fastMA_prev_${idx} >= slowMA_prev_${idx} && fastMA_${idx} < slowMA_${idx})
         {
            sellSignal = true;
            Print("Sell signal from MA cross condition");
         }
      }
      
`;
          break;
        case 'rsi':
          code += `      // Entry Condition ${idx}: ${condition.name}
      double rsi_${idx} = iRSI(Symbol(), 0, RSI_Period_${idx}, PRICE_CLOSE, 1);
      
      if(rsi_${idx} <= RSI_Oversold_${idx})
      {
         buySignal = true;
         Print("Buy signal from RSI oversold condition: ", rsi_${idx});
      }
      else if(rsi_${idx} >= RSI_Overbought_${idx})
      {
         sellSignal = true;
         Print("Sell signal from RSI overbought condition: ", rsi_${idx});
      }
      
`;
          break;
        case 'macd':
          code += `      // Entry Condition ${idx}: ${condition.name}
      double macdMain_${idx} = iMACD(Symbol(), 0, MACD_FastEMA_${idx}, MACD_SlowEMA_${idx}, MACD_SignalPeriod_${idx}, PRICE_CLOSE, MODE_MAIN, 1);
      double macdSignal_${idx} = iMACD(Symbol(), 0, MACD_FastEMA_${idx}, MACD_SlowEMA_${idx}, MACD_SignalPeriod_${idx}, PRICE_CLOSE, MODE_SIGNAL, 1);
      double macdMain_prev_${idx} = iMACD(Symbol(), 0, MACD_FastEMA_${idx}, MACD_SlowEMA_${idx}, MACD_SignalPeriod_${idx}, PRICE_CLOSE, MODE_MAIN, 2);
      double macdSignal_prev_${idx} = iMACD(Symbol(), 0, MACD_FastEMA_${idx}, MACD_SlowEMA_${idx}, MACD_SignalPeriod_${idx}, PRICE_CLOSE, MODE_SIGNAL, 2);
      
      if(macdMain_prev_${idx} <= macdSignal_prev_${idx} && macdMain_${idx} > macdSignal_${idx})
      {
         buySignal = true;
         Print("Buy signal from MACD cross condition");
      }
      else if(macdMain_prev_${idx} >= macdSignal_prev_${idx} && macdMain_${idx} < macdSignal_${idx})
      {
         sellSignal = true;
         Print("Sell signal from MACD cross condition");
      }
      
`;
          break;
        case 'bollinger':
          code += `      // Entry Condition ${idx}: ${condition.name}
      double upperBand_${idx} = iBands(Symbol(), 0, Bollinger_Period_${idx}, Bollinger_Deviations_${idx}, 0, PRICE_CLOSE, MODE_UPPER, 1);
      double lowerBand_${idx} = iBands(Symbol(), 0, Bollinger_Period_${idx}, Bollinger_Deviations_${idx}, 0, PRICE_CLOSE, MODE_LOWER, 1);
      double middleBand_${idx} = iBands(Symbol(), 0, Bollinger_Period_${idx}, Bollinger_Deviations_${idx}, 0, PRICE_CLOSE, MODE_MAIN, 1);
      double close_${idx} = Close[1];
      
      if(StringCompare(Bollinger_Action_${idx}, "touch_lower") == 0 && close_${idx} <= lowerBand_${idx})
      {
         buySignal = true;
         Print("Buy signal from Bollinger touch lower band condition");
      }
      else if(StringCompare(Bollinger_Action_${idx}, "touch_upper") == 0 && close_${idx} >= upperBand_${idx})
      {
         sellSignal = true;
         Print("Sell signal from Bollinger touch upper band condition");
      }
      else if(StringCompare(Bollinger_Action_${idx}, "cross_middle_up") == 0)
      {
         double prev_close_${idx} = Close[2];
         if(prev_close_${idx} < middleBand_${idx} && close_${idx} >= middleBand_${idx})
         {
            buySignal = true;
            Print("Buy signal from Bollinger cross middle up condition");
         }
      }
      else if(StringCompare(Bollinger_Action_${idx}, "cross_middle_down") == 0)
      {
         double prev_close_${idx} = Close[2];
         if(prev_close_${idx} > middleBand_${idx} && close_${idx} <= middleBand_${idx})
         {
            sellSignal = true;
            Print("Sell signal from Bollinger cross middle down condition");
         }
      }
      
`;
          break;
        case 'support-resistance':
          code += `      // Entry Condition ${idx}: ${condition.name}
      double supportLevel_${idx} = Support_Level_${idx};
      double resistanceLevel_${idx} = Resistance_Level_${idx};
      double close_${idx} = Close[1];
      double open_${idx} = Open[1];
      
      if(StringCompare(SR_Action_${idx}, "bounce_support") == 0)
      {
         if(Low[1] <= supportLevel_${idx} && close_${idx} > supportLevel_${idx})
         {
            buySignal = true;
            Print("Buy signal from bounce off support level: ", supportLevel_${idx});
         }
      }
      else if(StringCompare(SR_Action_${idx}, "bounce_resistance") == 0)
      {
         if(High[1] >= resistanceLevel_${idx} && close_${idx} < resistanceLevel_${idx})
         {
            sellSignal = true;
            Print("Sell signal from bounce off resistance level: ", resistanceLevel_${idx});
         }
      }
      else if(StringCompare(SR_Action_${idx}, "break_support") == 0)
      {
         if(open_${idx} >= supportLevel_${idx} && close_${idx} < supportLevel_${idx})
         {
            sellSignal = true;
            Print("Sell signal from break of support level: ", supportLevel_${idx});
         }
      }
      else if(StringCompare(SR_Action_${idx}, "break_resistance") == 0)
      {
         if(open_${idx} <= resistanceLevel_${idx} && close_${idx} > resistanceLevel_${idx})
         {
            buySignal = true;
            Print("Buy signal from break of resistance level: ", resistanceLevel_${idx});
         }
      }
      
`;
          break;
      }
    });
  }

  // Execute trades based on signals
  code += `      // Execute trades based on signals
      if(buySignal)
      {
         double sl = g_stopLoss > 0 ? Ask - g_stopLoss * Point * 10 : 0;
         double tp = g_takeProfit > 0 ? Ask + g_takeProfit * Point * 10 : 0;
         
         int ticket = OrderSend(Symbol(), OP_BUY, g_lotSize, Ask, 3, sl, tp, "${eaName} Buy", 0, 0, Green);
         
         if(ticket > 0)
         {
            Print("Buy order opened successfully");
            g_lastTradeTime = TimeCurrent();
         }
         else
         {
            Print("Error opening buy order: ", GetLastError());
         }
      }
      else if(sellSignal)
      {
         double sl = g_stopLoss > 0 ? Bid + g_stopLoss * Point * 10 : 0;
         double tp = g_takeProfit > 0 ? Bid - g_takeProfit * Point * 10 : 0;
         
         int ticket = OrderSend(Symbol(), OP_SELL, g_lotSize, Bid, 3, sl, tp, "${eaName} Sell", 0, 0, Red);
         
         if(ticket > 0)
         {
            Print("Sell order opened successfully");
            g_lastTradeTime = TimeCurrent();
         }
         else
         {
            Print("Error opening sell order: ", GetLastError());
         }
      }
   }
   else
   {
      // Manage open positions
      for(int i = 0; i < OrdersTotal(); i++)
      {
         if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
         {
            if(OrderSymbol() == Symbol() && OrderMagicNumber() == 0)
            {
               bool shouldClose = false;
               
`;

  // Add exit condition checks
  if (config.exitConditions.length > 0) {
    config.exitConditions.forEach((condition, index) => {
      const idx = index + 1;
      const conditionId = condition.id.split('-')[0];
      
      switch(conditionId) {
        case 'time':
          code += `               // Exit Condition ${idx}: ${condition.name}
               if(TimeCurrent() - OrderOpenTime() >= ExitAfterMinutes_${idx} * 60)
               {
                  Print("Exit after time condition met");
                  shouldClose = true;
               }
               
`;
          break;
        case 'profit-target':
          code += `               // Exit Condition ${idx}: ${condition.name}
               double currentProfit = OrderProfit();
               double entryPrice = OrderOpenPrice();
               double currentPrice = OrderType() == OP_BUY ? Bid : Ask;
               double profitInPips = MathAbs(currentPrice - entryPrice) / (Point * 10);
               
               if(OrderType() == OP_BUY && Bid > entryPrice && profitInPips >= ProfitTarget_${idx})
               {
                  Print("Profit target condition met: ", profitInPips, " pips");
                  shouldClose = true;
               }
               else if(OrderType() == OP_SELL && Ask < entryPrice && profitInPips >= ProfitTarget_${idx})
               {
                  Print("Profit target condition met: ", profitInPips, " pips");
                  shouldClose = true;
               }
               
`;
          break;
        case 'trailing-stop':
          code += `               // Exit Condition ${idx}: ${condition.name}
               double currentPrice_${idx} = OrderType() == OP_BUY ? Bid : Ask;
               double entryPrice_${idx} = OrderOpenPrice();
               double profitInPips_${idx} = OrderType() == OP_BUY ? 
                                    (currentPrice_${idx} - entryPrice_${idx}) / (Point * 10) : 
                                    (entryPrice_${idx} - currentPrice_${idx}) / (Point * 10);
               
               if(profitInPips_${idx} >= TrailingActivation_${idx})
               {
                  double newSL_${idx} = OrderType() == OP_BUY ? 
                                 currentPrice_${idx} - TrailingStop_${idx} * Point * 10 : 
                                 currentPrice_${idx} + TrailingStop_${idx} * Point * 10;
                  
                  bool result = OrderModify(OrderTicket(), OrderOpenPrice(), newSL_${idx}, OrderTakeProfit(), 0, Green);
                  if(!result)
                  {
                     Print("Error modifying buy order: ", GetLastError());
                  }
               }
               
`;
          break;
      }
    });
  }

  // Default trailing stop from risk management
  if (config.riskManagement.trailingStop) {
    code += `               // Default Trailing Stop
               if(g_useTrailingStop)
               {
                  double currentPrice_ts = OrderType() == OP_BUY ? Bid : Ask;
                  
                  if(OrderType() == OP_BUY)
                  {
                     double newSL_ts = currentPrice_ts - g_stopLoss * Point * 10;
                     if(newSL_ts > OrderOpenPrice() && (OrderStopLoss() < newSL_ts || OrderStopLoss() == 0))
                     {
                        bool result = OrderModify(OrderTicket(), OrderOpenPrice(), newSL_ts, OrderTakeProfit(), 0, Green);
                        if(!result)
                        {
                           Print("Error modifying buy order: ", GetLastError());
                        }
                     }
                  }
                  else if(OrderType() == OP_SELL)
                  {
                     double newSL_ts = currentPrice_ts + g_stopLoss * Point * 10;
                     if(newSL_ts < OrderOpenPrice() && (OrderStopLoss() > newSL_ts || OrderStopLoss() == 0))
                     {
                        bool result = OrderModify(OrderTicket(), OrderOpenPrice(), newSL_ts, OrderTakeProfit(), 0, Red);
                        if(!result)
                        {
                           Print("Error modifying sell order: ", GetLastError());
                        }
                     }
                  }
               }
`;
  }

  // Close order if exit conditions met
  code += `
               // Close order if exit conditions met
               if(shouldClose)
               {
                  bool result = OrderClose(OrderTicket(), OrderLots(), OrderType() == OP_BUY ? Bid : Ask, 3, OrderType() == OP_BUY ? Red : Green);
                  if(result)
                  {
                     Print("Order closed successfully");
                  }
                  else
                  {
                     Print("Error closing order: ", GetLastError());
                  }
               }
            }
         }
      }
   }
}
`;

  return code;
};

/**
 * Creates a downloadable blob from EA code
 */
export const createEAFile = (config: EAConfig, eaName: string = "CustomEA"): File => {
  const code = generateEACode(config, eaName);
  const blob = new Blob([code], { type: 'application/octet-stream' });
  return new File([blob], `${eaName}.mq4`, { type: 'application/octet-stream' });
};
