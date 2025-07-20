import { Helmet } from 'react-helmet-async';
import siteConfig from '../config/config';

interface HeadProps {
  title?: string;
  description?: string;
}

export default function Head({ 
  title = siteConfig.title,
  description = siteConfig.description 
}: HeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
