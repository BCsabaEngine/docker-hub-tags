/* eslint-disable no-console */
import { DockerHubTags } from '../../src/index';

const start = async () => {
	const dht = await DockerHubTags.init('adobeapiplatform', 'apigateway');
	console.log(dht.getAllTags());
};

start();
