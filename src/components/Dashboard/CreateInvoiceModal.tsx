import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceFormData } from "@/types/invoice";

interface CreateInvoiceModalProps {
  onCreateInvoice: (formData: InvoiceFormData) => void;
}

export const CreateInvoiceModal = ({
  onCreateInvoice,
}: CreateInvoiceModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InvoiceFormData>({
    title: "",
    client: "",
    amount: 0,
    dueDate: "",
    status: "draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.client ||
      !formData.amount ||
      !formData.dueDate
    ) {
      return;
    }

    onCreateInvoice(formData);
    setFormData({
      title: "",
      client: "",
      amount: 0,
      dueDate: "",
      status: "draft",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-gray-200 hover:bg-gray-100 hover:shadow-md flex flex-col gap-2 items-center justify-center rounded-3xl mx-auto py-4 px-10">
          <div
            className="flex items-center justify-center text-center h-20 w-20 rounded-full bg-gray-200 border-4 border-transparent bg-clip-padding 
  [background:linear-gradient(#e5e7eb,#e5e7eb)_padding-box,linear-gradient(to_right,#DD2A7B,#9747FF,#334CCA)_border-box]"
          >
            <span className="text-5xl pb-2 font-bold bg-gradient-to-r from-[#DD2A7B] via-[#9747FF] to-[#334CCA] bg-clip-text text-transparent">
              +
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#DD2A7B] via-[#9747FF] to-[#334CCA] bg-clip-text text-transparent">
            Create New Invoice
          </h1>
          <p className="text-sm text-gray-500">
            Start by creating and sending new invoice
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Invoice Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter invoice title"
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Client Name</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, client: e.target.value }))
              }
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value) || 0,
                }))
              }
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value as any }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
