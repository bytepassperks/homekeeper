import { ArrowLeft, Download, AlertCircle, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Item, MaintenanceRecord } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ItemDetailPageProps {
  item: Item;
  maintenanceHistory: MaintenanceRecord[];
  onBack: () => void;
  onLogMaintenance: () => void;
  onDownloadDocumentation: () => void;
  onMarkForReplacement: () => void;
  onFindReplacement: () => void;
}

export function ItemDetailPage({
  item,
  maintenanceHistory,
  onBack,
  onLogMaintenance,
  onDownloadDocumentation,
  onMarkForReplacement,
  onFindReplacement
}: ItemDetailPageProps) {
  const getWarrantyStatus = (warrantyExpiry: string) => {
    const today = new Date();
    const expiryDate = new Date(warrantyExpiry);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      return { label: 'Expired', color: 'bg-red-100 text-red-800', days: Math.abs(daysUntilExpiry) };
    } else if (daysUntilExpiry <= 30) {
      return { label: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800', days: daysUntilExpiry };
    } else {
      return { label: 'Active', color: 'bg-green-100 text-green-800', days: daysUntilExpiry };
    }
  };

  const warrantyStatus = getWarrantyStatus(item.warrantyExpiry);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onDownloadDocumentation}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          {!item.markedForReplacement && (
            <Button variant="outline" onClick={onMarkForReplacement}>
              <AlertCircle className="w-4 h-4 mr-2" />
              Mark for Replacement
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Item Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.category} • {item.room}
                  </p>
                </div>
                {item.markedForReplacement && (
                  <Badge variant="destructive">Marked for Replacement</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                <ImageWithFallback
                  src={item.receiptUrl || 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Purchase Date</label>
                  <p>{new Date(item.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Price</label>
                  <p>{item.currency} {item.price.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Retailer</label>
                  <p>{item.retailer || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Serial Number</label>
                  <p>{item.serialNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Model Number</label>
                  <p>{item.modelNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Maintenance Interval</label>
                  <p>{item.maintenanceInterval} days</p>
                </div>
              </div>

              {item.notes && (
                <div className="mt-4">
                  <label className="text-sm text-muted-foreground">Notes</label>
                  <p className="mt-1">{item.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Maintenance History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Maintenance History</CardTitle>
                <Button onClick={onLogMaintenance}>
                  <Wrench className="w-4 h-4 mr-2" />
                  Log Maintenance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {maintenanceHistory.length > 0 ? (
                <div className="space-y-4">
                  {maintenanceHistory.map((record) => (
                    <div key={record.id} className="border-l-2 border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">
                            {new Date(record.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                          {record.performedBy && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Performed by: {record.performedBy}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-medium">
                          {item.currency} {record.cost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No maintenance records yet. Log your first maintenance activity.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Warranty & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warranty Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={warrantyStatus.color}>{warrantyStatus.label}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Duration</label>
                  <p>{item.warrantyMonths} months</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expiry Date</label>
                  <p>{new Date(item.warrantyExpiry).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Days Remaining</label>
                  <p className={warrantyStatus.label === 'Expired' ? 'text-red-600' : ''}>
                    {warrantyStatus.label === 'Expired' 
                      ? `Expired ${warrantyStatus.days} days ago`
                      : `${warrantyStatus.days} days`
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-muted-foreground">Scheduled Date</label>
                  <p>{new Date(item.nextMaintenance).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Last Maintenance</label>
                  <p>{new Date(item.lastMaintenance).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={onFindReplacement}>
                Find Replacement Options
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Compare prices on Amazon and Flipkart
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
