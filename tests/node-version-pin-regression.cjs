const assert = require('node:assert/strict');
const { existsSync, readFileSync, unlinkSync, writeFileSync } = require('node:fs');
const { spawnSync } = require('node:child_process');
const { join } = require('node:path');

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const nvmrcPath = join(root, '.nvmrc');
const hadNvmrc = existsSync(nvmrcPath);
const originalNvmrc = hadNvmrc ? readFileSync(nvmrcPath, 'utf8') : null;

assert.equal(packageJson.engines?.node, '22.x', 'package.json must pin Node.js to 22.x');

try {
  if (hadNvmrc) unlinkSync(nvmrcPath);
  const result = spawnSync(process.execPath, ['scripts/check-security.mjs'], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(
    result.status,
    0,
    `Security checks must pass without the optional .nvmrc dotfile.\n${result.stdout}\n${result.stderr}`,
  );
} finally {
  if (hadNvmrc && originalNvmrc !== null) writeFileSync(nvmrcPath, originalNvmrc);
}

console.log('PASS: package.json pins Node 22.x and the security check tolerates a missing optional .nvmrc.');
