import { Download, Check, Copy, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { useState } from 'react';

interface BrandAssetsPageProps {
  onBack?: () => void;
}

export function BrandAssetsPage({ onBack }: BrandAssetsPageProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const downloadSVG = (filename: string, displayName: string) => {
    const link = document.createElement('a');
    link.href = `/logos/${filename}`;
    link.download = displayName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const colors = [
    { name: 'Primary Blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)', usage: 'Main brand color, CTAs, links' },
    { name: 'Primary Green', hex: '#10B981', rgb: 'rgb(16, 185, 129)', usage: 'Success, secondary accents' },
    { name: 'Blue Light', hex: '#60A5FA', rgb: 'rgb(96, 165, 250)', usage: 'Hover states, light accents' },
    { name: 'Green Light', hex: '#34D399', rgb: 'rgb(52, 211, 153)', usage: 'Success light, highlights' },
    { name: 'Gold/Yellow', hex: '#FBBF24', rgb: 'rgb(251, 191, 36)', usage: 'Badges, achievements' },
    { name: 'Gray 900', hex: '#1F2937', rgb: 'rgb(31, 41, 55)', usage: 'Headers, dark text' },
    { name: 'Gray 700', hex: '#374151', rgb: 'rgb(55, 65, 81)', usage: 'Body text' },
    { name: 'Gray 400', hex: '#9CA3AF', rgb: 'rgb(156, 163, 175)', usage: 'Secondary text' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Assets</h1>
              <p className="text-sm text-gray-600">Download logos, view colors, and access brand guidelines</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Logo Downloads Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Logo Downloads</h2>
            <p className="text-gray-600">All logos are in SVG format (vector) - scalable to any size without quality loss</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Logo - Light */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Full Logo (Light)</span>
                  <Badge>Primary</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <img src="/logos/homekeeper-logo.svg" alt="HomeKeeper Full Logo" className="h-16" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">For light backgrounds, headers, marketing materials</p>
                  <Button 
                    onClick={() => downloadSVG('homekeeper-logo.svg', 'HomeKeeper-Logo-Light.svg')}
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download SVG
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Full Logo - Dark */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Full Logo (Dark Theme)</span>
                  <Badge variant="secondary">Dark BG</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <img src="/logos/homekeeper-logo-light.svg" alt="HomeKeeper Full Logo Light" className="h-16" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">For dark backgrounds, footers, dark mode UI</p>
                  <Button 
                    onClick={() => downloadSVG('homekeeper-logo-light.svg', 'HomeKeeper-Logo-Dark.svg')}
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download SVG
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Icon Only */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Icon Only</span>
                  <Badge variant="outline">50×50</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <img src="/logos/homekeeper-icon.svg" alt="HomeKeeper Icon" className="w-24 h-24" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">For favicon, app shortcuts, small spaces</p>
                  <Button 
                    onClick={() => downloadSVG('homekeeper-icon.svg', 'HomeKeeper-Icon.svg')}
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download SVG
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Square Icon */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Square Icon</span>
                  <Badge variant="outline">512×512</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                  <img src="/logos/homekeeper-icon-square.svg" alt="HomeKeeper Square Icon" className="w-32 h-32 rounded-2xl shadow-lg" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">For social media, app stores, large formats</p>
                  <Button 
                    onClick={() => downloadSVG('homekeeper-icon-square.svg', 'HomeKeeper-Icon-Square.svg')}
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download SVG
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Color Palette</h2>
            <p className="text-gray-600">Official HomeKeeper brand colors - click to copy hex codes</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <Card key={color.hex} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-32 cursor-pointer relative group"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex, color.hex)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    {copiedColor === color.hex ? (
                      <div className="bg-white rounded-full p-2">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-5 h-5 text-gray-700" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-gray-900 mb-1">{color.name}</h3>
                  <p className="text-sm font-mono text-gray-600 mb-1">{color.hex}</p>
                  <p className="text-xs font-mono text-gray-500 mb-2">{color.rgb}</p>
                  <p className="text-xs text-gray-600">{color.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Logo Component Examples */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Logo Component Examples</h2>
            <p className="text-gray-600">React component usage with different sizes and variants</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Full Logos */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Full Logo - Different Sizes</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Logo variant="full" size="sm" />
                    <code className="text-sm text-gray-600">size="sm"</code>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Logo variant="full" size="md" />
                    <code className="text-sm text-gray-600">size="md"</code>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Logo variant="full" size="lg" />
                    <code className="text-sm text-gray-600">size="lg"</code>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Logo variant="full" size="xl" />
                    <code className="text-sm text-gray-600">size="xl"</code>
                  </div>
                </div>
              </div>

              {/* Dark Theme */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Dark Theme</h3>
                <div className="p-6 bg-gray-900 rounded-lg">
                  <Logo variant="full" size="lg" theme="dark" />
                </div>
              </div>

              {/* Icon Only */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Icon Only - Different Sizes</h3>
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <Logo variant="icon" size="sm" />
                  <Logo variant="icon" size="md" />
                  <Logo variant="icon" size="lg" />
                  <Logo variant="icon" size="xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Usage Guidelines</h2>
            <p className="text-gray-600">Best practices for using the HomeKeeper logo</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-green-900">
                <p>✓ Use the Logo component from /components/Logo.tsx</p>
                <p>✓ Maintain aspect ratio at all times</p>
                <p>✓ Provide adequate clear space (minimum: logo height × 0.5)</p>
                <p>✓ Use appropriate theme (light/dark) for backgrounds</p>
                <p>✓ Scale proportionally</p>
                <p>✓ Keep minimum width of 120px for full logo</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <span className="text-xl">✕</span>
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-red-900">
                <p>✕ Never distort or stretch the logo</p>
                <p>✕ Don't change colors manually</p>
                <p>✕ Don't add effects (shadows, outlines, etc.)</p>
                <p>✕ Don't rotate the logo</p>
                <p>✕ Don't place on busy backgrounds</p>
                <p>✕ Don't recreate the logo - use official files</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Typography</h2>
            <p className="text-gray-600">Official font family and usage</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Primary Font Family</p>
                <p className="text-2xl font-bold">Inter, -apple-system, sans-serif</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Regular (400)</p>
                  <p className="text-xl font-normal">Aa Bb Cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Medium (500)</p>
                  <p className="text-xl font-medium">Aa Bb Cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Semibold (600)</p>
                  <p className="text-xl font-semibold">Aa Bb Cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bold (700)</p>
                  <p className="text-xl font-bold">Aa Bb Cc</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Code Examples */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Code Examples</h2>
            <p className="text-gray-600">Copy and paste these examples into your React components</p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Import Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { Logo } from './components/Logo';`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Full logo (default)</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`<Logo variant="full" size="md" theme="light" />`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Clickable logo</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`<Logo variant="full" size="md" clickable onClick={() => navigate('/')} />`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Dark theme (for footers)</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`<Logo variant="full" size="md" theme="dark" />`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Icon only</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`<Logo variant="icon" size="lg" />`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download All */}
        <section className="mt-12">
          <Card className="bg-gradient-to-br from-blue-500 to-green-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need the Complete Brand Kit?</h3>
              <p className="mb-6 text-blue-50">
                Download all logo files and access the complete brand guidelines document
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="gap-2"
                  onClick={() => window.open('/LOGO_BRAND_GUIDELINES.md', '_blank')}
                >
                  <Download className="w-5 h-5" />
                  Brand Guidelines PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
