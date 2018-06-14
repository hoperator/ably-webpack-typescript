[![Ably](https://s3.amazonaws.com/files.ably.io/logo-with-type.png)](https://www.ably.io)

---

# Tutorials repository

This repository contains the working code for many of the [Ably tutorials](https://www.ably.io/tutorials).

See [https://www.ably.io/tutorials](https://www.ably.io/tutorials) for a complete list of Ably tutorials. The source code for each tutorial exists as a branch in this repo, see [the complete list of tutorial branches in this repository](https://github.com/ably/tutorials/branches/all).

To find out more Ably and our realtime data delivery platform, visit [https://www.ably.io](https://www.ably.io)



# React / Webpack Modifications:

Configured webpack.config.js to build src/init-mem.tsx
Serves up on localhost:4100 (config'd in src/server.js)


Ably API keys are in src/lib/AblyAuthService.js
 - they don't have any values, but you won't need to set them in order to see the typecsript compilation issue (both working and breaking)

Typescript Compilation Error:
works in 2.8 (latest = 2.8.4)
breaks in 2.9 (latest 2.9.2)

change typescript entry in package.json devDependencies from 2.8.4 to 2.9.2 to see the error.

To run webpack and compile: yarn dev
