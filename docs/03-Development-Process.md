# Development Process

The application is developed using a modified GitHub-flow model. Changes are pulled into **main** branch which is also production. All features are developed in feature branches or directly into main branch.

All branches must be named using the following conventions :

- `feature/issue-{issue number}` : use for application new features
- `bugfix/issue-{issue number}` : use for fixing application bugs / issues

examples :

- feature/issue-15469
- bugfix/issue-15469

Origin vs Upstream in a Forked GitHub Workflow:

| Term         | What it means                                               | Typical URL example                                | Used for                                         |
| ------------ | ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| **origin**   | Your fork of the repository (remote on your GitHub account) | `https://github.com/your-username/together.git`    | Pushing your rebased changes, creating PRs       |
| **upstream** | The original repository you forked from                     | `https://github.com/Together-100Devs/together.git` | Pulling the latest changes from the main project |

Developers should follow the following steps :

- Create a feature branch : `git checkout -b feature/issue-15469`
- Develop the specified requirements
- Commit locally:

  - stage your chages: `git add .`
  - commit your changes: `git commit -m "your commit message"`

- It is generally advised to keep your branch consistently up to date with `main`.

  - Grab the latest upstream version of main, in case main had changes: `git fetch upstream`

  - upstream = grabbing all upstream branches (upstream/main, upstream/add-dependabot, ect)

- Rebase your feature branch on top of the latest upstream/main. We're telling git to use the "main" branch from upstream as the new "base" for your feature branch `git rebase upstream/main`

- To keep the commit history clean, we require that you squash your commits into a single commit using interactive rebase:

  - This shows the list of commits since you branched off main, from oldest to newest `git log upstream/main..HEAD --reverse --oneline`
  - grab the commit SHA of the very first commit you made on this branch ex: 5c42738
  - interactive rebase just before that commit, ^ says start from the parent of that commit. This means it will start when you began your branch.

    `git rebase -i ${your-commit-SHA}^`

    ex: `git rebase -i 5c42738^`

  - Your editor will open up with a list of commits (oldest first). New to using the vim editor? Look below for a cheatsheet. If you'd rather not use vim, you can set your Git editor to Visual Studio Code with the following command: `git config --global core.editor "code --wait"`

    > pick c32423434 first commit    
    > pick af243df second commit  
    > pick 234asf45 third commit

  - Keep the first commit as pick, change the rest of your commits to squash (or s):

    > pick c32423434 first commit    
    > squash af243df second commit    
    > squash 234asf45 third commit

  - Save and close the editor, you'll be prompted to edit the final commit message (which starts off as all of the previous messages combined)
  - optional: `git log --oneline`: if you want to double check that it merged into one commit. Or go to the upper left side of VSCode and click source control to see the history.

![screenshot of the source control icon in Visual Studio Code](https://github.com/Together-100Devs/Together/raw/main/.github/assets/development-source-control-button.jpg)

- Push the rebased branch for the first time to your fork: `git push -u origin feature/issue-15469`

  - -u is just shorthand for --set-upstream
  - Special note: If you've previously rebased and pushed this branch you'll need: `git push --force-with-lease`.
  - Why? Because rebasing rewrites commit history so a regular push will be rejected.
  - If this is your first push after rebasing (even if you've rebased multiple times locally), then a regular push is fine because there's no remote branch to conflict with.

  - your souce control at this point will look like this:
    ![The graph shows a long series of straight dots, except for the top where the latest squashed commit goes to the right](https://github.com/Together-100Devs/Together/raw/main/.github/assets/development-push-force-with-lease.jpg)
  - this is normal, when you do --force-with-lease it will turn into a straight line.

  - When pushing for the 2nd+ time: Why use --force-with-lease instead of --force?

| Command                       | What it does                                                                   | Risk                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `git push --force`            | Overwrites the remote branch with your local branch **no matter what**         | Can erase other people’s commits if they pushed while you were working |
| `git push --force-with-lease` | Overwrites the remote branch **only if** it still matches what you last pulled | Prevents overwriting new commits from others                           |

- Raise a Pull request when the code meets **[Checklist](https://github.com/Together-100Devs/Together/blob/main/docs/pull_request_template.md)**
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

### Merge Versus Rebase

- If you're coming from a merge method background, this is the difference between the merge method flow versus rebase method flow
  | **Merge Method** | **Rebase Method** |
  | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **1. Update branch**<br>`git fetch upstream`<br>`git merge upstream/main` | **1. Update branch**<br>`git fetch upstream`<br>`git rebase upstream/main` |
  | | **2. Look at your commits & start interactive rebase**<br>`git log upstream/main..HEAD --reverse --oneline`<br>`git rebase -i ${your-commit-SHA}^` |
  | **2. Push to your fork**<br>_First push:_<br>`git push -u origin feature/branch-name`<br>_Updates:_<br>`git push` | **3. Push to your fork**<br>_First push:_<br>`git push -u origin feature/branch-name`<br>_Updates after rebase:_<br>`git push --force-with-lease` |
  | **3. Open a PR** against `upstream/main` <br> Merge commits are preserved in history. | **4. Open a PR** against `upstream/main`<br>Commit history is rewritten to be linear (no merge commits). |

### Navigating In Vim

1. Press i → enter insert mode (type/edit).

2. Press Esc.

3. Press shift then any of the following:

- :wq → write/save and quit

- :q! → quit without saving

- dd → delete current line

- :u → undo last change
