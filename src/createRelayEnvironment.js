import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';


function fetchQuery(
  operation,
  variables,
) {
  return fetch('https://api.graph.cool/relay/v1/cjamlrgux1wbw0113587gjirq', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const source = new RecordSource()
const store = new Store(source)

export default new Environment({
  network,
  store,
})
