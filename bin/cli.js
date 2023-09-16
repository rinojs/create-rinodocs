#!/usr/bin/env node

const { execSync } = require('child_process');
const { input } = require('@inquirer/prompts');
const fs = require('fs');

async function runCommand(command)
{
    try
    {
        execSync(`${ command }`, { stdio: 'inherit' });
    }
    catch (error)
    {
        console.error(`Error: ${ command }\n`, error);
        return false;
    }

    return true;
}

async function main()
{
    try
    {
        console.log(`


    .::::::::::::::::::::----.
    =*********************###:
    =*********************###:
    =********======+******###:
    =******##      =******###:
    =******##      =******###:
    =******##      =******###:
    =******##......=******###:
    =*********************###+==
    =***********************###*
    =********+++++++++******###*
    =******##        .******###*
    =******##        .******###*
    =******##        .******###*
    =******##        .******###*
    =******##        .******###*
    -+++++*##         ++++++###*

    Rino Docs! Your free opensource markdown documentation tool!

    Built with Rino! Fast learning, preprocessing, intuitive web framework!

    Please support us!
        `);

        const projectName = await input({ message: 'Please enter name of project (directory):' });
        const gitCloneCommand = `git clone --depth 1 https://github.com/rinojs/rinodocs.git ${ projectName }`
        const setupCommand = `cd ${ projectName } && git remote remove origin && npm install`
        console.log(`Cloning the repository with name: ${ projectName }`);

        let result = await runCommand(gitCloneCommand);

        if (!result) process.exit(1);

        console.log(`Cloning is successful`);
        console.log(`Setting up ${ projectName }`);

        const packageJsonPath = `./${ projectName }/package.json`;
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        packageJson.name = projectName;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

        result = await runCommand(setupCommand);

        if (!result) process.exit(1);

        console.log(`Setting up is successful`);
        console.log(`
        

Github: https://github.com/rinojs/rinodocs
Documentation for theme: https://rinojs.org/documents/introduction.html
Become a sponsor & support us!: https://rinojs.org/sponsor.html
Shop: https://rinojs.org/shop.html

Start your documentation project:
cd ${ projectName }

then

Build web pages from markdown in ./src/mds:
npm run build

How to test your pages:
npm run view

For theme development:
npm run dev
        `);
    }
    catch (error)
    {
        console.error(`Error: `, error);
    }
}

main();