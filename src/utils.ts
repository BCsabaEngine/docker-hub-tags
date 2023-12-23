import { ParsedVersion, ParsedVersionLevel, SemverLevel } from './types';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const fetchRetry = async (url: string, retry: number, init?: RequestInit) => {
	let tryCount = retry;
	let lastError;
	while (tryCount--)
		try {
			return await fetch(url, init);
		} catch (error) {
			lastError = error;
			await sleep(Math.random() * 750 + 250);
		}
	throw lastError;
};

const convertSemverLevel = (
	indicator: string,
	defaultValue: SemverLevel = 'major'
): SemverLevel => {
	switch (indicator) {
		case '^':
			return 'minor';
		case '~':
			return 'patch';
		case '$':
			return 'evenMajor';
		default:
			return defaultValue;
	}
};

const RegEx: RegExp = /^([$^~]?)v?(\d)(\.(\d))?(\.(\d))?([\d.a-z-]+)*$/i;
export const parseVersion = (version: string): ParsedVersion | undefined => {
	const match = version.match(RegEx);
	if (!match) return;

	return {
		major: Number(match[2]),
		minor: Number(match[4] || '0'),
		patch: Number(match[6] || '0'),
		postfix: match[7]
	};
};

export const parseVersionWithLevel = (version: string): ParsedVersionLevel | undefined => {
	const versionInfo = parseVersion(version);
	if (!versionInfo) return;

	const match = version.match(RegEx);
	if (!match) return;

	return {
		...versionInfo,
		semverLevel: convertSemverLevel(match[1], match[6] ? 'patch' : match[4] ? 'minor' : 'major')
	};
};
