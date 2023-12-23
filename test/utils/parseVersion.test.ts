import { describe, expect, test } from '@jest/globals';

import { ParsedVersion } from '../../src/types';
import { parseVersion } from '../../src/utils';

const tests: Record<string, Partial<ParsedVersion>> = {
	'1.2.3': { major: 1, minor: 2, patch: 3, postfix: undefined },
	'1.2': { major: 1, minor: 2, patch: 0, postfix: undefined },
	'1': { major: 1, minor: 0, patch: 0, postfix: undefined },
	'v1.2.3': { major: 1, minor: 2, patch: 3, postfix: undefined },
	'v1.2': { major: 1, minor: 2, patch: 0, postfix: undefined },
	v1: { major: 1, minor: 0, patch: 0, postfix: undefined },

	'10.20.30': { major: 10, minor: 20, patch: 30, postfix: undefined },
	'10.20': { major: 10, minor: 20, patch: 0, postfix: undefined },
	'10': { major: 10, minor: 0, patch: 0, postfix: undefined },
	'v10.20.30': { major: 10, minor: 20, patch: 30, postfix: undefined },
	'v10.20': { major: 10, minor: 20, patch: 0, postfix: undefined },
	v10: { major: 10, minor: 0, patch: 0, postfix: undefined },

	'1.2.3-post': { major: 1, minor: 2, patch: 3, postfix: '-post' },
	'1.2-post': { major: 1, minor: 2, patch: 0, postfix: '-post' },
	'1-post': { major: 1, minor: 0, patch: 0, postfix: '-post' },
	'v1.2.3-post': { major: 1, minor: 2, patch: 3, postfix: '-post' },
	'v1.2-post': { major: 1, minor: 2, patch: 0, postfix: '-post' },
	'v1-post': { major: 1, minor: 0, patch: 0, postfix: '-post' },

	'10.20.30-post': { major: 10, minor: 20, patch: 30, postfix: '-post' },
	'10.20-post': { major: 10, minor: 20, patch: 0, postfix: '-post' },
	'10-post': { major: 10, minor: 0, patch: 0, postfix: '-post' },
	'v10.20.30-post': { major: 10, minor: 20, patch: 30, postfix: '-post' },
	'v10.20-post': { major: 10, minor: 20, patch: 0, postfix: '-post' },
	'v10-post': { major: 10, minor: 0, patch: 0, postfix: '-post' },

	'0010.0020.0030-post': { major: 10, minor: 20, patch: 30, postfix: '-post' }
};

describe('parseVersion', () => {
	for (const [input, output] of Object.entries(tests))
		test(input, () => expect(parseVersion(input)).toMatchObject(output));
});
