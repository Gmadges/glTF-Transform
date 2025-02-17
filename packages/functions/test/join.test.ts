import test from 'ava';
import { getBounds } from '@gltf-transform/core';
import { join, quantize } from '@gltf-transform/functions';
import { createPlatformIO, roundBbox } from '@gltf-transform/test-utils';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('basic', async (t) => {
	const io = await createPlatformIO();
	const document = await io.read(path.join(__dirname, './in/ShapeCollection.glb'));
	const scene = document.getRoot().getDefaultScene();

	const bboxBefore = getBounds(scene);
	await document.transform(join());
	const bboxAfter = getBounds(scene);

	t.is(document.getRoot().listMeshes().length, 1, '1 mesh');
	t.deepEqual(bboxAfter, bboxBefore, 'same bbox');
});

test('quantization', async (t) => {
	const io = await createPlatformIO();
	const document = await io.read(path.join(__dirname, './in/ShapeCollection.glb'));
	const scene = document.getRoot().getDefaultScene();

	const bboxBefore = getBounds(scene);
	await document.transform(quantize(), join());
	const bboxAfter = roundBbox(getBounds(scene));

	t.is(document.getRoot().listMeshes().length, 1, '1 mesh');
	t.deepEqual(bboxAfter, bboxBefore, 'same bbox');
});
