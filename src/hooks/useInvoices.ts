import { useState, useCallback } from "react";
import { Invoice, InvoiceFormData, DashboardStats } from "@/types/invoice";
import { dummyInvoices } from "@/data/dummyData";

type TimePeriod = "1month" | "3months" | "1year" | "custom";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(dummyInvoices);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("3months");

  const addInvoice = useCallback((formData: InvoiceFormData) => {
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      ...formData,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setInvoices((prev) => [newInvoice, ...prev]);
  }, []);

  const updateInvoice = useCallback((id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updates } : invoice
      )
    );
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  }, []);

  const getFilteredInvoices = useCallback(
    (period: TimePeriod) => {
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case "1month":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "3months":
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "1year":
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        case "custom":
          startDate = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000); // 2 years back
          break;
        default:
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      }

      return invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.createdDate);
        return invoiceDate >= startDate;
      });
    },
    [invoices]
  );

  const getChartData = useCallback(
    (period: TimePeriod) => {
      const filteredInvoices = getFilteredInvoices(period);

      // Group invoices by month/week based on period
      const groupedData: { [key: string]: { income: number; count: number } } =
        {};

      filteredInvoices.forEach((invoice) => {
        if (invoice.status === "paid") {
          const date = new Date(invoice.createdDate);
          let key: string;

          if (period === "1month") {
            // Group by weeks for 1 month view
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            key = `Week ${Math.ceil(date.getDate() / 7)}`;
          } else {
            // Group by months for other periods
            key = date.toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            });
          }

          if (!groupedData[key]) {
            groupedData[key] = { income: 0, count: 0 };
          }
          groupedData[key].income += invoice.amount;
          groupedData[key].count += 1;
        }
      });

      // Convert to chart format and calculate growth
      const sortedKeys = Object.keys(groupedData).sort();
      const chartData = sortedKeys.map((key, index) => {
        const currentIncome = groupedData[key].income;
        const previousIncome =
          index > 0 ? groupedData[sortedKeys[index - 1]].income : currentIncome;
        const momGrowth =
          previousIncome > 0
            ? ((currentIncome - previousIncome) / previousIncome) * 100
            : 0;

        return {
          name: key,
          income: currentIncome,
          momGrowth: Math.round(momGrowth),
        };
      });

      return chartData;
    },
    [getFilteredInvoices]
  );

  const getStats = useCallback(
    (period: TimePeriod = selectedPeriod): DashboardStats => {
      const filteredInvoices = getFilteredInvoices(period);

      const totalEarnings = filteredInvoices
        .filter((invoice) => invoice.status === "paid")
        .reduce((sum, invoice) => sum + invoice.amount, 0);

      const paymentAwaited = filteredInvoices
        .filter((invoice) => invoice.status === "pending")
        .reduce((sum, invoice) => sum + invoice.amount, 0);

      const paymentOverdue = filteredInvoices
        .filter((invoice) => invoice.status === "overdue")
        .reduce((sum, invoice) => sum + invoice.amount, 0);

      return {
        totalEarnings,
        paymentAwaited,
        paymentOverdue,
      };
    },
    [getFilteredInvoices, selectedPeriod]
  );

  return {
    invoices,
    selectedPeriod,
    setSelectedPeriod,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getStats,
    getFilteredInvoices,
    getChartData,
  };
};
