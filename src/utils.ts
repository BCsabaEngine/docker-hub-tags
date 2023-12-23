import { ParsedVersion, ParsedVersionLevel, SemverLevel } from './types';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const fetchRetry = async (url: string, retry: number, init?: RequestInit) => {
	const RETRY_DELAY = [250, 750];
	let tryCount = retry;
	let lastError;
	while (tryCount--)
		try {
			return await fetch(url, init);
		} catch (error) {
			lastError = error;
			await sleep(Math.random() * RETRY_DELAY[1] + RETRY_DELAY[0]);
		}
	throw lastError;
};

const convertSemverLevel = (indicator: string): SemverLevel => {
	switch (indicator) {
		case '^':
			return 'minor';
		case '~':
			return 'patch';
		case '!':
			return 'evenMajor';
		default:
			return 'major';
	}
};

const RegEx: RegExp = /^([!^~]?)v?(\d+)(\.(\d+))?(\.(\d+))?([\d.a-z-]+)*$/i;
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
		semverLevel: convertSemverLevel(match[1])
	};
};

export const isHigherVersion = (
	from: ParsedVersionLevel | ParsedVersion,
	to: ParsedVersion
): boolean => {
	if ((from.postfix || '').toLowerCase() !== (to.postfix || '').toLowerCase()) return false;

	if ('semverLevel' in from)
		switch (from.semverLevel) {
			case 'patch':
				return from.major === to.major && from.minor === to.minor && from.patch < to.patch;
			case 'minor':
				return (
					from.major === to.major &&
					(from.minor < to.minor || (from.minor === to.minor && from.patch < to.patch))
				);
			case 'major':
			case 'evenMajor':
				return (
					(from.major < to.major ||
						(from.major === to.major &&
							(from.minor < to.minor || (from.minor === to.minor && from.patch < to.patch)))) &&
					(from.semverLevel === 'major' || from.major % 2 === to.major % 2)
				);
		}

	return (
		from.major < to.major ||
		(from.major === to.major &&
			(from.minor < to.minor || (from.minor === to.minor && from.patch < to.patch)))
	);
};

export const parsedVersionToString = (version: ParsedVersion) =>
	`${version.major}.${version.minor}.${version.patch}${version.postfix}`;
export const parsedVersionLevelToString = (version: ParsedVersionLevel) =>
	`${semverLevelToString(version.semverLevel)}${version.major}.${version.minor}.${version.patch}${
		version.postfix
	}`;
export const semverLevelToString = (semverLevel: SemverLevel): string => {
	switch (semverLevel) {
		case 'minor':
			return '^';
		case 'patch':
			return '~';
		case 'evenMajor':
			return '!';
		default:
			return '';
	}
};
