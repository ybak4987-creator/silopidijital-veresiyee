# Silopi Dijital Veresiye 0.3.3 — Test Raporu

## Düzeltilen çalışma zamanı sorunu

- Önceki Vercel API dosyası tek bir dinamik `[function].ts` rotasıydı; uygulamadaki geniş `/(.*) -> /index.html` SPA rewrite kuralı API yollarının `index.html` yanıtına düşmesine neden olabiliyordu.
- API, üç ayrı ve tam eşleşen statik Vercel rotasına ayrıldı:
  - `GET /api/veresiye/health`
  - `POST /api/veresiye/veresiye-portal-login`
  - `POST /api/veresiye/veresiye-portal-admin`
- Paylaşılan proxy uygulaması `server/veresiye-proxy.ts` içine taşındı; API klasöründe yalnızca açık rotalar kaldı.
- SPA rewrite artık yalnızca `/admin` yolunu `index.html`'e yönlendiriyor. API URL'lerini kapsayan catch-all rewrite kaldırıldı.
- İstemci, API'den JSON yerine HTML gelirse bunu sessizce genel isteğe dönüştürmek yerine yönlendirme hatası olarak açıklıyor.
- PWA servis çalışanı cache sürümü v10'a yükseltildi. `/api/` yanıtları önbelleğe alınmıyor.

## Doğrulanan testler

- Güvenlik kaynak kontrolü: PASS.
- Node 22 pin / eksik `.nvmrc` gerileme testi: PASS.
- Edge function ve Vercel route kontrolleri: PASS.
- Vercel proxy sözleşme testi: PASS (Supabase yanıtı mock).
- Üç statik route + SPA rewrite regresyon testi: PASS.
- Yerel Vercel HTTP proxy smoke testi: PASS (Supabase yanıtı mock).
- Marka/orijinal logo/PWA kontrolü: PASS.
- Giriş ekranı, hatırlanan oturum, Vite proxy, oturum imzası, publishable key, performans ve Edge Function regresyon testleri: PASS.
- `tsc --noEmit -p tsconfig.api.json`: PASS.
- ZIP bütünlük kontrolü: PASS.

## Canlı doğrulama sınırı

Bu çalışma ortamında kullanıcının Vercel proje URL'sine erişim olmadığı için yeni dağıtımın canlı HTTP yanıtı burada doğrulanamadı. Tam `npm ci`, ESLint ve Vite production build de yerel ortamda kurulu proje bağımlılıkları bulunmadığından tamamlanmadı; Vercel dağıtımı bunları kendi build ortamında tekrar çalıştırmalıdır.

Supabase Edge Function kaynakları incelendi: boş kodla health yoklaması mevcut login fonksiyonunda beklenen `401` ve geçersiz kod mesajını döndürür. 0.3.3 bu fonksiyonları yeniden dağıtmaz; veritabanı şeması veya müşteri kayıtları üzerinde değişiklik yapmaz.
