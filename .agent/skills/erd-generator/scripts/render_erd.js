import { exec } from 'node:child_process';
import path from 'node:path';


// Input mermaid path 
const inputPath = process.argv[2] || 'docs/architecture/schema.mmd';

// Output path
const outputPath = process.argv[3] || 'docs/architecture/schema.svg';

const command = `npx mmdc -i "${inputPath}" -o "${outputPath}"`;

//
exec(command, (error, stdout, stderr) =>{
    if(error){
        console.error(`Syntax Error:\n${stderr || stdout || error.message}`);
        process.exit(1);
    }
    console.log(`ERD rendered successfully to ${outputPath}`);
    process.exit(0);
});