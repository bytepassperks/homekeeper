import { Facebook, Twitter, Linkedin, Mail, Share2, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function SocialShare({ 
  url = window.location.href, 
  title = 'HomeKeeper - Smart Home Inventory & Maintenance Tracker',
  description = 'Check out HomeKeeper - the ultimate app for managing your home inventory, warranties, and maintenance!',
  compact = false
}: SocialShareProps) {
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      handleCopyLink();
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNativeShare}
          className="text-gray-600 hover:text-blue-600"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-900">Share this:</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('email')}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
        >
          <LinkIcon className="w-4 h-4" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
