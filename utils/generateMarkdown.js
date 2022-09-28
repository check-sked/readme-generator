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

  
  ![License](https://img.shields.io/badge/license-${userResponses.license.trim()}-blue.svg)


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
  
  *Instructions for installation project and setting up the development environment:*
  
  ${userResponses.installation}`
  };
  

  // usage section
  if (userResponses.usage !== '') {
  
  draftMarkdown +=
  
  `
  
  ## Usage 
  
  *How to use the application:*
  
  ${userResponses.usage}`
  };
  
  // contr. section
  if (userResponses.contributing !== '') {

  draftMarkdown +=
    
  `

  ## Contributing
  
  *Take the following steps to contribute to the project.*
  
  ${userResponses.contributing}`
  };

  // test section
  if (userResponses.tests !== '') {
  
  draftMarkdown +=
  `
  
  ## Tests
  
  *Tests for application and how they can be used:*
  
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
  
  Got questions? Reach me through the following channels or at my email above:
 
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

  // email section
  draftMarkdown +=
  `
  
  ## Email
  
  ${userResponses.email}
  `;

  // Add developer info
  draftMarkdown += draftDev;

  // Return function
  return draftMarkdown;
  
}

module.exports = generateMarkdown;
