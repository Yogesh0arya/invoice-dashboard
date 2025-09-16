import { useInvoices } from "@/hooks/useInvoices";
import { Header } from "./Dashboard/Header";
import { CreateInvoiceModal } from "./Dashboard/CreateInvoiceModal";
import { TimePeriodTabs } from "./Dashboard/TimePeriodTabs";
import { StatsCards } from "./Dashboard/StatsCards";
import { IncomeChart } from "./Dashboard/IncomeChart";
import { InvoicesList } from "./Dashboard/InvoicesList";
import { Footer } from "./Dashboard/Footer";

export const DashboardPage = () => {
  const {
    invoices,
    selectedPeriod,
    setSelectedPeriod,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getStats,
    getChartData,
  } = useInvoices();

  const stats = getStats(selectedPeriod);
  const chartData = getChartData(selectedPeriod);

  return (
    <div className="min-h-screen bg-[#F3E8FF]">
      <Header />

      <main className="container mx-auto px-4 py-6 md:p-12 bg-gray-50 rounded-t-[40px] max-w-5xl">
        {/* Create Invoice Section */}
        <div className="mb-8">
          <CreateInvoiceModal onCreateInvoice={addInvoice} />
        </div>
        <p className="text-center font-semibold my-6 text-sm text-[#8134AF]">
          Or Upload an existing invoice and set payment reminder
        </p>
        {/* Time Period Tabs */}
        <TimePeriodTabs
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        {/* Stats Section */}
        <StatsCards stats={stats} />

        {/* Chart Section */}
        <IncomeChart selectedPeriod={selectedPeriod} chartData={chartData} />

        {/* Invoices List Section */}
        <InvoicesList
          invoices={invoices}
          onUpdateInvoice={updateInvoice}
          onDeleteInvoice={deleteInvoice}
        />
      </main>

      <Footer />
    </div>
  );
};
