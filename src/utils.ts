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
