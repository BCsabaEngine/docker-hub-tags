/* eslint-disable no-console */
import { DockerHubTags, OFFICIALIMAGES_NAMESPACE } from '../src/index';

const start = async () => {
	OFFICIALIMAGES_NAMESPACE;
	//const dht = await DockerHubTags.init('segmentcontroller', 'server');
	/*
	const dht = await DockerHubTags.init(
		OFFICIALIMAGES_NAMESPACE,
		'node',
		{
			os: 'linux',
			architecture: 'arm64'
		},
		{ limit: 80 }
	);
	dht.exportTo('./dump.json');
	*/
	const dht = DockerHubTags.createFrom('./dump.json');
	console.dir(dht.getAllTags(), { depth: undefined });
	console.log(dht.getAllTags().length);
};

start();
