import { useState, useMemo } from 'react';
import { Grid3x3, List, Search, Filter, Download, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Item } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCategoryImage, getCategoryIcon } from '../utils/categoryImages';
import { motion } from 'motion/react';

interface ItemCatalogProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
  onViewDetails: (item: Item) => void;
  onExport: (format: 'csv' | 'pdf') => void;
}

export function ItemCatalog({ items, onEdit, onDelete, onViewDetails, onExport }: ItemCatalogProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');
  const [warrantyFilter, setWarrantyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and rooms
  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [items]);

  const rooms = useMemo(() => {
    const rms = new Set(items.map(item => item.room));
    return ['all', ...Array.from(rms)];
  }, [items]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.modelNumber?.toLowerCase().includes(searchLower) ||
        item.serialNumber?.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      // Room filter
      const matchesRoom = roomFilter === 'all' || item.room === roomFilter;

      // Warranty filter
      let matchesWarranty = true;
      if (warrantyFilter !== 'all') {
        const today = new Date();
        const expiryDate = new Date(item.warrantyExpiry);
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (warrantyFilter === 'active' && daysUntilExpiry > 30) {
          matchesWarranty = true;
        } else if (warrantyFilter === 'expiring' && daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
          matchesWarranty = true;
        } else if (warrantyFilter === 'expired' && daysUntilExpiry <= 0) {
          matchesWarranty = true;
        } else {
          matchesWarranty = false;
        }
      }

      return matchesSearch && matchesCategory && matchesRoom && matchesWarranty;
    });
  }, [items, searchQuery, categoryFilter, roomFilter, warrantyFilter]);

  const getWarrantyStatus = (warrantyExpiry: string) => {
    const today = new Date();
    const expiryDate = new Date(warrantyExpiry);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry <= 0) {
      return { label: 'Expired', color: 'bg-red-100 text-red-800' };
    } else if (daysUntilExpiry <= 30) {
      return { label: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { label: 'Active', color: 'bg-green-100 text-green-800' };
    }
  };

  const getMaintenanceCountdown = (nextMaintenance: string) => {
    const today = new Date();
    const nextDate = new Date(nextMaintenance);
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
      return `Overdue by ${Math.abs(daysUntil)} days`;
    } else if (daysUntil === 0) {
      return 'Due today';
    } else {
      return `Due in ${daysUntil} days`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2>Item Catalog</h2>
          <p className="text-muted-foreground">{filteredItems.length} items found</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => onExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, model, or serial number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('table')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Room</label>
                <Select value={roomFilter} onValueChange={setRoomFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room} value={room}>
                        {room === 'all' ? 'All Rooms' : room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Warranty Status</label>
                <Select value={warrantyFilter} onValueChange={setWarrantyFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const warrantyStatus = getWarrantyStatus(item.warrantyExpiry);
            const maintenanceCountdown = getMaintenanceCountdown(item.nextMaintenance);

            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={item.receiptUrl || 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2">{item.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Purchased:</span>
                      <span>{new Date(item.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span>{item.currency} {item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Warranty:</span>
                      <Badge className={warrantyStatus.color}>{warrantyStatus.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Maintenance:</span>
                      <span className="text-xs">{maintenanceCountdown}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(item)} className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Room</th>
                  <th className="text-left p-4">Purchase Date</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Warranty</th>
                  <th className="text-left p-4">Maintenance</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const warrantyStatus = getWarrantyStatus(item.warrantyExpiry);
                  const maintenanceCountdown = getMaintenanceCountdown(item.nextMaintenance);

                  return (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{item.category}</Badge>
                      </td>
                      <td className="p-4">{item.room}</td>
                      <td className="p-4">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                      <td className="p-4">{item.currency} {item.price.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge className={warrantyStatus.color}>{warrantyStatus.label}</Badge>
                      </td>
                      <td className="p-4 text-sm">{maintenanceCountdown}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => onViewDetails(item)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}