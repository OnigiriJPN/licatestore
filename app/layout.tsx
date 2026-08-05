import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '✨ LicateStore',
  description: '非商用・自作アプリのためのセルフホスト・プラットフォーム',
  verification: {
    google: '';
  },
};
<meta name="google-site-verification" content="" />
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
