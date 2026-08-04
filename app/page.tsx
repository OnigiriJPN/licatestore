import { sql } from '@/lib/db';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ 
    search?: string; 
    category?: string;
    recommended?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams.search || '';
  const selectedCategory = resolvedParams.category || 'all';
  const onlyRecommended = resolvedParams.recommended === 'true';

  const rows = await sql`SELECT * FROM apps ORDER BY created_at DESC`;
  let apps = rows;

  if (searchQuery) {
    apps = apps.filter((app: any) => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.description && app.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (selectedCategory !== 'all') {
    apps = apps.filter((app: any) => app.category === selectedCategory);
  }

  if (onlyRecommended) {
    apps = apps.filter((app: any) => app.is_recommended);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            ✨ LicateStore
          </h1>
          <p className="text-sm text-slate-400 mt-1">非商用・自作アプリのためのセルフホスト・プラットフォーム</p>
        </div>

        <Link 
          href="/upload" 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
        >
          ＋ アプリをアップロード
        </Link>
      </header>

      <div className="max-w-6xl mx-auto mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <form method="GET" action="/" className="flex gap-2 w-full md:w-96">
          <input 
            type="text" 
            name="search" 
            defaultValue={searchQuery}
            placeholder="アプリ名やキーワードで検索..." 
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 w-full"
          />
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            検索
          </button>
        </form>

        <div className="flex flex-wrap gap-2 text-xs">
          <a href="/" className={`px-3 py-1.5 rounded-lg font-medium transition-all ${!searchQuery && selectedCategory === 'all' && !onlyRecommended ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            すべて
          </a>
          <a href="/?recommended=true" className={`px-3 py-1.5 rounded-lg font-medium transition-all ${onlyRecommended ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300 hover:bg-slate-700'}`}>
            ⭐ 推奨アプリのみ
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        {apps.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center my-12">
            <div className="text-4xl mb-3">🔍💧</div>
            <h3 className="text-xl font-bold text-slate-200">お探しのアプリは見つかりません。</h3>
            <p className="text-sm text-slate-400 mt-2">
              キーワードを変えるか、フィルターをリセットしてもう一度お探しください
            </p>
            <div className="mt-6">
              <a 
                href="/" 
                className="bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all border border-slate-700"
              >
                すべてのアプリ一覧に戻る
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app: any) => (
              <Link key={app.id} href={`/apps/${app.id}`} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md font-semibold">
                      {app.category}
                    </span>
                    {app.is_recommended && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        ⭐ 推奨
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-3">{app.name}</h3>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">{app.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-500">
                  <span>v{app.version}</span>
                  <span className="text-cyan-400 font-medium">詳細を見る →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
