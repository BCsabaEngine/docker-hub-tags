/* eslint-disable no-console */
import { DockerHubTags, OFFICIALIMAGES_NAMESPACE } from '../../src/index';

const start = async () => {
	const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');
	console.log(dht.getLatest());
};

start();
