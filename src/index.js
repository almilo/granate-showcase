import fs from 'fs';
import path from 'path';
import granate from 'granate';

const schema = readSchemaFile('schema.graphql');
const query = `
    { 
        todos {
            title
        }
    }`;

granate(schema, query).then(log);

function readSchemaFile(schemaFileName) {
    return fs.readFileSync(path.join(__dirname, schemaFileName), 'utf-8');
}

function log(result) {
    console.log(JSON.stringify(result, undefined, 2));
}
