# 0.3.2 — Node 22 pin kontrolü / Vercel dotfile düzeltmesi

- `package.json` sürümü 0.3.2 olarak güncellendi.
- Node.js 22.x için zorunlu ve görünür sürüm kaynağı `package.json.engines.node` olarak doğrulanıyor.
- `.nvmrc` yerel geliştirme için korunuyor; GitHub web arayüzüyle dosya yüklenirken gizli dotfile atlanırsa güvenlik kontrolü artık gereksiz yere başarısız olmuyor.
- `.nvmrc` varsa içeriğinin `22` olması yine doğrulanıyor.
- `.nvmrc` eksikliği regresyon testi eklendi.
- Önceki 0.3.0 performans düzenlemeleri ve PWA/service worker korunmuştur.
- Supabase şeması, müşteri kayıtları ve Edge Function'lar bu düzeltmede değiştirilmedi.
