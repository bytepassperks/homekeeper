import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords = 'home inventory, maintenance tracker, warranty management, smart home, appliance tracking, home management app',
  canonicalUrl = 'https://www.homemaker.co.site',
  ogImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'HomeKeeper',
  publishedTime,
  modifiedTime,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
      }
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('article:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update favicon and app icons
    const updateFavicon = () => {
      // Remove existing favicons
      document.querySelectorAll('link[rel*="icon"]').forEach(el => el.remove());
      document.querySelectorAll('link[rel="apple-touch-icon"]').forEach(el => el.remove());

      // Add SVG favicon (modern browsers)
      const svgFavicon = document.createElement('link');
      svgFavicon.rel = 'icon';
      svgFavicon.type = 'image/svg+xml';
      svgFavicon.href = '/logos/homekeeper-icon.svg';
      document.head.appendChild(svgFavicon);

      // Add PNG fallback favicon
      const pngFavicon = document.createElement('link');
      pngFavicon.rel = 'icon';
      pngFavicon.type = 'image/png';
      pngFavicon.href = '/logos/homekeeper-icon-square.svg';
      document.head.appendChild(pngFavicon);

      // Add Apple Touch Icon
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = '/logos/homekeeper-icon-square.svg';
      document.head.appendChild(appleTouchIcon);
    };

    updateFavicon();

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    
    // Viewport (should already exist but ensure it's correct)
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

    // Open Graph Tags
    updateMetaTag('og:title', `${title} | HomeKeeper`, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'HomeKeeper', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', `${title} | HomeKeeper`);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@HomeKeeperApp');
    updateMetaTag('twitter:creator', '@HomeKeeperApp');

    // Article-specific tags
    if (ogType === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      updateMetaTag('article:author', author, true);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'seo-structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Additional SEO meta tags
    updateMetaTag('theme-color', '#0ea5e9');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('format-detection', 'telephone=no');

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, author, publishedTime, modifiedTime, structuredData]);

  return null; // This component doesn't render anything
}

// Utility to generate Organization structured data
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HomeKeeper',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2847',
    bestRating: '5',
    worstRating: '1'
  },
  author: {
    '@type': 'Organization',
    name: 'HomeKeeper Inc.',
    url: 'https://www.homemaker.co.site',
    logo: 'https://www.homemaker.co.site/logo.png',
    sameAs: [
      'https://twitter.com/HomeKeeperApp',
      'https://linkedin.com/company/homekeeper',
      'https://facebook.com/homekeeper'
    ]
  }
});

// Utility to generate FAQ structured data
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Utility to generate Breadcrumb structured data
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

// Utility to generate Article structured data
export const getArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'HomeKeeper',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.homemaker.co.site/logo.png'
    }
  }
});

// Utility to generate Product structured data
export const getProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: product.currency,
    availability: 'https://schema.org/InStock'
  }
});