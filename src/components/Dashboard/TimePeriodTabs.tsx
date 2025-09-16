import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarDays } from "lucide-react";

type TimePeriod = "1month" | "3months" | "1year" | "custom";

interface TimePeriodTabsProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export const TimePeriodTabs = ({
  selectedPeriod,
  onPeriodChange,
}: TimePeriodTabsProps) => {
  return (
    <div className="mb-6">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-gray-400">
            Time Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedPeriod}
            onValueChange={(value) => onPeriodChange(value as TimePeriod)}
          >
            <TabsList className="grid w-full max-w-md grid-cols-4 gap-2 bg-white">
              <TabsTrigger value="1month">1 Month</TabsTrigger>
              <TabsTrigger value="3months">3 Months</TabsTrigger>
              <TabsTrigger value="1year">1 Year</TabsTrigger>
              <TabsTrigger value="custom">
                <CalendarDays className="mr-[1px]" />
                Custom
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
