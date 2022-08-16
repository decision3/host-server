# Host server

The purpose of the host server is to expose an API for the Nitro CLI. The host server is installed on the host instance on which the enclave needs to be deployed. Ensure that the instance is enabled to be used for [Nitro](https://aws.amazon.com/ec2/nitro/). We currently support only AWS Nitro, aiming to expand to GCP next.

**Join our discord server:**

[![](https://dcbadge.vercel.app/api/server/uKfGpum9nF?compact=true)](https://discord.gg/uKfGpum9nF)

Currently it supports the following endpoints:

- `/` : List the enclave ID running on the nitro instance
- `/configure` : Configure the enclave docker image
- `/image` : Build the docker image
- `/build` : Convert the docker image to an enclave image file
- `/run` : Run the enclave
- `/terminate` : Terminate the enclave

Pre-requisites:
- Launch a nitro enabled AWS instance:
  - Virtualized Nitro-based instance with at least four vCPUs, except t3, t3a, t4g, a1, c6g, c6gd, m6g, m6gd, r6g, r6gd, and u-*.
  - Nitro Enclaves is supported in the following Regions: `us-east-1, us-east-2, us-west-1, us-west-2, eu-central-1, eu-west-1, eu-west-2, eu-west-3, eu-south-1, eu-north-1, me-south-1, ap-east-1, ap-south-1, ap-northeast-1, ap-northeast-2, ap-southeast-1, ap-southeast-2, sa-east-1, ca-central-1, and af-south-1`.

Linux or Windows (2012 R2 or later) operating system
- [Install nitro CLI](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-cli-install.html) 

To execute the code:
```
npm install
node index.js
```

To create a binary you can use [pkg](https://www.npmjs.com/package/pkg)

```
pkg package.json --targets node16-linux --out-path ./bin/
./bin/d3-host > /usr/tmp/d3-host.log &
```

The CLI codebase can be found [here](https://github.com/decision3/d3-cli)
