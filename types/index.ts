export interface Item {
  id: string;
  userId: string;
  name: string;
  category: string;
  room: string;
  purchaseDate: string;
  price: number;
  currency: 'INR' | 'USD';
  retailer: string;
  warrantyMonths: number;
  warrantyExpiry: string;
  maintenanceInterval: number; // days
  lastMaintenance: string;
  nextMaintenance: string;
  serialNumber?: string;
  modelNumber?: string;
  receiptUrl?: string;
  notes?: string;
  markedForReplacement: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ItemPhoto {
  id: string;
  itemId: string;
  url: string;
  isPrimary: boolean;
  uploadedAt: string;
}

export interface MaintenanceRecord {
  id: string;
  itemId: string;
  date: string;
  cost: number;
  notes: string;
  performedBy?: string;
  createdAt: string;
}

export interface NotificationLog {
  id: string;
  userId: string;
  itemId?: string;
  type: 'maintenance' | 'warranty' | 'replacement' | 'summary';
  recipient: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  message: string;
}

export interface UserPreferences {
  userId: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  reminderDays: number;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  currency: 'INR' | 'USD';
}

export interface DashboardStats {
  totalItems: number;
  warrantiesExpiringSoon: number;
  maintenanceUpcoming: number;
  totalValue: number;
  currency: string;
}
