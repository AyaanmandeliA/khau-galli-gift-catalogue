import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import source from '../data/hamper-source.mjs';
import corrections from '../data/catalogue-corrections.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export function readCatalogue() {
  return readFileSync(resolve(root, 'data/products.ts'), 'utf8').split('\n')
    .filter(line => line.trim().startsWith('{"id"'))
    .map(line => JSON.parse(line.trim().replace(/,$/, '')));
}
export function verifyCatalogue(items) {
  assert.equal(source.entries.length, source.entryCount, 'Every final-sheet source entry must be represented, including both KHP 0025 boxes');
  assert.equal(items.length, source.expectedCatalogueCount, 'Catalogue count must match the reconciled final release');
  assert.equal(new Set(source.entries.map(row => row.productId)).size, source.entryCount, 'Each workbook row requires its own product');
  assert.equal(new Set(items.map(item => item.id)).size, items.length, 'Product IDs must be unique');
  for (const row of source.entries) {
    const item = items.find(item => item.id === row.productId);
    assert.ok(item, `Missing workbook entry ${row.code}: ${row.displayName}`);
    assert.equal(item.code, row.code, `Code mismatch at ${row.codeCell}`);
    const override = corrections.overrides[row.productId] ?? {};
    assert.equal(item.name, override.name ?? row.name ?? row.displayName, `Name mismatch for ${row.code}`);
    assert.equal(item.price, row.posValue, `POS price mismatch at ${row.posCell} for ${row.code}`);
    assert.equal(item.weight, override.weight ?? (row.weightGrams ? `${row.weightGrams} GM` : null), `Weight mismatch for ${row.code}`);
    assert.deepEqual(item.contents, override.contents ?? row.ingredients.map(ingredient => ingredient.unit === 'packaging'
      ? ingredient.name : `${ingredient.name} — ${ingredient.amount} ${ingredient.unit}`), `Contents mismatch for ${row.code}`);
    if (override.image) assert.equal(item.image, override.image, `Correction photo mismatch for ${row.code}`);
    // Check retained photo variants against their source price as well.
    for (const variant of items.filter(candidate => candidate.code === row.code)) {
      if (row.code !== 'KHP 0025') {
        assert.equal(variant.price, item.price, `Variant price mismatch for ${row.code}`);
        assert.equal(variant.weight, item.weight, `Variant weight mismatch for ${row.code}`);
        assert.deepEqual(variant.contents, item.contents, `Variant contents mismatch for ${row.code}`);
      }
    }
  }
  const sourceCodes = new Set(source.entries.map(row => row.code));
  for (const code of sourceCodes) assert.ok(items.some(item => item.code === code), `Missing final-sheet code ${code}`);
  for (const code of source.omittedCodes) assert.ok(!items.some(item => item.code === code), `Withdrawn code restored: ${code}`);
  const hamperIds = new Set([...source.entries.map(row => row.productId), ...source.retainedVariants.map(row => row.productId), 'kesari-diya-nut-hamper']);
  for (const item of items.filter(item => item.kind === 'hamper')) assert.ok(hamperIds.has(item.id), `Unreconciled hamper: ${item.id}`);
  for (const item of items) {
    assert.ok(Number.isFinite(item.price) && item.price > 0 && Math.abs(item.price * 100 - Math.round(item.price * 100)) < 1e-6, `Invalid amount for ${item.id}`);
    assert.ok(!Object.hasOwn(item, 'deliveryPrice'), `Unexpected delivery price field on ${item.id}`);
    assert.ok(!['dry-fruit-mix', 'mixed-mithai-box'].includes(item.id), `Unavailable product restored: ${item.id}`);
    assert.ok((item.images ?? [item.image]).includes(item.image), `Main photo missing from gallery: ${item.id}`);
    for (const image of item.images ?? [item.image]) assert.ok(existsSync(resolve(root, `public${image}`)), `Missing image: ${image}`);
  }
  assert.equal(items.find(item => item.id === 'kesari-diya-nut-hamper')?.price, 40, 'Preserve user-confirmed KHP 0049 price');
  return { sourceEntries: source.entries.length, sourceCodes: sourceCodes.size, products: items.length };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log('Catalogue verification passed:', verifyCatalogue(readCatalogue()));
}
