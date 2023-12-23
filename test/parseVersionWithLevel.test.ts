import { describe, expect, test } from '@jest/globals';

import { ParsedVersionLevel } from '../src/types';
import { parseVersionWithLevel } from '../src/utils';

const tests: Record<string, Partial<ParsedVersionLevel>> = {
	'1.2.3': { major: 1, minor: 2, patch: 3, postfix: undefined, semverLevel: 'patch' },
	'1.2': { major: 1, minor: 2, patch: 0, postfix: undefined, semverLevel: 'minor' },
	'1': { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'major' },
	'~1': { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'patch' },
	'^1': { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'minor' },
	$1: { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'evenMajor' },
	'v1.2.3': { major: 1, minor: 2, patch: 3, postfix: undefined, semverLevel: 'patch' },
	'v1.2': { major: 1, minor: 2, patch: 0, postfix: undefined, semverLevel: 'minor' },
	v1: { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'major' },
	'~v1': { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'patch' },
	'^v1': { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'minor' },
	$v1: { major: 1, minor: 0, patch: 0, postfix: undefined, semverLevel: 'evenMajor' }
};

describe('parseVersion', () => {
	for (const [input, output] of Object.entries(tests))
		test(input, () => expect(parseVersionWithLevel(input)).toMatchObject(output));
});
