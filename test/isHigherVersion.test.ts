import { describe, expect, test } from '@jest/globals';

import { isHigherVersion, parseVersion, parseVersionWithLevel } from '../src/utils';

const tests: { from: string; to: string; result: boolean }[] = [
	{ from: '2.0.0', to: '2.0.0', result: false },
	{ from: '2.0.0', to: '1.0.0', result: false },
	{ from: '2.0.0', to: '1.2.0', result: false },
	{ from: '2.0.0', to: '1.2.3', result: false },
	{ from: '2.3.0', to: '1.2.3', result: false },
	{ from: '2.3.4', to: '1.2.3', result: false },

	{ from: '~1.0.0-a', to: '1.0.1-a', result: true },
	{ from: '~1.0.0-B', to: '1.0.1-B', result: true },
	{ from: '~1.0.0-c', to: '1.0.1-C', result: true },
	{ from: '~1.0.0-D', to: '1.0.1-d', result: true },
	{ from: '~1.0.0-a', to: '1.0.1-b', result: false },
	{ from: '~1.0.0-a', to: '1.0.1-B', result: false },
	{ from: '~1.0.0-A', to: '1.0.1-b', result: false },
	{ from: '~1.0.0-A', to: '1.0.1-B', result: false },

	{ from: '~1.0.0', to: '1.0.1', result: true },
	{ from: '~1.0.0', to: '1.2.0', result: false },
	{ from: '~1.0.0', to: '2.0.0', result: false },
	{ from: '1.2.3', to: '1.2.4', result: true },
	{ from: '1.2.3', to: '1.3.0', result: false },
	{ from: '1.2.3', to: '2.0.0', result: false },

	{ from: '^1.0.0', to: '1.0.1', result: true },
	{ from: '^1.0.0', to: '1.1.0', result: true },
	{ from: '^1.0.0', to: '2.1.0', result: false },
	{ from: '1.0', to: '1.0.1', result: true },
	{ from: '1.0', to: '1.1.0', result: true },
	{ from: '1.0', to: '2.1.0', result: false },

	{ from: '1', to: '1.0.1', result: true },
	{ from: '1', to: '1.1.0', result: true },
	{ from: '1', to: '2.0.0', result: true },

	{ from: '$1.0.0', to: '2.0.0', result: false },
	{ from: '$1.0.0', to: '2.0.1', result: false },
	{ from: '$1.0.0', to: '2.1.0', result: false },
	{ from: '$1.0.0', to: '3.0.0', result: true },
	{ from: '$1.0.0', to: '3.0.1', result: true },
	{ from: '$1.0.0', to: '3.1.0', result: true },
	{ from: '$2.0.0', to: '3.0.0', result: false },
	{ from: '$2.0.0', to: '3.0.1', result: false },
	{ from: '$2.0.0', to: '3.1.0', result: false },
	{ from: '$2.0.0', to: '4.0.0', result: true },
	{ from: '$2.0.0', to: '4.0.1', result: true },
	{ from: '$2.0.0', to: '4.1.0', result: true }
];

describe('isHigherVersion', () => {
	for (const t of tests) {
		const fromVersion = parseVersionWithLevel(t.from);
		const toVersion = parseVersion(t.to);

		if (fromVersion && toVersion)
			test(`${t.from} > ${t.to}`, () =>
				expect(isHigherVersion(fromVersion, toVersion)).toBe(t.result));
	}
});
