# Basic usage
This example shows how to generate a 'client-side' executable schema which uses mock data
as provided by [graphql-tools/addMockFunctionsToSchema()](https://github.com/apollostack/graphql-tools/blob/master/src/index.js)

### API

```js
import path from 'path';
import granate from 'granate';
import { readFile, assertResponse } from '../lib';

const schema = readFile(path.join(__dirname, './todos.graphql'));
const query = `
    { 
        todos {
            title
        }
    }`;
const response = {
    data: {
        todos: [
            {
                'title': 'Hello World'
            },
            {
                'title': 'Hello World'
            }
        ]
    }
};

granate(schema, query).then(assertResponse(response));
```
