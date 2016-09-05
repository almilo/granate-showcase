import fs from 'fs';
import assert from 'assert';

export function readFile(schemaFileName) {
    return fs.readFileSync(schemaFileName, 'utf-8');
}

export function assertResponse(expectedResponse) {
    return queryResult => {
        try {
            assert.deepEqual(queryResult, expectedResponse);
        } catch (e) {
            console.error('Assertion failed:', e.message);
            console.error('Expected:', JSON.stringify(e.expected, undefined, 2));
            console.error('Actual:', JSON.stringify(e.actual, undefined, 2));
            process.exit(1);
        }
    };
}
