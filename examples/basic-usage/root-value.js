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
