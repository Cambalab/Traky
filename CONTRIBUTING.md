# CONTRIBUTING - Traky

# Contributing Guide

Thank you for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Traky. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

## Table of Contents
- [Code of Conduct](/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Attribution](#attribution)

### Issue Reporting Guidelines

@TODO

### Pull Request Guidelines

+ The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**
+ Checkout a topic branch from the relevant branch, e.g. `develop`, and merge back against that branch. Please follow this convention for the new branch: `issueNumber-githubUsernaame-commitTitle`.
+ Most of the contributed work should generally target the `src` folder.
+ It's OK to have multiple small commits as you work on the PR - We may squash them before merging if necessary.
+ If adding a new feature:
    + Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
+ If fixing bug:
    + If you are resolving a special issue, please follow the branch naming convention mentioned above.
    + Provide a detailed description of the bug in the PR. Live demo preferred.

### Development Setup

Follow the [README](#readme) installation steps to setup your environment.

### Project Structure

+ **`src`**: contains the source code. The codebase is written in ES2015.
    + **`components`**: contains single file components (`*.jsx` files).
    + **`img`**: contains the images used in the app.
    + **`pages`**: contains app layouts components.
    + **`store`**: contains code related to the global state management modules. It follows [**redux**](https://redux.js.org/) practices.
        + This set of modules currently play an important role in the application interaction.
            + **`actions`**: action types and creators.
            + **`reducers`**: reducer functions.
            + **`selectors`**: selector functions.
  + **`utils`**: contains api request functions, types and utility functions.
+ **`server`**: development server used to mock data.

### Attribution

This Contributing Guidelines were adapted from the [Contributor Covenant](https://www.contributor-covenant.org).

