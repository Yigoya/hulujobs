import { useEffect } from 'react';

export const usePreloadExternalSite = (url: string) => {
  useEffect(() => {
    // Create a hidden iframe to preload the site
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.src = url;
    
    document.body.appendChild(iframe);

    // Preload DNS
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = url;
    document.head.appendChild(dnsLink);

    // Preconnect to the domain
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = url;
    document.head.appendChild(preconnectLink);

    // Cleanup
    return () => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
      if (dnsLink.parentNode) {
        document.head.removeChild(dnsLink);
      }
      if (preconnectLink.parentNode) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, [url]);
};
