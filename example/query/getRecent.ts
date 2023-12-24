/* eslint-disable no-console */
import { DockerHubTags, OFFICIALIMAGES_NAMESPACE } from '../../src/index';

const start = async () => {
	const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');

	console.log(dht.getRecent('~20.0')?.name); //patch version
	console.log(dht.getRecent('^20.0')?.name); //minor version
	console.log(dht.getRecent('20.0')?.name); //major version
	console.log(dht.getRecent('!18.0')?.name); //major version with parity (18->20, 19->21)
	console.log(dht.getRecent('20.1-bookworm-slim')?.name); //tag postfix
};

start();
