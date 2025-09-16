import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/invoice";
import { DollarSign, Clock, AlertTriangle } from "lucide-react";

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Earnings
          </CardTitle>
          <div className="bg-green-100 p-2 rounded-full">
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalEarnings)}
          </div>
          <p className="text-xs text-gray-500 mt-1">From paid invoices</p>
        </CardContent>
      </Card>

      <div className="flex md:flex-col gap-2 md:gap-6">
        <Card className="w-full hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Payment Awaited
            </CardTitle>
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(stats.paymentAwaited)}
            </div>
            <p className="text-xs text-gray-500 mt-1">From pending invoices</p>
          </CardContent>
        </Card>

        <Card className="w-full hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Payment Overdue
            </CardTitle>
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.paymentOverdue)}
            </div>
            <p className="text-xs text-gray-500 mt-1">From overdue invoices</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
