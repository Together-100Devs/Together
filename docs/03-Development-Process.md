# Development Process

The application is developed using a modified GitHub-flow model. Changes are pulled into **main** branch which is also production. All features are developed in feature branches or directly into main branch.

All branches must be named using the following conventions :

- `feature/issue-{issue number}` : use for application new features
- `bugfix/issue-{issue number}` : use for fixing application bugs / issues

examples :

- feature/issue-15469
- bugfix/issue-15469

Developers should follow the following steps :

- Updated the `main` : `git pull origin main`
  - It is generally advised to keep your branch consistently up to date with main
- create feature branch : `git checkout -b feature/issue-15469`
- Develop the specified requirements
- commit and Push the code
- Raise a Pull request when the code meets **[Checklist](<(#pr-checklist)>)**
- Ask one of the peers for the review
- Address the required review comments
- Merge will then be approved by a team member

### PR Checklist

- [ ] This PR is up to date with the main branch, and merge conflicts have been resolved
- [ ] I have executed `npm run test-frontend` and all tests have passed successfully or I have included details within my PR on the failure
- [ ] I have executed `npm run lint` and resolved any outstanding errors. Most issues can be solved by executing `npm run format`
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
