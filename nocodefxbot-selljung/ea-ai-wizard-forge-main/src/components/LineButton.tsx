import siteConfig from '../config/config';

interface LineButtonProps {
  url?: string;
  text?: string;
}

export default function LineButton({ 
  url = siteConfig.lineUrl,
  text = "ติดต่อเราทาง LINE"
}: LineButtonProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#06C755] text-white px-4 py-2 rounded-md hover:bg-[#05a648] transition-colors"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M19.365 9.89c.50 0 .906.41.906.91s-.406.91-.906.91H17.59v1.31h1.772c.504 0 .91.41.91.91s-.406.91-.91.91H16.59c-.5 0-.906-.41-.906-.91v-5.03c0-.5.407-.91.906-.91h3.772c.504 0 .91.41.91.91s-.406.91-.91.91H17.59v1.09h1.772zm-8.3 5.03c-.5 0-.91-.41-.91-.91v-5.03c0-.5.41-.91.91-.91s.91.41.91.91v5.03c0 .5-.41.91-.91.91zm-3.87-4.13v3.22c0 .5-.407.91-.91.91s-.91-.41-.91-.91v-5.03c0-.5.407-.91.91-.91h2.777c.504 0 .91.41.91.91v.91c0 .5-.406.91-.91.91h-1.867zm-3.218-1.81H5.11v1.09h.957c.5 0 .906.41.906.91s-.406.91-.906.91H5.11v1.31h.957c.5 0 .906.41.906.91s-.406.91-.906.91H4.21c-.5 0-.91-.41-.91-.91v-5.03c0-.5.41-.91.91-.91h1.857c.5 0 .91.41.91.91s-.41.91-.91.91z"/>
      </svg>
      {text}
    </a>
  );
}
