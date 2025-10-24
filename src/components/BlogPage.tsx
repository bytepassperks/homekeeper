import { Calendar, Clock, ArrowRight, TrendingUp, Bookmark, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SEOHead, getArticleSchema, getBreadcrumbSchema } from './SEOHead';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const blogPosts = [
  {
    id: '10-mistakes-homeowners-make-with-warranties',
    title: '10 Costly Mistakes Homeowners Make with Warranties (And How to Avoid Them)',
    excerpt: 'Don\'t let expired warranties cost you thousands. Learn the top mistakes homeowners make and how to protect your investments with smart warranty tracking.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    category: 'Warranty Management',
    author: 'Sarah Mitchell',
    date: '2025-10-20',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'save-money-appliance-maintenance',
    title: 'How Regular Appliance Maintenance Saves You $2,000+ Per Year',
    excerpt: 'Discover the proven maintenance schedule that extends appliance life by 50% and prevents costly emergency repairs. Real data from 10,000+ homes.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=500&fit=crop',
    category: 'Maintenance Tips',
    author: 'David Chen',
    date: '2025-10-18',
    readTime: '10 min read',
    featured: true
  },
  {
    id: 'home-inventory-insurance-claims',
    title: 'The Complete Home Inventory Guide for Faster Insurance Claims',
    excerpt: 'After a disaster, 60% of homeowners can\'t prove what they owned. This comprehensive guide ensures you\'re never underpaid on insurance claims.',
    image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&h=500&fit=crop',
    category: 'Insurance',
    author: 'Jennifer Roberts',
    date: '2025-10-15',
    readTime: '12 min read',
    featured: true
  },
  {
    id: 'smart-home-maintenance-schedule',
    title: 'Your Smart Home Maintenance Schedule: Never Miss a Task Again',
    excerpt: 'From HVAC filters to roof inspections, this automated checklist keeps your home in perfect condition year-round. Includes seasonal reminders.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    category: 'Home Automation',
    author: 'Michael Park',
    date: '2025-10-12',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 'warranty-tracking-app-benefits',
    title: 'Why Digital Warranty Tracking Beats Paper: 5 Game-Changing Benefits',
    excerpt: 'Stop digging through drawers for warranty cards. Modern warranty tracking apps save time, money, and stress. Here\'s how.',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=500&fit=crop',
    category: 'Digital Organization',
    author: 'Emily Thompson',
    date: '2025-10-10',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'hvac-maintenance-cost-savings',
    title: 'HVAC Maintenance: The $500 Investment That Saves You $5,000',
    excerpt: 'Professional data shows regular HVAC maintenance prevents 95% of breakdowns. Learn the exact schedule that maximizes your system\'s lifespan.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
    category: 'Maintenance Tips',
    author: 'Robert Anderson',
    date: '2025-10-08',
    readTime: '9 min read',
    featured: false
  }
];

export function BlogPage({ onBack, onNavigate }: BlogPageProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'HomeKeeper Blog',
    description: 'Expert tips on home inventory, maintenance, warranty tracking, and smart home management',
    url: 'https://www.homemaker.co.site/blog',
    publisher: {
      '@type': 'Organization',
      name: 'HomeKeeper',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.homemaker.co.site/logo.png'
      }
    },
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.image,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'HomeKeeper'
      }
    }))
  };

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.homemaker.co.site' },
    { name: 'Blog', url: 'https://www.homemaker.co.site/blog' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      <SEOHead
        title="Expert Home Maintenance, Warranty & Inventory Tips"
        description="Discover proven strategies to save money on home maintenance, track warranties effectively, organize your home inventory, and maximize appliance lifespan. Expert guides from HomeKeeper."
        keywords="home maintenance tips, warranty tracking guide, home inventory management, appliance maintenance, HVAC tips, insurance claims, smart home automation, cost savings"
        canonicalUrl="https://www.homemaker.co.site/blog"
        ogType="website"
        structuredData={[structuredData, breadcrumbData]}
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={onBack} variant="ghost">
            ← Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            Updated Weekly
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            HomeKeeper Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, proven strategies, and insider secrets to save money, protect your investments, and master home management.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-blue-500">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <Button variant="ghost" size="sm" className="group-hover:text-blue-600">
                      Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-400">
                <div className="flex gap-4 p-6">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {post.category}
                    </Badge>
                    <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Get Weekly Home Management Tips
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ homeowners receiving our expert maintenance tips, warranty alerts, and cost-saving strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold">
              Subscribe Free
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            No spam. Unsubscribe anytime. GDPR compliant.
          </p>
        </section>

        {/* Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {['Warranty Management', 'Maintenance Tips', 'Insurance', 'Home Automation', 'Digital Organization', 'Cost Savings', 'HVAC', 'Appliances'].map(category => (
              <Button key={category} variant="outline" className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700">
                {category}
              </Button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer - simplified */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 HomeKeeper. All rights reserved. |{' '}
            <button onClick={() => onNavigate?.('privacy')} className="hover:text-white underline">Privacy</button> |{' '}
            <button onClick={() => onNavigate?.('terms')} className="hover:text-white underline">Terms</button>
          </p>
        </div>
      </footer>
    </div>
  );
}