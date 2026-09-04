import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * next/image blocca per default qualsiasi host remoto: senza questa voce
     * ogni <Image src="https://images.unsplash.com/..."> va in errore a runtime
     * con "hostname is not configured under images in your next.config".
     *
     * remotePatterns e' la forma consigliata (sostituisce il vecchio
     * images.domains): permette di vincolare protocollo, host e percorso,
     * evitando che il nostro ottimizzatore venga usato come proxy per host
     * arbitrari.
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Formati serviti quando il browser li supporta, dal piu' leggero al meno.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
