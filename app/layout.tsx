import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '✨ LicateStore',
  description: '非商用・自作アプリのためのセルフホスト・プラットフォーム',
  verification: {
    google: 'RCuIloEpupoyk6FVp4iUJaIR4PDihMaTQ8D7CtBRC7Q';
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="RCuIloEpupoyk6FVp4iUJaIR4PDihMaTQ8D7CtBRC7Q" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
