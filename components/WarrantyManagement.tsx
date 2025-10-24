import { Shield, FileText, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Item } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WarrantyManagementProps {
  items: Item[];
  onViewItem: (item: Item) => void;
  onGenerateInsuranceReport: () => void;
}

export function WarrantyManagement({ items, onViewItem, onGenerateInsuranceReport }: WarrantyManagementProps) {
  const getWarrantyStatus = (warrantyExpiry: string): 'active' | 'expiring' | 'expired' => {
    const today = new Date();
    const expiryDate = new Date(warrantyExpiry);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      return 'expired';
    } else if (daysUntilExpiry <= 30) {
      return 'expiring';
    } else {
      return 'active';
    }
  };

  const activeWarranties = items.filter(item => getWarrantyStatus(item.warrantyExpiry) === 'active');
  const expiringWarranties = items.filter(item => getWarrantyStatus(item.warrantyExpiry) === 'expiring');
  const expiredWarranties = items.filter(item => getWarrantyStatus(item.warrantyExpiry) === 'expired');

  const getWarrantyBadge = (status: 'active' | 'expiring' | 'expired') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expiring':
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
    }
  };

  const getDaysUntilExpiry = (warrantyExpiry: string) => {
    const today = new Date();
    const expiryDate = new Date(warrantyExpiry);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry;
  };

  const WarrantyCard = ({ item }: { item: Item }) => {
    const status = getWarrantyStatus(item.warrantyExpiry);
    const daysUntil = getDaysUntilExpiry(item.warrantyExpiry);

    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewItem(item)}>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={item.receiptUrl || 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4>{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                {getWarrantyBadge(status)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2">{item.warrantyMonths} months</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expiry:</span>
                  <span className="ml-2">{new Date(item.warrantyExpiry).toLocaleDateString()}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">
                    {status === 'expired' 
                      ? `Expired ${Math.abs(daysUntil)} days ago`
                      : `${daysUntil} days remaining`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Warranty Management</h2>
          <p className="text-muted-foreground">Track and manage all your product warranties</p>
        </div>
        <Button onClick={onGenerateInsuranceReport}>
          <FileText className="w-4 h-4 mr-2" />
          Generate Insurance Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Warranties</CardTitle>
            <Shield className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeWarranties.length}</div>
            <p className="text-xs text-muted-foreground">Currently covered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Expiring Soon</CardTitle>
            <Shield className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{expiringWarranties.length}</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Expired</CardTitle>
            <Shield className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredWarranties.length}</div>
            <p className="text-xs text-muted-foreground">No longer covered</p>
          </CardContent>
        </Card>
      </div>

      {/* Warranty Lists */}
      <Tabs defaultValue="expiring">
        <TabsList>
          <TabsTrigger value="expiring">
            Expiring Soon ({expiringWarranties.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeWarranties.length})
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired ({expiredWarranties.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expiring" className="space-y-4">
          {expiringWarranties.length > 0 ? (
            expiringWarranties.map(item => <WarrantyCard key={item.id} item={item} />)
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No warranties expiring soon
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeWarranties.length > 0 ? (
            activeWarranties.map(item => <WarrantyCard key={item.id} item={item} />)
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No active warranties
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredWarranties.length > 0 ? (
            expiredWarranties.map(item => <WarrantyCard key={item.id} item={item} />)
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No expired warranties
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
