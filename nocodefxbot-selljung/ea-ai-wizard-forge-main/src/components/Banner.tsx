import siteConfig from '../config/config';

interface BannerProps {
  imageUrl?: string;
  altText?: string;
}

export default function Banner({ 
  imageUrl = siteConfig.bannerImage,
  altText = siteConfig.title
}: BannerProps) {
  return (
    <div className="w-full overflow-hidden">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
