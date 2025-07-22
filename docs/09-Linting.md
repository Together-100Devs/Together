# Linting

Linting is the process of statically analyzing code for potential errors. Here, _statically_ means the code is not executed, so the code is analyzed as it is written. This also means linting doesn't directly catch runtime errors, but it does help prevent them! Linting tools use a set of rules when analyzing code to help identify inconsistencies in spacing, line wrapping, variable/function/class naming, imports, etc.

Now we know a bit about what linting _is_. Let's go over how it is applied when contributing to Together.

## Linting Configuration

Together uses two primary tools for linting. [ESLint](https://eslint.org/docs/latest/use/getting-started) and [Prettier](https://prettier.io), but how do these tools know whether a particular bit of code is "bad" or "inconsistent"? Each tool is configured with a set of _rules_, that are defined by a couple of configuration files:

- ESLint uses [`.eslintrc.js`](https://github.com/Together-100Devs/Together/blob/main/.eslintrc.js) and [`.eslintignore`](https://github.com/Together-100Devs/Together/blob/main/.eslintignore)
- Prettier uses [`.prettierrc`](https://github.com/Together-100Devs/Together/blob/main/.prettierrc) and [`.prettierignore`](https://github.com/Together-100Devs/Together/blob/main/.prettierignore)

We won't go into the details of all the available rules for both tools, but you can find out more in their documentation.

- [ESLint Rules Reference](https://eslint.org/docs/latest/rules/)
- [Prettier Configuration File ](https://prettier.io/docs/en/configuration)

The `.eslintignore` and `.prettierignore` files work similarly to a `.gitignore` file. They contain patterns for matching files and directories. If one of the patterns matches, then the file is not checked with that tool.

### Scripts

In Together's [`package.json`](https://github.com/Together-100Devs/Together/blob/main/package.json) you can find several scripts we'll be using to perform linting.

```json
"lint": "eslint . && npm run prettier",
"lint:fix": "eslint --fix",
"prettier": "prettier --check \"./**/*.{js,jsx,ts,tsx,css,md,json}\" --config ./.prettierrc",
"format": "prettier --write \"./**/*.{js,jsx,ts,tsx,css,md,json}\" --config ./.prettierrc",
```

Let's go over what each one does

1. `lint`: This command runs the `eslint` program on the current directory (which is the project's root directory), then if it succeeds, the `prettier` command is run. We define the `prettier` command just below.
2. `lint:fix`: This command runs `eslint` again, but this time with the `--fix` flag, which tells `eslint` to automatically try to fix any files that don't follow the rules defined in `.eslintrc` and replace the original
3. `prettier`: This command runs the `prettier` program with the `--check` flag, which only tells prettier to check for files that violate one of the rules in `.prettierrc`, so no files are changed; we get an output of warnings or errors in the console.
4. `format`: This command again runs `prettier` but this time with the `--write` flag, which tells prettier to automatically fix the file and replace the original

## How to lint?

You can run any of the previously mentioned scripts whenever you like to verify that your code matches the standards for the project; fortunately, some configurations are in place to make this process mostly automatic.

### Pre-commit

Together is configured to automatically lint any code before you make a commit by using a `pre-commit` hook. This is a feature of Git. You can learn more about Git hooks in general from the Pro Git book chapter [8.3 Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), but all you need to know is that this feature of Git allows us to create a script that will run every time you perform a particular operation with Git. Because we will be using a _pre-commit_ hook, our linting script runs as soon as we run `git commit`. If the script fails or returns an error, the commit will not occur.

Unfortunately, this feature of Git only applies locally. So, we need some way of distributing this pre-commit hook script to everyone who wants to contribute to the project. Here, we'll look at another package that conveniently facilitates the sharing of Git hooks.

### Husky

[Husky](https://typicode.github.io/husky/) is a Node package that helps developers share git hooks. With Husky, all your git hooks will be saved in the [`.husky/`](https://github.com/Together-100Devs/Together/tree/main/.husky) directory, and whenever a developer install Husky with `npm install` it will automatically configure the provided git hooks.

In our case, we have a single [`pre-commit`](https://github.com/Together-100Devs/Together/blob/main/.husky/pre-commit) script

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

The critical piece here is the last line that runs the `lint-staged` command. The [`lint-staged`](https://www.npmjs.com/package/lint-staged) command allows us to run commands only on files that are in the [_staging_ area](https://git-scm.com/about/staging-area#staging-area) which means only files which we have changed and added to the index will need to be checked by our linting tools instead of the entire project. This provides a considerable performance benefit when linting since no unnecessary files are linted.

The `lint-staged` configuration can be found back in the [`package.json`](https://github.com/Together-100Devs/Together/blob/main/package.json)

```json
"lint-staged": {
    "*.{js,jsx}": [
        "prettier --write",
        "eslint --fix"
    ]
}
```

Here, we can see `lint-staged` is configured to run `prettier --write` and `eslint --fix` similar to the `format` and `lint:fix` scripts as mentioned above.

## Troubleshooting

WIP
