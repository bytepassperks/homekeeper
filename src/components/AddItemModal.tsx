import { useState } from 'react';
import { X, Loader2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Item } from '../types';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<Item, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  userId: string;
}

const CATEGORIES = [
  'Electronics',
  'Appliances',
  'Furniture',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Kitchen',
  'Outdoor',
  'Tools',
  'Other'
];

const ROOMS = [
  'Living Room',
  'Kitchen',
  'Bedroom',
  'Bathroom',
  'Garage',
  'Basement',
  'Attic',
  'Office',
  'Outdoor',
  'Other'
];

export function AddItemModal({ open, onClose, onSubmit, userId }: AddItemModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [room, setRoom] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const [retailer, setRetailer] = useState('');
  const [warrantyMonths, setWarrantyMonths] = useState('');
  const [maintenanceInterval, setMaintenanceInterval] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const purchaseDateObj = new Date(purchaseDate);
      const warrantyMonthsNum = parseInt(warrantyMonths) || 0;
      const warrantyExpiryDate = new Date(purchaseDateObj);
      warrantyExpiryDate.setMonth(warrantyExpiryDate.getMonth() + warrantyMonthsNum);

      const maintenanceIntervalNum = parseInt(maintenanceInterval) || 0;
      const nextMaintenanceDate = new Date(purchaseDateObj);
      nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + maintenanceIntervalNum);

      const itemData: Omit<Item, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
        name,
        category,
        room,
        purchaseDate,
        price: parseFloat(price) || 0,
        currency,
        retailer,
        warrantyMonths: warrantyMonthsNum,
        warrantyExpiry: warrantyExpiryDate.toISOString().split('T')[0],
        maintenanceInterval: maintenanceIntervalNum,
        lastMaintenance: purchaseDate,
        nextMaintenance: nextMaintenanceDate.toISOString().split('T')[0],
        serialNumber: serialNumber || undefined,
        modelNumber: modelNumber || undefined,
        notes: notes || undefined,
        markedForReplacement: false,
      };

      await onSubmit(itemData);
      
      // Reset form
      setName('');
      setCategory('');
      setRoom('');
      setPurchaseDate('');
      setPrice('');
      setRetailer('');
      setWarrantyMonths('');
      setMaintenanceInterval('');
      setSerialNumber('');
      setModelNumber('');
      setNotes('');
      
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Add a new item to your home inventory with complete details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Samsung Refrigerator"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="room">Room *</Label>
              <Select value={room} onValueChange={setRoom} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {ROOMS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <div className="flex gap-2">
                <Select value={currency} onValueChange={(v) => setCurrency(v as 'INR' | 'USD')}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="retailer">Retailer</Label>
              <Input
                id="retailer"
                placeholder="e.g., Amazon, Best Buy"
                value={retailer}
                onChange={(e) => setRetailer(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="warrantyMonths">Warranty (months)</Label>
              <Input
                id="warrantyMonths"
                type="number"
                placeholder="12"
                value={warrantyMonths}
                onChange={(e) => setWarrantyMonths(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="maintenanceInterval">Maintenance Interval (days)</Label>
              <Input
                id="maintenanceInterval"
                type="number"
                placeholder="90"
                value={maintenanceInterval}
                onChange={(e) => setMaintenanceInterval(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                placeholder="SN123456789"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="modelNumber">Model Number</Label>
              <Input
                id="modelNumber"
                placeholder="MODEL-XYZ-2024"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about this item..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Item'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
