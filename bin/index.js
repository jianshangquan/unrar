#!/usr/bin/env node
import {unrar, list} from 'unrar-promise';
import { program } from 'commander';
import path from 'path';





async function unrarFile({ rarFile, output, password, overwrite = true } = {}){
    await unrar(rarFile, output, {
        overwrite: true,
        password,
    })
}




async function main(){
    return new Promise(async (resolve, reject) => {
        try{
            program.option('-p, -password <filepath>', 'password');
            program.option('-o, -output <filepath>', 'file output');
            program.option('-i, -input <filepath>', 'input rar file output');
            program.version('0.0.2','-v, --ver', 'output the current version');
            program.parse();
            const opts = program.opts();
            console.log(opts);

            const currentDir = process.cwd();
            const input = opts.Input || process.argv[2];
            const output = opts.Output || process.argv[3] || './';
            const password = opts.Password || process.argv[4] || '';
            if(!input) throw new Error('File not provided');


            const fileFullPath = path.join(currentDir, input);
            const outputFileFullPath = path.join(currentDir, output);
            
            await unrarFile({ rarFile: fileFullPath, output: outputFileFullPath, password });
            resolve();
        }catch(e){
            reject(e);
        }
    }).catch(e => {
        console.log('Error : ', e.message);
    });
}

main();






