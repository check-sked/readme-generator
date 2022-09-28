function generateMarkdown(userResponses, userInfo) {

  // form table of contents
  let draftToC = `## Table of Contents`;

  if (userResponses.installation !== '') { draftToC += `
  * [Installation](#installation)` };

  if (userResponses.usage !== '') { draftToC += `
  * [Usage](#usage)` };

  if (userResponses.contributing !== '') { draftToC += `
  * [Contributing](#contributing)` };

  if (userResponses.tests !== '') { draftToC += `
  * [Tests](#tests)` };

  // make mardown
  let draftMarkdown = 
  `# ${userResponses.title}

  
  ![GitHub license](https://img.shields.io/badge/license-${userResponses.license.trim()}-blue.svg)


  ## Description 
  
  ${userResponses.description}

  `

  // include table of contents in markdown
  draftMarkdown += draftToC;
 
  // include license
  draftMarkdown += `
  * [License](#license)`;
  

  // installation section
  if (userResponses.installation !== '') {
  
  draftMarkdown +=
  `
  
  ## Installation
  
  *Steps required to install project and how to get the development environment running:*
  
  ${userResponses.installation}`
  };
  

  // usage section
  if (userResponses.usage !== '') {
  
  draftMarkdown +=
  
  `
  
  ## Usage 
  
  *Instructions and examples for use:*
  
  ${userResponses.usage}`
  };
  
  
  // contr. section
  if (userResponses.contributing !== '') {

  draftMarkdown +=
    
  `

  ## Contributing
  
  *If you would like to contribute it, you can follow these guidelines for how to do so.*
  
  ${userResponses.contributing}`
  };
  

  // test section
  if (userResponses.tests !== '') {
  
  draftMarkdown +=
  `
  
  ## Tests
  
  *Tests for application and how to run them:*
  
  ${userResponses.tests}`
  };


  // license section
  draftMarkdown +=
  `
  
  ## License
  
  ${userResponses.license}
  `;


  // questions and contact
  let draftDev = 
  `
  ---
  
  ## Questions?
  
  Got questions? Reach me through the following channels:
 
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

  // email through Github
  if (userInfo.email !== null) {
  
  draftDev +=
  `

  Email: ${userInfo.email}

  `};

  // Add developer info
  draftMarkdown += draftDev;

  // Return function
  return draftMarkdown;
  
}

module.exports = generateMarkdown;
