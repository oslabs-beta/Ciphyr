# What is this?

Monitor and log all your GraphQL queries with ease.
Beta: only working with Apollo Server.

# Installation

`npm i ciphyr --save`
`npm i @apollo/server`

Then...

```
import { ciphyrPlugin } from 'ciphyr';

const server = new ApolloServer({
    plugins: [ciphyrPlugin]
});

```
