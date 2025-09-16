export interface Invoice {
  id: string;
  title: string;
  client: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  createdDate: string;
}

export interface InvoiceFormData {
  title: string;
  client: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
}

export interface DashboardStats {
  totalEarnings: number;
  paymentAwaited: number;
  paymentOverdue: number;
}