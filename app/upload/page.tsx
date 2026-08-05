'use client';

import { useState } from 'react';
// リキャプチャ機能廃止
// import ReCAPTCHA from 'react-google-recaptcha';
import { uploadApp } from './actions';
import Link from 'next/link';

export default function UploadPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-slate-400 hover:text-cyan-400">← ストア一覧に戻る</Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-cyan-400 mb-6">🚀 アプリのアップロード</h1>

          <form action={uploadApp} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">アプリ名</label>
                <input type="text" name="name" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">バージョン</label>
                <input type="text" name="version" required placeholder="1.0.0" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">カテゴリー</label>
                <input type="text" name="category" required placeholder="ユーティリティ、ゲーム等" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">タイトルバーの種類</label>
                <select name="titlebar_type" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="native">ネイティブ（OS標準）</option>
                  <option value="custom">カスタム</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">アプリの説明書き（概要）</label>
              <textarea name="description" rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">README.md / MDX 形式のドキュメント</label>
              <textarea name="readme_content" rows={5} placeholder="# はじめに..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ライセンス</label>
                <select name="license" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="none">なし（要相談フォーク）</option>
                  <option value="custom">独自ライセンス</option>
                  <option value="MIT">MIT License</option>
                  <option value="Apache-2.0">Apache 2.0</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">GitHubリポジトリURL</label>
                <input type="url" name="repository_url" placeholder="https://github.com/..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="flex gap-6 py-2 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_open_source" defaultChecked className="rounded bg-slate-950 border-slate-800 text-cyan-500" />
                <span>オープンソース (OSS)</span>
              </label>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-cyan-400 block">📦 各種バイナリファイルのアップロード</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Windows (.exe)</label>
                  <input type="file" name="windows_exe" className="text-slate-400 w-full text-xs" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Android (.apk)</label>
                  <input type="file" name="android_apk" className="text-slate-400 w-full text-xs" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">MacOS (.dmg)</label>
                  <input type="file" name="macos_dmg" className="text-slate-400 w-full text-xs" />
                </div>
              </div>
            </div>

            <div className="py-2">
              <!--<ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LdjKHYtAAAAAE-Fa2ItZ5iKxABotmknm7eXiY98"}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              /> --!>
            </div>

            <button 
              type="submit" 
              disabled={!captchaToken}
              className={`w-full font-extrabold py-3.5 rounded-xl shadow-lg transition-all text-sm ${
                captchaToken 
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {captchaToken ? 'LicateStoreに公開する 🚀' : 'ロボットでないことを証明してください'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
