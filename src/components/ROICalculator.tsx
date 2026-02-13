import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Clock, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ROICalculator() {
  const [employees, setEmployees] = useState([50]);
  const [avgSalary, setAvgSalary] = useState([65000]);
  const [hoursPerWeek, setHoursPerWeek] = useState([10]);
  const [errorRate, setErrorRate] = useState([5]);

  const calculations = useMemo(() => {
    const emp = employees[0];
    const salary = avgSalary[0];
    const hours = hoursPerWeek[0];
    const errors = errorRate[0];

    // Cost calculations
    const hourlyRate = salary / 2080; // 52 weeks * 40 hours
    const weeklyLaborCost = emp * hours * hourlyRate;
    const annualLaborCost = weeklyLaborCost * 52;

    // Error cost (assuming 2 hours to fix each error)
    const errorsPerWeek = (emp * hours * errors) / 100;
    const errorCostPerWeek = errorsPerWeek * 2 * hourlyRate;
    const annualErrorCost = errorCostPerWeek * 52;

    // Operon OS costs
    const operonMonthlyCost = 299; // Team plan
    const operonAnnualCost = operonMonthlyCost * 12;

    // Savings (assuming 80% automation, 95% error reduction)
    const laborSavings = annualLaborCost * 0.8;
    const errorSavings = annualErrorCost * 0.95;
    const totalSavings = laborSavings + errorSavings;
    const netSavings = totalSavings - operonAnnualCost;
    const roi = ((netSavings / operonAnnualCost) * 100);
    const paybackMonths = operonAnnualCost / (totalSavings / 12);
    const timeSaved = emp * hours * 0.8; // 80% automation

    return {
      annualLaborCost,
      annualErrorCost,
      totalCurrentCost: annualLaborCost + annualErrorCost,
      operonAnnualCost,
      laborSavings,
      errorSavings,
      totalSavings,
      netSavings,
      roi,
      paybackMonths,
      timeSaved,
    };
  }, [employees, avgSalary, hoursPerWeek, errorRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <Card className="p-6 glass-card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold">ROI Calculator</h3>
            <p className="text-xs text-muted-foreground">Customize for your business</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Employees */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Number of Employees</Label>
              <Badge variant="secondary">{employees[0]}</Badge>
            </div>
            <Slider
              value={employees}
              onValueChange={setEmployees}
              min={1}
              max={500}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>500</span>
            </div>
          </div>

          {/* Average Salary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Avg Annual Salary</Label>
              <Badge variant="secondary">{formatCurrency(avgSalary[0])}</Badge>
            </div>
            <Slider
              value={avgSalary}
              onValueChange={setAvgSalary}
              min={30000}
              max={150000}
              step={5000}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$30K</span>
              <span>$150K</span>
            </div>
          </div>

          {/* Hours per Week */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Manual Work Hours/Week</Label>
              <Badge variant="secondary">{hoursPerWeek[0]} hrs</Badge>
            </div>
            <Slider
              value={hoursPerWeek}
              onValueChange={setHoursPerWeek}
              min={1}
              max={40}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hr</span>
              <span>40 hrs</span>
            </div>
          </div>

          {/* Error Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Current Error Rate</Label>
              <Badge variant="secondary">{errorRate[0]}%</Badge>
            </div>
            <Slider
              value={errorRate}
              onValueChange={setErrorRate}
              min={0}
              max={20}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Panel */}
      <div className="space-y-4">
        {/* ROI Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={calculations.roi}
          className="glass-card p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative z-10">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-2">Annual ROI</p>
            <motion.p
              className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2"
              key={calculations.roi}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {formatNumber(calculations.roi)}%
            </motion.p>
            <p className="text-sm text-muted-foreground">
              Payback in {formatNumber(calculations.paybackMonths)} months
            </p>
          </div>
        </motion.div>

        {/* Savings Breakdown */}
        <Card className="p-6 glass-card">
          <h4 className="font-display font-semibold mb-4">Annual Savings Breakdown</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Labor Cost Savings</span>
              </div>
              <span className="font-medium">{formatCurrency(calculations.laborSavings)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Error Reduction Savings</span>
              </div>
              <span className="font-medium">{formatCurrency(calculations.errorSavings)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-red-500" />
                <span className="text-sm">Operon OS Annual Cost</span>
              </div>
              <span className="font-medium text-destructive">
                -{formatCurrency(calculations.operonAnnualCost)}
              </span>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium">Net Annual Savings</span>
              </div>
              <span className="font-bold text-lg gradient-text">
                {formatCurrency(calculations.netSavings)}
              </span>
            </div>
          </div>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 glass-card text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold gradient-text">
              {formatNumber(calculations.timeSaved)}
            </p>
            <p className="text-xs text-muted-foreground">Hours saved/week</p>
          </Card>

          <Card className="p-4 glass-card text-center">
            <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold gradient-text">
              95%
            </p>
            <p className="text-xs text-muted-foreground">Error reduction</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
