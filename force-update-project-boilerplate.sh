#!/bin/bash

if [ -f "./.git" ]
then
  echo -e "This project is a Git Submodule!
If you want to run a forced update on a Git Submodule, use the update-nested-project-boilerplate.sh script."
elif [ ! -d "./.git/" ]
then
  echo -e "This command is only to be used when the project is in the root directory of a Git repository"
else
  echo "Paste the URL of the git repository where the boilerplate is"
  read git_url

  echo "What is the name of the git branch where the updates are?"
  read git_branch

  echo "Updating..."

  mv ./.git ./.git-bkp

  git init
  git add .
  git commit -m "Before update"

  git remote add boilerplate $git_url

  git fetch boilerplate $git_branch

  git merge "boilerplate/${git_branch}" --allow-unrelated-histories -X theirs

  rm -rf ./.git/
  mv ./.git-bkp ./.git

  git checkout -- package-lock.json **/package-lock.json

  echo "
-----
-----
-----
----- BEFORE CONTINUING:
- CHECK IF THE UPDATE DIDN'T FAILED HALFWAY:
  - Make sure the current git repository is again pointing to your project's repository and NOT to the boilerplate repository.
    - You can do this by running 'git remote' and checking that there is no remote called 'boilerplate'
      - If the 'boilerplate' remote still exists:
        - Delete the '.git/' directory (in the project's root directory) and rename the '.git-bkp' directory back to '.git'.
- Pick the updates you want to add to the project.
- Run 'npm run install:all' to update the 'package-lock.json' files with the dependencies changes.
- IF YOU WANT TO ABORT the update, just discard the changes as you normally would with your work.
- To finalize the update, commit everything as you would do with regular work"
fi
