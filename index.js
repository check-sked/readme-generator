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
                return console.log("A valid project title is required.");
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
                return console.log("A valid project description is required.");
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
                return console.log("A valid GitHub username is required.");
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
      
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Github api call
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Inquirer questions to Github api
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // make markdown a file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();