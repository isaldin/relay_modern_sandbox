import fs from 'fs';
import path from 'path';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import fetch from 'node-fetch';

// Save JSON of full schema introspection for Babel Relay Plugin to use

// export BABEL_ENV=development && NODE_ENV=$BABEL_ENV

const run = () => {
  fetch(`https://api.graph.cool/relay/v1/cjamlrgux1wbw0113587gjirq`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: introspectionQuery,
    }),
  })
    .then(result => result.json())
    .then(result => {
      if (result.errors) {
        console.error(
          'ERROR introspecting schema: ',
          JSON.stringify(result.errors, null, 2)
        );
      } else {
        fs.writeFileSync(
          path.join(__dirname, '../schema.json'),
          JSON.stringify(result, null, 2)
        );
        // fs.writeFileSync(
        //   path.join(__dirname, '../schema.graphql'),
        //   printSchema(result)
        // );
      }
    })
    .catch(err => console.error(err));
};

run();
