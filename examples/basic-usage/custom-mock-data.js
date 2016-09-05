import path from 'path';
import { granate, buildSchema } from 'granate';
import { readFile, assertResponse } from '../lib';

const schema = readFile(path.join(__dirname, './todos.graphql'));
let id = 42;
const mocks = {
    ID: () =>id++,
    Query: () => ({
        todos: () =>[
            {title: 'custom title 1'},
            {title: 'custom title 2'}
        ]
    })
};
const query = `
    { 
        todos {
            id
            title
        }
    }`;
const response1 = {
    data: {
        todos: [
            {id: 42, title: 'custom title 1'},
            {id: 43, title: 'custom title 2'}
        ]
    }
};
const response2 = {
    data: {
        todos: [
            {id: 44, title: 'custom title 1'},
            {id: 45, title: 'custom title 2'}
        ]
    }
};

granate(schema, query, undefined, undefined, undefined, mocks).then(assertResponse(response1));
// or
granate(buildSchema(schema, mocks), query).then(assertResponse(response2));
