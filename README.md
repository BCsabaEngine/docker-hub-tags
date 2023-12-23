# Docker-Hub-TAGS

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

> Explore the [examples](https://github.com/BCsabaEngine/docker-hub-tags/tree/master/example) folder for more examples.
