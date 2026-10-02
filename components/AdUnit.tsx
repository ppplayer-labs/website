'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface AdUnitProps {
  slotId: string | undefined;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
}

export default function AdUnit({
  slotId,
  className = '',
  format = 'auto',
  responsive = true,
}: AdUnitProps) {
  const pathname = usePathname();
  const t = useTranslations('blog');
  const adLoadedRef = useRef(false);

  // Configuration check
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const hasCMP = process.env.NEXT_PUBLIC_ADSENSE_CMP_CONFIGURED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isDevelopment = process.env.NODE_ENV === 'development';

  const isEligible = isDevelopment || (isEnabled && hasCMP);

  useEffect(() => {
    // Reset ad loaded state when pathname changes to support client-side navigation
    adLoadedRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!isEligible || isDevelopment) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      if (!adLoadedRef.current) {
        adsbygoogle.push({});
        adLoadedRef.current = true;
      }
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, [isEligible, isDevelopment, pathname]);

  if (!isEnabled && !isDevelopment) {
    return null; // Safely disabled if not configured
  }

  const adLabel = t('advertisements');

  // Development placeholder
  if (isDevelopment) {
    return (
      <div className={`my-8 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-8 bg-gray-800/50 min-h-[250px] text-gray-400 ${className}`}>
        <span className="text-xs uppercase font-semibold tracking-wider mb-2">{adLabel} (Dev Placeholder)</span>
        <span className="text-sm">Slot: {slotId || 'Missing Slot ID'}</span>
        <span className="text-sm">Client: {clientId || 'Missing Client ID'}</span>
        {!hasCMP && <span className="text-sm text-yellow-500 mt-2">Warning: CMP not configured</span>}
      </div>
    );
  }

  if (!clientId || !slotId) {
    return null;
  }

  return (
    <div className={`my-8 min-h-[250px] flex flex-col items-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase text-gray-500 mb-2 tracking-widest text-center w-full block">
        {adLabel}
      </span>
      <ins
        className="adsbygoogle w-full flex justify-center"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
