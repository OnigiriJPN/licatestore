import { sql } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AppDetailPage({ params }: PageProps) {
  const { id } = await params;

  const rows = await sql`SELECT * FROM apps WHERE id = ${id}`;
  const app = rows[0];

  if (!app) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-slate-400 hover:text-cyan-400">← ストア一覧に戻る</Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <span className="text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-full font-semibold">
              📂 {app.category}
            </span>
            {app.is_recommended && (
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                ⭐ 運営推奨アプリ
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{app.name}</h1>
          <p className="text-xs text-slate-400 mt-2 font-mono">v{app.version} | 登録日: {new Date(app.created_at).toLocaleDateString()}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500 block mb-1">ライセンス</span>
              <span className="font-semibold text-slate-200">
                {app.license === 'none' && 'なし'}
                {app.license === 'custom' && '独自ライセンス'}
                {app.license !== 'none' && app.license !== 'custom' && app.license}
              </span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500 block mb-1">タイトルバー</span>
              <span className="font-semibold text-slate-200">
                {app.titlebar_type === 'native' ? 'ネイティブ（OS標準）' : 'カスタム'}
              </span>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500 block mb-1">ファイルサイズ</span>
              <span className="font-semibold text-slate-200">{app.file_size ? `${(Number(app.file_size) / (1024 * 1024)).toFixed(1)} MB` : '不明'}</span>
            </div>
          </div>

          {app.license === 'none' && (
            <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-4 text-xs text-amber-300 mt-6">
              ⚠️ このアプリはライセンスがありません。オープンソースですが、フォークする時は必ず相談してからフォークしてください。
            </div>
          )}

          {app.license === 'custom' && (
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-2xl p-4 text-xs text-purple-300 mt-6">
              🔒 このアプリは、独自ライセンスです。
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-800">
            <span className="text-xs text-slate-500 block mb-2">ソースコード・リポジトリ</span>
            {app.is_open_source ? (
              app.repository_url ? (
                <a href={app.repository_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold">
                  🐙 GitHubリポジトリを見る
                </a>
              ) : (
                <span className="text-xs text-slate-400">リポジトリURL未設定</span>
              )
            ) : (
              <div className="text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-900/50 px-4 py-2.5 rounded-xl inline-block">
                🛡️ このアプリはプロプライエタリです。
              </div>
            )}
          </div>
        </div>

        {app.readme_content && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mt-6">
            <h2 className="text-xl font-bold text-white mb-4">📖 README / ドキュメント</h2>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap font-mono">
              {app.readme_content}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
