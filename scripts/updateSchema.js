import fs from 'fs';
import path from 'path';
import { introspectionQuery } from 'graphql/utilities';
import fetch from 'node-fetch';

// Save JSON of full schema introspection for Babel Relay Plugin to use

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
      }
    })
    .catch(err => console.error(JSON.stringify({err})))
};

run();
