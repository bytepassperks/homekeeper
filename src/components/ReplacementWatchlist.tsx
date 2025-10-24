import { TrendingUp, ExternalLink, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReplacementWatchlistProps {
  items: Item[];
  onViewItem: (item: Item) => void;
  onFindReplacement: (item: Item) => void;
  onRemoveFromWatchlist: (itemId: string) => void;
}

export function ReplacementWatchlist({ 
  items, 
  onViewItem, 
  onFindReplacement,
  onRemoveFromWatchlist 
}: ReplacementWatchlistProps) {
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const watchlistItems = items.filter(item => item.markedForReplacement);

  const calculateAge = (purchaseDate: string) => {
    const purchase = new Date(purchaseDate);
    const today = new Date();
    const years = (today.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return years.toFixed(1);
  };

  const handleFindReplacement = async (item: Item) => {
    setLoadingItemId(item.id);
    try {
      await onFindReplacement(item);
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Replacement Watchlist</h2>
        <p className="text-muted-foreground">
          Items marked for replacement or approaching end of life
        </p>
      </div>

      {watchlistItems.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="mb-2">No items on watchlist</h3>
            <p className="text-muted-foreground">
              Items you mark for replacement will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {watchlistItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.receiptUrl || 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{item.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{item.category}</Badge>
                          <Badge variant="outline">{item.room}</Badge>
                        </div>
                      </div>
                      <Badge variant="destructive">Replacement Needed</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Purchase Date</label>
                        <p>{new Date(item.purchaseDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Age</label>
                        <p>{calculateAge(item.purchaseDate)} years</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Original Price</label>
                        <p>{item.currency} {item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {item.modelNumber && (
                      <div className="mb-4">
                        <label className="text-sm text-muted-foreground">Model</label>
                        <p className="text-sm">{item.modelNumber}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleFindReplacement(item)}
                        disabled={loadingItemId === item.id}
                      >
                        {loadingItemId === item.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Find Replacement
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => onViewItem(item)}>
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => onRemoveFromWatchlist(item.id)}
                      >
                        Remove from Watchlist
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="mb-2">How Replacement Finder Works</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Click "Find Replacement" to search for similar items</li>
            <li>Compare prices across Amazon and Flipkart</li>
            <li>Discover improved models with better features</li>
            <li>Get notifications about price drops and deals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
