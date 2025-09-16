import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Invoice } from "@/types/invoice";
import { Edit, Trash2, Calendar } from "lucide-react";

interface InvoicesListProps {
  invoices: Invoice[];
  onUpdateInvoice: (id: string, updates: Partial<Invoice>) => void;
  onDeleteInvoice: (id: string) => void;
}

export const InvoicesList = ({
  invoices,
  onUpdateInvoice,
  onDeleteInvoice,
}: InvoicesListProps) => {
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "w-20 bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "w-20 bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "overdue":
        return "w-20 bg-red-100 text-red-800 hover:bg-red-200";
      case "draft":
        return "w-20 bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "w-20 bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    onUpdateInvoice(invoiceId, { status: newStatus as any });
  };

  const handleEditClick = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInvoice) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const updates = {
      title: formData.get("title") as string,
      client: formData.get("client") as string,
      amount: parseFloat(formData.get("amount") as string),
      dueDate: formData.get("dueDate") as string,
      status: formData.get("status") as any,
    };

    onUpdateInvoice(editingInvoice.id, updates);
    setIsEditDialogOpen(false);
    setEditingInvoice(null);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-500">
          Your Invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full space-y-4">
            {invoices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>
                  No invoices found. Create your first invoice to get started!
                </p>
              </div>
            ) : (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 space-y-4 sm:space-y-0"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-row items-center justify-between sm:justify-start sm:gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {invoice.title}
                      </h3>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                      <p className="font-medium">{invoice.client}</p>
                      <div className="flex items-center space-x-4">
                        <span>{formatCurrency(invoice.amount)}</span>
                        <span>Due: {formatDate(invoice.dueDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Select
                      value={invoice.status}
                      onValueChange={(value) =>
                        handleStatusChange(invoice.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(invoice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteInvoice(invoice.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Invoice</DialogTitle>
            </DialogHeader>
            {editingInvoice && (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Invoice Title</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    defaultValue={editingInvoice.title}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-client">Client Name</Label>
                  <Input
                    id="edit-client"
                    name="client"
                    defaultValue={editingInvoice.client}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-amount">Amount ($)</Label>
                  <Input
                    id="edit-amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={editingInvoice.amount}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    name="dueDate"
                    type="date"
                    defaultValue={editingInvoice.dueDate}
                    required
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select name="status" defaultValue={editingInvoice.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
