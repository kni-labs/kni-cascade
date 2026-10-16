const fs = require('node:fs');
const assert = require('node:assert/strict');

function shouldPublish(pkg, lock, metadata) {
  assert.equal(pkg.version, lock.version, 'Package and lockfile versions must match');
  assert.equal(pkg.version, lock.packages[''].version, 'Root lockfile version must match');
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/, 'Automatic releases require a stable x.y.z version');
  if (metadata.versions?.[pkg.version]) return false;
  const latest = metadata['dist-tags']?.latest;
  if (latest) {
    assert.match(latest, /^\d+\.\d+\.\d+$/, 'Unexpected npm latest version');
    const incoming = pkg.version.split('.').map(Number);
    const existing = latest.split('.').map(Number);
    const difference = incoming.map((part, index) => part - existing[index]).find(value => value !== 0);
    assert(difference > 0, 'New releases must be newer than npm latest');
  }
  return true;
}

async function main() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`npm version lookup failed (${response.status}); refusing to publish`);
  const publish = shouldPublish(pkg, lock, await response.json());
  console.log(publish ? `Ready to publish ${pkg.name}@${pkg.version}` : `${pkg.name}@${pkg.version} is already published; skipping`);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `publish=${publish}\n`);
  }
}

module.exports = { shouldPublish };
if (require.main === module) main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
