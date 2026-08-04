'use server';

import { put } from '@vercel/blob';
import { sql } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function uploadApp(formData: FormData) {
  const token = formData.get('g-recaptcha-response') as string;
  if (!token) {
    throw new Error('reCAPTCHAの認証が必要です。');
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`,
  });
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    throw new Error('reCAPTCHAの検証に失敗しました。');
  }

  const name = formData.get('name') as string;
  const version = formData.get('version') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const readme_content = formData.get('readme_content') as string;
  const license = formData.get('license') as string;
  const is_open_source = formData.get('is_open_source') === 'on';
  const repository_url = formData.get('repository_url') as string;
  const titlebar_type = formData.get('titlebar_type') as string;

  async function uploadFile(key: string): Promise<{ url: string | null; size: number }> {
    const file = formData.get(key) as File;
    if (!file || file.size === 0) return { url: null, size: 0 };

    const filename = `${Date.now()}-${file.name}`;
    const blob = await put(filename, file, { access: 'public' });
    return { url: blob.url, size: file.size };
  }

  const exe = await uploadFile('windows_exe');
  const apk = await uploadFile('android_apk');
  const dmg = await uploadFile('macos_dmg');

  const totalSize = exe.size + apk.size + dmg.size;

  await sql`
    INSERT INTO apps (
      name, version, category, description, readme_content,
      license, is_open_source, repository_url, titlebar_type,
      file_size,
      windows_exe_url, android_apk_url, macos_dmg_url
    ) VALUES (
      ${name}, ${version}, ${category}, ${description}, ${readme_content},
      ${license}, ${is_open_source}, ${repository_url}, ${titlebar_type},
      ${totalSize},
      ${exe.url}, ${apk.url}, ${dmg.url}
    )
  `;

  redirect('/');
}
