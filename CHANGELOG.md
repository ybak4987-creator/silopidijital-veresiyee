# SilopiDijital Veresiye — Değişiklik Günlüğü

## 0.2.9

- Supabase publishable key case-sensitivity issue fixed in Vite and Vercel server-side proxies. Stale environment overrides can no longer replace the current key.
- Added a regression test for the exact project key.
- No database migration or customer data changes.


## 0.3.1

- Vercel güvenlik kontrolü artık `.env.example` dosyasının GitHub'a gönderilmemiş olmasını hata saymaz. Bu dosya yalnızca isteğe bağlı, gizli bilgi içermeyen bir örnek şablondur; dağıtım için gerekli değildir.


## 0.3.2
- Vercel Node 22 sürüm kontrolü, eksik `.nvmrc` nedeniyle dağıtımı durdurmayacak şekilde düzeltildi.
- `package.json.engines.node` zorunlu kaynak olarak doğrulanıyor; `.nvmrc` varsa tutarlılığı kontrol ediliyor.
- Önceki performans ve PWA düzenlemeleri korundu.

## 0.3.3
- Fixed Vercel API routing by adding exact static endpoints and restricting SPA rewrite to `/admin`.
