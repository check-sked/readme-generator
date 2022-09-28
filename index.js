// packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// modules
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// inquirer questions
const questions = [
    {
        type: 'input',
        message: "What is the name of your Github project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A project title is needed.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "Give your project a description.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A project description is needed.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "How can users install your project?",
        name: 'installation'
    },

    {
        type: 'input',
        message: "How can users use your application?",
        name: 'usage'
    },

    {
        type: 'input',
        message: "How can other developers contribute to your application?",
        name: 'contributing'
    },

    {
        type: 'input',
        message: "Are there any tests for your application? Provide them here and how to use them if so.",
        name: 'tests'
    },

    {
        type: 'list',
        message: "Project license?",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    },

    {
        type: 'input',
        message: "What is your GitHub username? Exclude the @",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A GitHub username is needed.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "What is your email?",
        name: 'email'
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README  has been created!")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
    
        // Github api call
        const userInfo = await api.getUser(userResponses);
    
        // Inquirer questions to Github api
        const markdown = generateMarkdown(userResponses, userInfo);
    
        // make markdown a file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        // make error visible
        console.log(error);
    }
};

init();