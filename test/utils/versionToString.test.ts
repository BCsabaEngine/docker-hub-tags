import { describe, expect, test } from '@jest/globals';

import { parsedVersionLevelToString, parsedVersionToString } from '../../src/utils';

describe('versionToString', () => {
	test('parsedVersionToString', () =>
		expect(
			parsedVersionToString({
				major: 1,
				minor: 2,
				patch: 3,
				postfix: '-post'
			})
		).toBe('1.2.3-post'));

	test('parsedVersionLevelToString - major', () =>
		expect(
			parsedVersionLevelToString({
				major: 1,
				minor: 2,
				patch: 3,
				postfix: '-post',
				semverLevel: 'major'
			})
		).toBe('1.2.3-post'));
	test('parsedVersionLevelToString - minor', () =>
		expect(
			parsedVersionLevelToString({
				major: 1,
				minor: 2,
				patch: 3,
				postfix: '-post',
				semverLevel: 'minor'
			})
		).toBe('^1.2.3-post'));
	test('parsedVersionLevelToString - patch', () =>
		expect(
			parsedVersionLevelToString({
				major: 1,
				minor: 2,
				patch: 3,
				postfix: '-post',
				semverLevel: 'patch'
			})
		).toBe('~1.2.3-post'));
	test('parsedVersionLevelToString - evenMajor', () =>
		expect(
			parsedVersionLevelToString({
				major: 1,
				minor: 2,
				patch: 3,
				postfix: '-post',
				semverLevel: 'evenMajor'
			})
		).toBe('!1.2.3-post'));
});
