import { useState } from 'react';
import { Book, ChevronRight, Home, Search, Menu, FileText, Shield, Calendar, Bell, Zap, Settings, Download, Video, Code, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Breadcrumbs } from './Breadcrumbs';
import { Logo } from './Logo';

interface DocumentationPageProps {
  onBack: () => void;
  onNavigate?: (page: 'demo' | 'blog' | 'faq') => void;
}

export function DocumentationPage({ onBack, onNavigate }: DocumentationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: Home },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'inventory', label: 'Inventory Management', icon: FileText },
    { id: 'warranties', label: 'Warranty Tracking', icon: Shield },
    { id: 'maintenance', label: 'Maintenance Scheduling', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Code },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo variant="full" size="md" clickable onClick={onBack} />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate?.('demo')}
                className="hidden md:flex"
              >
                <Video className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', onClick: onBack },
            { label: 'Documentation' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Book className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Complete Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            HomeKeeper Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about managing your home inventory, warranties, and maintenance schedules.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-sm uppercase text-gray-500">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {activeSection === 'getting-started' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                      <p className="text-gray-600 mb-6">
                        Welcome to HomeKeeper! Follow this guide to get up and running in minutes.
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="account">
                        <AccordionTrigger className="text-xl">1. Create Your Account</AccordionTrigger>
                        <AccordionContent className="text-gray-600 space-y-4 pt-4">
                          <p>Getting started with HomeKeeper is easy:</p>
                          <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Click "Sign In / Register" button on the homepage</li>
                            <li>Choose "Sign Up" tab in the authentication modal</li>
                            <li>Enter your email address and create a secure password</li>
                            <li>Verify your email address (check your inbox)</li>
                            <li>You're ready to start managing your home!</li>
                          </ol>
                          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-4">
                            <p className="text-sm text-blue-800">
                              <strong>Tip:</strong> Use a strong password with at least 8 characters, including numbers and special characters.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="first-item">
                        <AccordionTrigger className="text-xl">2. Add Your First Item</AccordionTrigger>
                        <AccordionContent className="text-gray-600 space-y-4 pt-4">
                          <p>Start building your home inventory:</p>
                          <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Navigate to your Dashboard</li>
                            <li>Click the "Add Item" button</li>
                            <li>Select a category (Appliances, Electronics, Furniture, etc.)</li>
                            <li>Enter item details: name, room location, purchase date, price</li>
                            <li>Add warranty information if applicable</li>
                            <li>Set maintenance schedule (optional)</li>
                            <li>Upload receipts or photos</li>
                            <li>Click "Save Item"</li>
                          </ol>
                          <div className="bg-green-50 border-l-4 border-green-600 p-4 mt-4">
                            <p className="text-sm text-green-800">
                              <strong>Pro Tip:</strong> Start with high-value items like appliances and electronics, then add other items gradually.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="organize">
                        <AccordionTrigger className="text-xl">3. Organize by Rooms and Categories</AccordionTrigger>
                        <AccordionContent className="text-gray-600 space-y-4 pt-4">
                          <p>Keep your inventory organized:</p>
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Categories:</strong> Appliances, Electronics, Furniture, HVAC, Plumbing, Tools, Outdoor, Vehicles</li>
                            <li><strong>Rooms:</strong> Kitchen, Living Room, Bedroom, Bathroom, Garage, Outdoor, etc.</li>
                            <li>Use the filter options in the Item Catalog to view specific categories or rooms</li>
                            <li>Export your inventory to CSV for backup or insurance purposes</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="notifications">
                        <AccordionTrigger className="text-xl">4. Set Up Notifications</AccordionTrigger>
                        <AccordionContent className="text-gray-600 space-y-4 pt-4">
                          <p>Never miss important dates:</p>
                          <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Go to Settings → Notification Preferences</li>
                            <li>Enable email notifications for warranty expiration alerts</li>
                            <li>Enable SMS notifications for urgent maintenance reminders (optional)</li>
                            <li>Set reminder days (default: 7 days before expiration)</li>
                            <li>Configure webhook integration for Make.com automation (advanced)</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <CardContent className="pt-6">
                          <Video className="w-8 h-8 mb-3" />
                          <h3 className="text-lg font-semibold mb-2">Watch Video Tutorial</h3>
                          <p className="text-sm text-blue-100 mb-4">See HomeKeeper in action with our interactive demo</p>
                          <Button 
                            variant="outline" 
                            className="bg-white text-blue-600 hover:bg-gray-100"
                            onClick={() => onNavigate?.('demo')}
                          >
                            Watch Demo
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <CardContent className="pt-6">
                          <HelpCircle className="w-8 h-8 mb-3" />
                          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                          <p className="text-sm text-green-100 mb-4">Check our FAQ for common questions</p>
                          <Button 
                            variant="outline" 
                            className="bg-white text-green-600 hover:bg-gray-100"
                            onClick={() => onNavigate?.('faq')}
                          >
                            View FAQ
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeSection === 'features' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Core Features</h2>
                    <p className="text-gray-600 mb-6">
                      HomeKeeper offers a comprehensive suite of features to manage your entire home inventory and maintenance schedule.
                    </p>

                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-600 pl-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Complete Inventory Management
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Track unlimited items across 8 categories</li>
                          <li>Organize by room and location</li>
                          <li>Store purchase dates, prices, and serial numbers</li>
                          <li>Upload receipts and product photos</li>
                          <li>Export inventory to CSV for insurance claims</li>
                          <li>Calculate total home value</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-600 pl-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          Warranty Tracking
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Never lose a warranty again</li>
                          <li>Automatic expiration alerts (7-day advance notice)</li>
                          <li>Store warranty documents and receipts</li>
                          <li>Track warranty status: Active, Expiring Soon, Expired</li>
                          <li>View all warranties in one centralized location</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-purple-600 pl-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          Maintenance Scheduling
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Set custom maintenance intervals (monthly, quarterly, annually)</li>
                          <li>Calendar view of all upcoming maintenance tasks</li>
                          <li>Track maintenance history and costs</li>
                          <li>Log service records and notes</li>
                          <li>Get reminders before maintenance is due</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-yellow-600 pl-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Bell className="w-5 h-5 text-yellow-600" />
                          Smart Notifications
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Email alerts for warranty expirations</li>
                          <li>SMS notifications for urgent maintenance (premium)</li>
                          <li>Customizable reminder schedules</li>
                          <li>Webhook integration with Make.com</li>
                          <li>Notification history and tracking</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-orange-600 pl-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-orange-600" />
                          Gamification & Achievements
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Earn points for adding items and completing maintenance</li>
                          <li>Unlock badges and achievements</li>
                          <li>Level up from Novice to Home Master</li>
                          <li>Weekly challenges for bonus points</li>
                          <li>City leaderboards to compete with neighbors</li>
                          <li>Percentile ranking system</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'inventory' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Inventory Management</h2>
                    <p className="text-gray-600 mb-6">
                      Learn how to effectively manage your home inventory with HomeKeeper.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Adding Items</h3>
                        <p className="text-gray-600 mb-4">
                          When adding a new item to your inventory, make sure to include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li><strong>Category:</strong> Choose from 8 categories (Appliances, Electronics, etc.)</li>
                          <li><strong>Room:</strong> Specify where the item is located</li>
                          <li><strong>Name & Description:</strong> Clear identification of the item</li>
                          <li><strong>Purchase Information:</strong> Date, price, and store</li>
                          <li><strong>Serial Number:</strong> Important for warranty claims</li>
                          <li><strong>Warranty Details:</strong> Start date, duration, and provider</li>
                          <li><strong>Maintenance Schedule:</strong> Set regular intervals</li>
                          <li><strong>Documentation:</strong> Upload receipts, manuals, photos</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Viewing & Filtering</h3>
                        <p className="text-gray-600 mb-4">
                          Access your Item Catalog to view and filter your inventory:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Filter by category, room, or warranty status</li>
                          <li>Search by item name or description</li>
                          <li>Sort by purchase date, price, or warranty expiration</li>
                          <li>View detailed information for each item</li>
                          <li>Quick actions: Edit, Delete, View Details</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Exporting Data</h3>
                        <p className="text-gray-600 mb-4">
                          Export your inventory for insurance, tax purposes, or backup:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Click "Export to CSV" in the Item Catalog</li>
                          <li>Data includes all item details, purchase info, and valuations</li>
                          <li>Use exported data for insurance claims or home appraisals</li>
                          <li>Keep regular backups of your inventory</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'warranties' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Warranty Tracking</h2>
                    <p className="text-gray-600 mb-6">
                      Never let a warranty expire again. HomeKeeper helps you track all your warranties in one place.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Adding Warranty Information</h3>
                        <p className="text-gray-600 mb-4">When adding an item with a warranty:</p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                          <li>Check the "Has Warranty" checkbox</li>
                          <li>Enter the warranty start date (usually purchase date)</li>
                          <li>Select warranty duration (1, 2, 3, 5 years, or lifetime)</li>
                          <li>Add warranty provider name</li>
                          <li>Upload warranty certificate or receipt</li>
                          <li>Add any warranty terms or notes</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Warranty Status</h3>
                        <p className="text-gray-600 mb-4">HomeKeeper categorizes warranties into three statuses:</p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                            <p className="text-gray-600 text-sm">Warranty is currently valid and has more than 30 days remaining</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge className="bg-yellow-100 text-yellow-700">Expiring Soon</Badge>
                            <p className="text-gray-600 text-sm">Warranty expires within 30 days - you'll receive alerts</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge className="bg-red-100 text-red-700">Expired</Badge>
                            <p className="text-gray-600 text-sm">Warranty has expired - consider extended warranty or replacement</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Warranty Alerts</h3>
                        <p className="text-gray-600 mb-4">
                          HomeKeeper sends automatic alerts 7 days before a warranty expires:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Email notifications with warranty details</li>
                          <li>Dashboard alerts for expiring warranties</li>
                          <li>Suggested actions (renew, extend, or claim)</li>
                          <li>Links to manufacturer warranty pages</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'maintenance' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Maintenance Scheduling</h2>
                    <p className="text-gray-600 mb-6">
                      Keep your home in top condition with automated maintenance reminders and tracking.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Setting Maintenance Schedules</h3>
                        <p className="text-gray-600 mb-4">For each item, you can set custom maintenance intervals:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li><strong>Monthly:</strong> Air filters, smoke detectors</li>
                          <li><strong>Quarterly:</strong> HVAC servicing, gutter cleaning</li>
                          <li><strong>Semi-Annual:</strong> Water heater flush, chimney inspection</li>
                          <li><strong>Annual:</strong> Appliance servicing, roof inspection</li>
                          <li><strong>Custom:</strong> Set any interval in days</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Maintenance Calendar</h3>
                        <p className="text-gray-600 mb-4">
                          View all upcoming maintenance in calendar format:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Monthly calendar view with all scheduled tasks</li>
                          <li>Color-coded by category</li>
                          <li>Click any date to see tasks due</li>
                          <li>Mark tasks as complete</li>
                          <li>Reschedule or skip maintenance</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Logging Maintenance</h3>
                        <p className="text-gray-600 mb-4">Keep detailed records of all maintenance performed:</p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                          <li>Navigate to the item detail page</li>
                          <li>Click "Log Maintenance"</li>
                          <li>Enter maintenance date and type</li>
                          <li>Add cost (for budget tracking)</li>
                          <li>Include service provider information</li>
                          <li>Add notes or observations</li>
                          <li>Upload invoices or before/after photos</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Maintenance History</h3>
                        <p className="text-gray-600 mb-4">
                          View complete maintenance history for each item:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Chronological list of all maintenance performed</li>
                          <li>Total maintenance costs over time</li>
                          <li>Service frequency and patterns</li>
                          <li>Identify recurring issues</li>
                          <li>Export maintenance logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Notification System</h2>
                    <p className="text-gray-600 mb-6">
                      Stay informed with HomeKeeper's comprehensive notification system.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Email Notifications</h3>
                        <p className="text-gray-600 mb-4">
                          Receive important alerts via email:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Warranty expiration alerts (7 days before)</li>
                          <li>Upcoming maintenance reminders</li>
                          <li>Achievement unlocks and level ups</li>
                          <li>Weekly activity summary</li>
                          <li>System updates and new features</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">SMS Notifications (Premium)</h3>
                        <p className="text-gray-600 mb-4">
                          Get urgent alerts via text message:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Critical warranty expirations</li>
                          <li>Urgent maintenance tasks</li>
                          <li>Real-time alerts for time-sensitive items</li>
                          <li>Customizable SMS preferences</li>
                        </ul>
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-4">
                          <p className="text-sm text-blue-800">
                            <strong>Note:</strong> SMS notifications are available on Premium and Enterprise plans only.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Notification Preferences</h3>
                        <p className="text-gray-600 mb-4">
                          Customize your notification settings:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                          <li>Go to Settings → Notification Preferences</li>
                          <li>Toggle email notifications on/off</li>
                          <li>Enable SMS for urgent alerts (Premium)</li>
                          <li>Set reminder days (3, 7, 14, or 30 days before)</li>
                          <li>Choose notification types (warranties, maintenance, achievements)</li>
                          <li>Set quiet hours (no notifications during sleep)</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'integrations' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Integrations</h2>
                    <p className="text-gray-600 mb-6">
                      Connect HomeKeeper with your favorite tools and automate your workflow.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Make.com Integration</h3>
                        <p className="text-gray-600 mb-4">
                          Automate your home management with Make.com webhooks:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Send warranty alerts to Slack, Discord, or Microsoft Teams</li>
                          <li>Create calendar events in Google Calendar or Outlook</li>
                          <li>Log maintenance records to Google Sheets or Airtable</li>
                          <li>Trigger SMS via Twilio for urgent alerts</li>
                          <li>Connect to any of 1000+ Make.com integrations</li>
                        </ul>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mt-4">
                          <h4 className="font-semibold mb-3">Setting Up Make.com Webhook:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                            <li>Create a scenario in Make.com with a Webhook trigger</li>
                            <li>Copy the webhook URL</li>
                            <li>In HomeKeeper, go to Settings → Webhook Configuration</li>
                            <li>Paste your webhook URL</li>
                            <li>Select which events to send (warranty alerts, maintenance reminders)</li>
                            <li>Test the connection</li>
                            <li>Save your settings</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Export & Import</h3>
                        <p className="text-gray-600 mb-4">
                          Move your data in and out of HomeKeeper:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li><strong>CSV Export:</strong> Download all inventory data as CSV</li>
                          <li><strong>PDF Reports:</strong> Generate PDF documentation for insurance</li>
                          <li><strong>Photo Archive:</strong> Export all receipts and photos as ZIP</li>
                          <li><strong>API Access:</strong> Use our REST API (Enterprise plan)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Coming Soon</h3>
                        <p className="text-gray-600 mb-4">
                          Future integrations we're working on:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Google Calendar native integration</li>
                          <li>Apple Home and Google Home</li>
                          <li>Amazon Alexa skills</li>
                          <li>Insurance company direct claims</li>
                          <li>Receipt scanning with OCR</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-4">Settings & Configuration</h2>
                    <p className="text-gray-600 mb-6">
                      Customize HomeKeeper to work exactly how you want.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Account Settings</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Update email address</li>
                          <li>Change password</li>
                          <li>Set timezone</li>
                          <li>Choose currency (USD, EUR, GBP, INR, etc.)</li>
                          <li>Profile photo and display name</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Notification Preferences</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Email notification toggle</li>
                          <li>SMS notification toggle (Premium)</li>
                          <li>Reminder days before expiration</li>
                          <li>Notification types (warranties, maintenance, achievements)</li>
                          <li>Quiet hours configuration</li>
                          <li>Weekly summary emails</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Privacy & Data</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>Download all your data</li>
                          <li>Delete account</li>
                          <li>Manage cookie preferences</li>
                          <li>View privacy policy</li>
                          <li>Opt out of analytics</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Billing & Subscription</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                          <li>View current plan</li>
                          <li>Upgrade or downgrade</li>
                          <li>Update payment method</li>
                          <li>View billing history</li>
                          <li>Cancel subscription</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-8 bg-gradient-to-br from-blue-500 to-green-500 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="mb-6 text-blue-50">
                  Our support team is here to help you get the most out of HomeKeeper.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => onNavigate?.('faq')}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Visit FAQ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => onNavigate?.('blog')}
                  >
                    <Book className="w-4 h-4 mr-2" />
                    Read Blog
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => window.location.href = 'mailto:support@homemaker.co.site'}
                  >
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 HomeKeeper. All rights reserved.</p>
            <p className="mt-2">
              <a href="mailto:support@homemaker.co.site" className="text-blue-600 hover:underline">
                support@homemaker.co.site
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
