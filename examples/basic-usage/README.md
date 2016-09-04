# Basic usage

## Mock data
This example shows how to generate a *client-side* executable schema which uses mock data as provided by 
[graphql-tools/addMockFunctionsToSchema()](https://github.com/apollostack/graphql-tools/blob/master/src/index.js).

### API (see [running code](mock-data.js))

```js
import path from 'path';
import { granate } from 'granate';
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
            {title: 'Hello World'},
            {title: 'Hello World'}
        ]
    }
};

granate(schema, query).then(assertResponse(response));
```

### CLI (see [granate-cli](https://github.com/almilo/granate-cli) examples)

```
> granate serve todos.graphql

Granate server listening on port: '4000'.
```

## Root value, context value and mock data
This example shows how to generate a *client-side* executable schema which uses a ```rootValue``` and ```contextValue```
together with mock data as described in
[All you need to know about GraphQL.js 0.7](https://medium.com/apollo-stack/all-you-need-to-know-about-graphql-js-0-7-921e75dd7fd1).

### API (see [running code](root-value.js))

```js
import path from 'path';
import { granate } from 'granate';
import { readFile, assertResponse } from '../lib';

const schema = readFile(path.join(__dirname, './todos.graphql'));
const contextValue = {
    todos: [
        {completed: false},
        {completed: true}
    ]
};
const rootValue = {
    todos: (source, args, context) => {
        return context.todos.map((todo, index) => ({id: 1000 + index, title: todo.title, completed: todo.completed}))
    }
};
const query = `
    { 
        todos {
            id
            title
            completed
        }
    }`;
const response = {
    data: {
        todos: [
            {id: 1000, title: 'Hello World', completed: false},
            {id: 1001, title: 'Hello World', completed: true}
        ]
    }
};

granate(schema, query, rootValue, contextValue).then(assertResponse(response));
```

### CLI (see [granate-cli](https://github.com/almilo/granate-cli) examples)

```
> granate serve todos.graphql --root root-value.js --context context-value.js

Granate server listening on port: '4000'.
```
