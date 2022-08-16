# Host server

The purpose of the host server is to expose an API for the Nitro CLI. The host server is installed on the host instance on which the enclave needs to be deployed. Ensure that the instance is enabled to be used for [Nitro](https://aws.amazon.com/ec2/nitro/). We currently support only AWS Nitro, aiming to expand to GCP next.

**Join our discord server: Discord server: https://discord.gg/uKfGpum9nF**

Currently it supports the following endpoints:

- `/` : List the enclave ID running on the nitro instance
- `/configure` : Configure the enclave docker image
- `/image` : Build the docker image
- `/build` : Convert the docker image to an enclave image file
- `/run` : Run the enclave
- `/terminate` : Terminate the enclave

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
