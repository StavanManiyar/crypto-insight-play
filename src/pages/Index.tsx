import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, BookOpen, BarChart3, Trophy, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/90 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">CryptoML</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <Link to="/app">
              <Button variant="outline" size="sm">
                Start Trading
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Paper Trading Only - Risk Free Learning
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Master Crypto Trading with AI Signals
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn cryptocurrency trading with real-time ML-powered signals, paper trading simulation, 
            and comprehensive analytics. Build your skills without risking real money.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" className="w-full sm:w-auto">
                Start Paper Trading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">$0</div>
              <div className="text-sm text-muted-foreground">Real Money Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Signal Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Market Analysis</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Learning Resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Learn Trading</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From beginner-friendly tutorials to advanced analytics, master crypto trading step by step.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Signals</h3>
              <p className="text-muted-foreground">
                Get real-time trading signals powered by machine learning algorithms analyzing market patterns and indicators.
              </p>
            </CardContent>
          </Card>
          
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Paper Trading</h3>
              <p className="text-muted-foreground">
                Practice trading with virtual money in a realistic environment. Learn without financial risk.
              </p>
            </CardContent>
          </Card>
          
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-info" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track your performance with detailed metrics, equity curves, and comprehensive trade analysis.
              </p>
            </CardContent>
          </Card>
          
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educational Content</h3>
              <p className="text-muted-foreground">
                Learn from comprehensive tutorials covering everything from basics to advanced strategies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leaderboards</h3>
              <p className="text-muted-foreground">
                Compete with other traders, track rankings, and learn from top performers.
              </p>
            </CardContent>
          </Card>
          
          <Card className="trading-card hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Backtesting</h3>
              <p className="text-muted-foreground">
                Test trading strategies against historical data to validate your approach before going live.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your crypto trading journey in just three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Setup Your Account</h3>
            <p className="text-muted-foreground">
              Choose your base currency and starting balance for paper trading simulation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Follow AI Signals</h3>
            <p className="text-muted-foreground">
              Receive real-time trading signals with confidence scores and detailed analysis.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Learn</h3>
            <p className="text-muted-foreground">
              Monitor your performance, analyze trades, and continuously improve your skills.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of traders learning crypto trading with our AI-powered platform.
          </p>
          
          <Link to="/app">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Paper Trading Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-4">
            100% Free • No Credit Card Required • Risk-Free Learning
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">CryptoML</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The ultimate platform for learning cryptocurrency trading with AI-powered signals and risk-free paper trading.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/app/markets" className="hover:text-foreground transition-colors">Markets</Link></li>
                <li><Link to="/app/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
                <li><Link to="/app/learn" className="hover:text-foreground transition-colors">Learn</Link></li>
                <li><Link to="/app/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CryptoML. All rights reserved. This is a paper trading simulation platform for educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;