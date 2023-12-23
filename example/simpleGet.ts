/* eslint-disable no-console */
import { DockerHubTags /*OFFICIALIMAGES_NAMESPACE*/ } from '../src/index';

const start = async () => {
	//const dht = await DockerHubTags.init('segmentcontroller', 'server');
	//const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node', { limit: 80 });
	const dht = DockerHubTags.createFrom('./dump.json');
	console.dir(dht.getAllTags(), { depth: undefined });
	console.log(dht.getAllTags().length);
};

start();
