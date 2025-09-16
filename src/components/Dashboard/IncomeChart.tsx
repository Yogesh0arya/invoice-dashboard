import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TimePeriod = "1month" | "3months" | "1year" | "custom";

interface IncomeChartProps {
  selectedPeriod: TimePeriod;
  chartData: Array<{
    name: string;
    income: number;
    momGrowth: number;
  }>;
}

export const IncomeChart = ({ chartData }: IncomeChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === "income" ? "Income: " : "Growth: "}
              {entry.dataKey === "income"
                ? formatCurrency(entry.value)
                : formatPercentage(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader className="pb-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold text-gray-500">
              Income Trend
            </CardTitle>
            <p className="text-sm text-gray-600">
              Your monthly income and growth for the selected period
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-80 w-full flex items-center justify-center text-gray-500">
            <p>No data available for the selected period</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-4">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold text-gray-500">
            Income Trend
          </CardTitle>
          <p className="text-sm text-gray-600">
            Your monthly income and growth for the selected period
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                className="text-gray-500 text-sm"
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                className="text-gray-500 text-sm"
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                className="text-gray-500 text-sm"
                tickFormatter={formatPercentage}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) =>
                  value === "income" ? "Income" : "Growth"
                }
              />
              <Bar
                yAxisId="left"
                dataKey="income"
                fill="#8B5CF6"
                name="income"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="momGrowth"
                stroke="#92400E"
                strokeWidth={3}
                name="momGrowth"
                dot={{ fill: "#92400E", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#92400E", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
