![](https://flat.badgen.net/badge/use/TypeScript/blue)
![](https://flat.badgen.net/badge/use/npm/orange)
![](https://flat.badgen.net/badge/use/jest/green)
![](https://flat.badgen.net/badge/use/lint/purple)

# Docker-Hub-Tags

NodeJS lib, with which you can easily find the latest version of Docker Hub images.

I also publish my own applications in docker images and use [Docker HUB](https://hub.docker.com/) for this. Several times I ran into the fact that many or very many images are published, it is difficult to find if there is a more recent version. And the names of the images and tags are also quite varied, it is difficult to navigate them.

If you want to access the list of images of a Docker Repository from a NodeJS application and search it with semantic versioning, then you have found the solution: npm, TypeScript, well tested!

## Install

```bash
# install package from npmjs
npm i docker-hub-tags
```

## Usage

The very first step is to download the Docker Hub repository information. You can initialize the DockerHubTags class with this. After that, you can perform one or more actions or searches without internet traffic.

- Access the repositories belonging to the (community) user namespace (eg: adobeapiplatform/apigateway, openebs/mayastor-casperf, etc.)
- Access the Official Images (eg: Node, Nginx, Ubuntu, Python, Redis, Mysql, etc.)

```bash
# namespace in community
const dht = await DockerHubTags.init('adobeapiplatform', 'apigateway');

# official image category
const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');
```

### Filter and limit

You have the option to filter the images if you are only interested in the images of one platform. You can limit the amount of downloaded data for performance reasons. (By default it downloads 1000 tags, this requires 10 steps/page, usually enough)

```bash
const dht = await DockerHubTags.init(
    OFFICIALIMAGES_NAMESPACE,
    'node',
    # retrieve linux/arm64 images only
    {
        os: 'linux',
        architecture: 'arm64'
    },
    # fetch 300 taginfos only
    { limit: 300 }
);
```

### Cache

You can easily save the data you have already downloaded so that you can load it again later. You can create a storage service that caches the data for a day, for example.

```bash
const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');
const savedData = dht.exportToJson();

# Later...
const dhtFromFile = DockerHubTags.createFromJson(savedData);
```

### Query

The most important part is that you can extract detailed information about the members. All tag information contains the tag, its images and other tags equal to the tag (sameTags: current-bookworm = 21.5.0-bookworm)

```bash
const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');

# One tag
dht.getTag('20.10-bookworm');

# Latest tag (if exists)
dht.getLatest();

# All tags
dht.getAllTags();
```

### Query for recent version

Based on the member information, you can easily find out whether there is a newer version for the current version. You can use the rules of semantic versioning. We have added a special rule to the set. An exclamation mark (!) indicates that it will provide a parity version.

```bash
const dht = await DockerHubTags.init(OFFICIALIMAGES_NAMESPACE, 'node');

# patch version (~20.0.5 -> 20.0.11)
dht.getRecent('~20.0');

# minor version (^20.0 -> 20.11)
dht.getRecent('^20.0');

# major version (^20.0 -> 21.9)
dht.getRecent('20.0');

# majorParity version (!18.0 -> 20.10)
dht.getRecent('!18.0');

# majorParity version (!19.0 -> 21.5)
dht.getRecent('!19.0');

# postfixed version (20.1-bookworm-slim -> 21.9-bookworm-slim)
dht.getRecent('20.1-bookworm-slim');
```

This is the general structure of a result set. You can easily extract the necessary information from it.

```bash
{
  name: 'latest',
  tag_status: 'active',
  content_type: 'image',
  full_size: 400342209,
  last_updated: 2023-12-20T22:00:44.304Z,
  digest: 'sha256:73a9c498369c6....',
  images: [
	{
	  os: 'linux',
	  architecture: 'arm64',
	  variant: 'v8',
	  size: 390989031,
	  status: 'active',
	  digest: 'sha256:4fe798298b45cdc8ebfb3....'
	}
  ],
  sameTags: [
	'latest',
	'current-bookworm',
	'current',
	'bookworm',
	'21.5.0-bookworm',
	'21.5.0',
	'21.5-bookworm',
	'21.5',
	'21-bookworm',
	'21'
  ]
}
```

## More examples

> Explore the [examples](https://github.com/BCsabaEngine/docker-hub-tags/tree/master/example) folder for more examples.
