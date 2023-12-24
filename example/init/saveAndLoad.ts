/* eslint-disable no-console */
import { DockerHubTags, OFFICIALIMAGES_NAMESPACE } from '../../src/index';

const start = async () => {
	const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');
	const dataForSave = dht.exportToJson();

	// Later...
	const dhtFromFile = DockerHubTags.createFromJson(dataForSave);
	console.log(dhtFromFile.getLatest());
};

start();
