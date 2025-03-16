// Dashboard data from API
export interface DashboardData {
  total_balance: number;
  month_over_month_change: number;
  active_copies: {
    count: number;
    new_this_week: number;
  };
  profit_loss: {
    amount: number;
    period: string;
  };
  memecoin_holdings: {
    count: number;
    unique_tokens: number;
  };
}

/**
 * Interface for trade data
 */
export interface Trade {
  id: string;
  trade_type: 'buy' | 'sell' | 'swap';
  status: 'pending' | 'completed' | 'failed';
  executed_at: string;
  token_name: string;
  amount: number;
  price: number;
  total_value: number;
  fee: number;
}

export interface Transaction {
  id: string;
  trade_type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  token_name: string;
  amount: number;
  price: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

// New types for Copy Trading
export interface TopTrader {
  id: string;
  username: string;
  win_rate: number;
  profit_percentage: number;
  total_followers: number;
  avatar_url?: string;
}

export interface Trader {
  id: string;
  username: string;
  avatar_url?: string;
}

export interface FollowerRelationship {
  id: string;
  follower: {
    id: string;
    username: string;
  };
  trader: {
    id: string;
    username: string;
    avatar_url?: string;
  };
  copy_amount: number;
  profit_loss: number;
  start_date: string;
  status: 'active' | 'paused' | 'stopped';
}

export interface CopySettings {
  copyAmount: number | null;
  maxRisk: number | null;
  copyMode: string;
  autoCopy: boolean;
  gasPreference?: string;
  slippageTolerance?: number;
}

// Token balance type
export interface TokenBalance {
  id: number;
  symbol: string;
  name: string;
  balance: number;
  valueUSD: number;
}

// Market price information
export interface MarketPrice {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

// Swap transaction
export interface SwapTransaction {
  id: number;
  timestamp: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  valueUSD: number;
  fee: number;
  status: string;
}

// Swap request data
export interface SwapRequest {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  slippageTolerance: number;
}


// Portfolio summary with total value and changes
export interface PortfolioSummary {
  totalValue: number;
  dayChange: {
    amount: number;
    percentage: number;
  };
  weekChange: {
    amount: number;
    percentage: number;
  };
  monthChange: {
    amount: number;
    percentage: number;
  };
  allTimeChange: {
    amount: number;
    percentage: number;
  };
}

// Portfolio asset (token holding)
export interface PortfolioAsset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  allocation: number;
  change24h: number;
  price: number;
}

// Trade history item
export interface TradeHistory {
  id: number;
  timestamp: string;
  type: string;
  asset: string;
  amount: number;
  price: number;
  value: number;
  fee?: number;
  txHash?: string;
}

// Analytics summary data
export interface AnalyticsSummary {
  totalProfitLoss: number;
  profitLossPercentage: number;
  winRate: number;
  winRateChange: number;
  totalTrades: number;
  averageTrade: number;
}

// Chart data types
export interface TimeseriesData {
  labels: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
    fill?: boolean;
  }[];
  formatY?: 'currency' | 'percentage' | 'number';
  startAtZero?: boolean;
}

export interface LineChartData extends TimeseriesData { }

export interface BarChartData {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
  borderColors?: string[] | string;
  formatY?: 'currency' | 'percentage' | 'number';
  startAtZero?: boolean;
  horizontal?: boolean;
  conditionalColors?: boolean;
}

export interface PieChartData {
  labels: string[];
  data: number[];
  colors?: string[];
  doughnut?: boolean;
  formatValues?: 'currency' | 'percentage' | 'number';
}

export interface HeatmapData {
  xLabels: string[];
  yLabels: string[];
  data: number[][];
  min: number;
  max: number;
  title?: string;
  formatValues?: 'currency' | 'percentage' | 'number';
}

export interface TraderComparisonData {
  traders: {
    name: string;
    performance: number;
  }[];
}

export interface AllocationData {
  allocations: {
    traderId: string;
    traderName: string;
    percentage: number;
    amount: number;
  }[];
  total: number;
}

// Chart related types
export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PerformanceChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface ClientProfile {
  id: number;
  user: User;
  email_verified: string | null;
  profile_picture: string | null;
  is_trader: boolean;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
  total_balance: number;
  profit_loss: number;
  profit_loss_percentage: number;
  total_value: number;
  day_change: number;
  day_change_percentage: number;
  week_change: number;
  month_change: number;
  all_time_profit: number;
  bio: string | null;
  win_rate: number;
  profit_percentage: number;
  total_followers: number;
  total_trades: number;
  average_trade_profit: number;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  risk_level: 'low' | 'medium' | 'high';
  verified: boolean;
  default_currency: string;
  auto_approve_swaps: boolean;
  copy_amount: number;
  copy_mode: 'proportional' | 'fixed' | 'mirror';
  min_risk: number;
  slippage_tolerance: number;
  gas_preference: 'slow' | 'medium' | 'fast';
}