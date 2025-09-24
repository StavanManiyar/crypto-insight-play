import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, ArrowRight, Shield, TrendingUp, Brain, PenTool } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Understanding Risk Management",
    description: "Learn the fundamentals of risk management in crypto trading, including position sizing, stop losses, and portfolio allocation.",
    duration: "15 min",
    difficulty: "Beginner",
    icon: Shield,
    completed: false,
    content: `
# Understanding Risk Management

Risk management is the cornerstone of successful trading. Without proper risk management, even the most profitable strategies can lead to significant losses.

## Key Principles

### 1. Position Sizing
Never risk more than 1-2% of your portfolio on a single trade. This ensures that even a series of losses won't devastate your account.

### 2. Stop Losses
Always set stop losses before entering a trade. This predetermined exit point helps limit losses and removes emotion from the decision.

### 3. Risk-Reward Ratio
Aim for a minimum 2:1 risk-reward ratio. This means for every $1 you risk, you should aim to make at least $2.

## Practical Application

In paper trading, practice these principles consistently. The habits you build here will serve you well in real trading.

Remember: The goal isn't to be right all the time, but to manage risk so that when you're wrong, the losses are small, and when you're right, the gains are significant.
    `
  },
  {
    id: 2,
    title: "Technical Indicators Explained",
    description: "Master the most important technical indicators including RSI, MACD, moving averages, and volume analysis.",
    duration: "20 min",
    difficulty: "Intermediate",
    icon: TrendingUp,
    completed: false,
    content: `
# Technical Indicators Explained

Technical indicators are mathematical calculations based on price and volume data that help traders identify trends and potential trading opportunities.

## Essential Indicators

### 1. Relative Strength Index (RSI)
- Measures momentum (0-100 scale)
- Above 70: Potentially overbought
- Below 30: Potentially oversold

### 2. Moving Averages
- Simple Moving Average (SMA): Average price over N periods
- Exponential Moving Average (EMA): Gives more weight to recent prices
- Golden Cross: 50-day MA crosses above 200-day MA (bullish)
- Death Cross: 50-day MA crosses below 200-day MA (bearish)

### 3. MACD (Moving Average Convergence Divergence)
- Shows relationship between two moving averages
- Signal line crossovers indicate potential buy/sell points
- Histogram shows momentum

### 4. Volume
- Confirms price movements
- High volume with price increase = strong bullish signal
- High volume with price decrease = strong bearish signal

## Using Indicators Effectively

Never rely on a single indicator. Use multiple indicators to confirm signals and always consider the overall market context.
    `
  },
  {
    id: 3,
    title: "How AI Signals Work",
    description: "Understand how machine learning algorithms analyze market data to generate trading signals with confidence scores.",
    duration: "12 min",
    difficulty: "Intermediate",
    icon: Brain,
    completed: false,
    content: `
# How AI Signals Work

Our AI trading signals are generated using advanced machine learning algorithms that analyze multiple data sources to identify potential trading opportunities.

## Data Sources

### 1. Price Action
- Candlestick patterns
- Support and resistance levels
- Chart formations

### 2. Technical Indicators
- RSI, MACD, Bollinger Bands
- Volume indicators
- Momentum oscillators

### 3. Market Sentiment
- News sentiment analysis
- Social media trends
- Fear & Greed Index

## Signal Generation Process

1. **Data Collection**: Real-time market data is collected every minute
2. **Feature Engineering**: Raw data is transformed into meaningful features
3. **Model Prediction**: ML models predict price direction and magnitude
4. **Confidence Scoring**: Signals are assigned confidence scores (0-1)
5. **Risk Assessment**: Potential risk and reward are calculated

## Understanding Confidence Scores

- **0.9-1.0**: Very High Confidence - Strong signal with multiple confirmations
- **0.7-0.9**: High Confidence - Good signal with solid backing
- **0.5-0.7**: Medium Confidence - Moderate signal, use with caution
- **Below 0.5**: Low Confidence - Weak signal, consider avoiding

## Best Practices

- Higher confidence signals tend to be more reliable
- Always combine AI signals with your own analysis
- Use proper risk management regardless of signal strength
- Monitor signal performance over time
    `
  },
  {
    id: 4,
    title: "Trade Journaling & Psychology",
    description: "Learn how to maintain a trading journal and develop the psychological skills needed for successful trading.",
    duration: "18 min",
    difficulty: "Beginner",
    icon: PenTool,
    completed: false,
    content: `
# Trade Journaling & Psychology

Trading psychology and proper journaling are often overlooked but are crucial for long-term success.

## Why Keep a Trading Journal?

### 1. Track Performance
- Identify what strategies work best
- Spot patterns in your trading
- Calculate actual risk-reward ratios

### 2. Emotional Awareness
- Recognize emotional triggers
- Understand fear and greed impacts
- Develop emotional discipline

### 3. Continuous Improvement
- Learn from both wins and losses
- Refine your trading strategy
- Build confidence through data

## What to Record

For each trade, document:
- Entry and exit points
- Reason for entering the trade
- Emotions before, during, and after
- What you learned
- What you would do differently

## Common Psychological Pitfalls

### 1. FOMO (Fear of Missing Out)
- Entering trades impulsively
- Chasing already-moved prices
- Solution: Stick to your plan

### 2. Revenge Trading
- Trying to immediately recover losses
- Taking excessive risks
- Solution: Take breaks after losses

### 3. Overconfidence
- Increasing position sizes after wins
- Ignoring risk management
- Solution: Stay humble and consistent

## Building Mental Resilience

- Accept that losses are part of trading
- Focus on process, not just outcomes
- Maintain realistic expectations
- Practice patience and discipline

Remember: Your biggest enemy in trading is often your own emotions.
    `
  }
];

const Learn = () => {
  const completedLessons = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learn</h1>
          <p className="text-muted-foreground">Master crypto trading with our comprehensive educational resources</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="font-semibold">{completedLessons}/{lessons.length} Completed</div>
          </div>
          <div className="w-24">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Crypto Trading Fundamentals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {lessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <div 
                  key={lesson.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {lesson.completed && (
                        <Badge variant="default" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    {lesson.completed ? "Review" : "Start"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="trading-card">
          <CardHeader>
            <CardTitle>Trading Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-success" />
              </div>
              <div>
                <p className="font-medium">Start Small</p>
                <p className="text-sm text-muted-foreground">Begin with small position sizes while you learn and build confidence.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-info" />
              </div>
              <div>
                <p className="font-medium">Plan Your Trades</p>
                <p className="text-sm text-muted-foreground">Always have a clear entry, exit, and risk management plan.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-warning" />
              </div>
              <div>
                <p className="font-medium">Stay Patient</p>
                <p className="text-sm text-muted-foreground">Wait for high-quality setups rather than forcing trades.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader>
            <CardTitle>Risk Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-destructive" />
              </div>
              <div>
                <p className="font-medium">Never Risk More Than You Can Afford</p>
                <p className="text-sm text-muted-foreground">This is paper trading, but develop good habits for real trading.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-destructive" />
              </div>
              <div>
                <p className="font-medium">Don't Trade on Emotions</p>
                <p className="text-sm text-muted-foreground">Fear and greed are the enemies of successful trading.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-destructive" />
              </div>
              <div>
                <p className="font-medium">Crypto is Highly Volatile</p>
                <p className="text-sm text-muted-foreground">Prices can move dramatically in short periods. Use proper risk management.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learn;