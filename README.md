# Traky
 
Traky is a logging time application, its main functionality is to log the time spent in an activity. It is being developed using the Ionic 4 framework in combination with Reactjs. 

## Table of Contents

- [Installation](#installation) 
- [Usage](#usage)

### How to install

This installation is focused on Linux based Operative Systems as we will be using the command line to facilitate this process.  
In order to start we need to install nodejs and npm. We use nodejs v9 and npm v6>= so we need to install and set these versions to them. Also, npm is included in the node installation.  
Nodejs can be installed downloading it from their main [site](https://nodejs.org/en/) it depends on the Operative System being used. After installing node, we need to set the node version to 9.  
There are many ways to use that version for example using npx or nvm. In this case we use nvm, you can install it from [here](https://github.com/nvm-sh/nvm).  
Then we can install and set the node version with the following command:
- `nvm install 9 && nvm use v9`

Now, we need to install the dependencies of the project:
- `npm install`

Finally, we can start the application running:
- `npm run local:start`  

#### API connection

The application needs to connect to an API. You can configure the `REACT_APP_BASE_API_URL` in an .env file or you can start the mocking server serving the `index.html` generated for the app using the `npm run server:start` command. 

