/* eslint-disable no-console */
import { readFileSync /*writeFileSync*/ } from 'node:fs';

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
		{ limit: 300 }
	);
	writeFileSync('./dump.json', dht.exportToJson());
	*/
	const dht = DockerHubTags.createFromJson(readFileSync('./dump.json').toString());
	//console.log(dht.getLatest());
	//console.log(dht.getTag('20.10-bookworm-slim'));
	console.log(dht.getRecent('!19.1.0-bookworm-slim'));
};

start();
