import React, {
  useContext,
  useEffect,
  PropsWithChildren,
  ReactElement,
  useState,
} from 'react';

declare global {
  interface Window {
    renderBeeSwapAds: () => void;
  }
}

export type RenderAdsProps = {
  id?: string;
  className?: string;
}

export type BeeSwapProps = {
  beeId: string;
  RenderBeeSwapAds: ({ id, className }: RenderAdsProps) => ReactElement;
};

export const BeeSwapContext = React.createContext<BeeSwapProps | null>(null);

export const BeeSwapProvider = ({ children, beeId }: PropsWithChildren<{beeId: string}>) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  function fetchAndAttachScript() {
    const script = document.createElement('script');
    script.id = 'beeSwapScript';
    script.setAttribute('data-beeswapid', beeId);
    script.src = `https://hive.getbeeswap.com/embeds/${beeId}.js`;
    script.async = true;
    script.onload = () => setHasLoaded(true);
    document.head.appendChild(script);
  }

  useEffect(() => {
    fetchAndAttachScript();
  });

  function RenderBeeSwapAds({ id, className }: RenderAdsProps) {
    useEffect(() => {
      if (hasLoaded) {
        window.renderBeeSwapAds();
      }
    }, []);

    return (
      <div id={id} className={className} />
    );
  }

  return (
    <BeeSwapContext.Provider
      value={{
        beeId,
        RenderBeeSwapAds,
      }}
    >
      {children}
    </BeeSwapContext.Provider>
  );
};

function assertNever(): never {
  throw Error('Cannot use useBeeSwap outside of BeeSwapContext');
}

export function useBeeSwap(): BeeSwapProps {
  const context = useContext(BeeSwapContext);
  if (!context) assertNever();
  return context;
}
