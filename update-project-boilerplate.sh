#!/bin/bash

if [ ! -d "./.git/" ] && [ ! -f "./.git" ]
then
  echo -e "This command is only to be used when the project is in the root directory of a Git repository"
else
  echo "-----
WARNING!!! This will erase any uncommited changes that you have right now.
To cancel the update press Ctrl+C. Commit and push your changes first and then run this update command again.
To continue with the update write yes and press Enter.
-----"
  read user_has_continued

  if [ "$user_has_continued" != "yes" ]; then
    echo "Update canceled"
    exit 0
  fi

  echo "Paste the URL of the git repository where the boilerplate is"
  read git_url

  echo "What is the name of the git branch where the updates are?"
  read git_branch

  echo "Updating..."

  git add .
  git reset --hard

  git remote add boilerplate $git_url

  git fetch boilerplate $git_branch

  git merge "boilerplate/${git_branch}" --no-commit

  echo "
-----
-----
-----
----- BEFORE CONTINUING

- CHECK IF THE UPDATE DIDN'T FAILED HALFWAY
  - Confirm that new commits from the project boilerplate are in the project's git history by running 'git log'
    - If no new commits from the project boilerplate are present, you can try running the update script again

- Review and pick the updates you want to add to the project

- Run 'npm run install:all', in case any dependencies were changed or added

- Check if any of the changes made by the updates require a new migration to be written

- Run 'npm run integrity-check:all' to make sure the updates didn't break any part of your project

- Run 'git add .' to stage all the accepted updates

- IF YOU WANT TO ABORT the update, run 'git merge --abort'

- To finalize the update, run 'git merge --continue'"
fi
