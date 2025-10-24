// Category-specific realistic images
export const CATEGORY_IMAGES: Record<string, string> = {
  'Electronics': 'https://images.unsplash.com/photo-1758186355698-bd0183fc75ed?w=800',
  'Appliances': 'https://images.unsplash.com/photo-1756471818388-af6aadafbf07?w=800',
  'Furniture': 'https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?w=800',
  'HVAC': 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800',
  'Plumbing': 'https://images.unsplash.com/photo-1581580059951-d24a4fed1da0?w=800',
  'Electrical': 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800',
  'Kitchen': 'https://images.unsplash.com/photo-1756471818388-af6aadafbf07?w=800',
  'Outdoor': 'https://images.unsplash.com/photo-1723258346309-dbc31c8b6e9f?w=800',
  'Tools': 'https://images.unsplash.com/photo-1581580059951-d24a4fed1da0?w=800',
  'Other': 'https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=800'
};

// Room-specific realistic images
export const ROOM_IMAGES: Record<string, string> = {
  'Living Room': 'https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?w=800',
  'Kitchen': 'https://images.unsplash.com/photo-1756471818388-af6aadafbf07?w=800',
  'Bedroom': 'https://images.unsplash.com/photo-1668089677938-b52086753f77?w=800',
  'Bathroom': 'https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=800',
  'Garage': 'https://images.unsplash.com/photo-1723258346309-dbc31c8b6e9f?w=800',
  'Basement': 'https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=800',
  'Attic': 'https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=800',
  'Office': 'https://images.unsplash.com/photo-1669723008642-b00fa9d10b76?w=800',
  'Outdoor': 'https://images.unsplash.com/photo-1723258346309-dbc31c8b6e9f?w=800',
  'Other': 'https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=800'
};

// Category icons mapping
export const CATEGORY_ICONS: Record<string, string> = {
  'Electronics': '📱',
  'Appliances': '🏠',
  'Furniture': '🛋️',
  'HVAC': '❄️',
  'Plumbing': '🚿',
  'Electrical': '💡',
  'Kitchen': '🍳',
  'Outdoor': '🌳',
  'Tools': '🔧',
  'Other': '📦'
};

export const getCategoryImage = (category: string): string => {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Other'];
};

export const getRoomImage = (room: string): string => {
  return ROOM_IMAGES[room] || ROOM_IMAGES['Other'];
};

export const getCategoryIcon = (category: string): string => {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS['Other'];
};