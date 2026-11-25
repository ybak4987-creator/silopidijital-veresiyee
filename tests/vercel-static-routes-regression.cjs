const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const routes = [
  ['health', 'api/veresiye/health.ts'],
  ['veresiye-portal-login', 'api/veresiye/veresiye-portal-login.ts'],
  ['veresiye-portal-admin', 'api/veresiye/veresiye-portal-admin.ts'],
];
for (const [name, file] of routes) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} must exist as an exact static Vercel route`);
  const source = read(file);
  assert.match(source, /from ['"]\.\.\/\.\.\/server\/veresiye-proxy['"]/, `${file} must use the shared server proxy`);
  assert.match(source, new RegExp(`handleVeresiyeRequest\\('${name}'`), `${file} must bind only its intended function`);
}
const config = JSON.parse(read('vercel.json'));
assert.deepEqual(config.rewrites, [{ source: '/admin', destination: '/index.html' }], 'SPA fallback must not rewrite /api/* requests');
assert.ok(config.functions['api/veresiye/health.ts']);
assert.ok(config.functions['api/veresiye/veresiye-portal-login.ts']);
assert.ok(config.functions['api/veresiye/veresiye-portal-admin.ts']);
console.log('PASS: exact static Vercel API routes are deployed independently and the SPA fallback cannot swallow them.');
