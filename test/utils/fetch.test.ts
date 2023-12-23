import { describe, expect, test } from '@jest/globals';

import { fetchRetry } from '../../src/utils';

describe('fetch', () => {
	test('fetchRetry', async () => {
		const data = await fetchRetry('https://google.com/', 10, { method: 'GET' });
		expect(data.status).toBe(200);
	});
});
