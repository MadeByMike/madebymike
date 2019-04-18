---
title: How do I Git?
slug: how-I-git
description: Getting comfortable with Git took me a long time. Here is a quick but detailed guide based on my own experience, that hopefully anyone can follow.  
date: 2019-03-27
---
 
Git is a version control system. It's one of many but it's the one most widely used by web developers. Version control is great for individual projects but it becomes practically essential when mutiple developers are working on the same project. 

## Branches

Git allows individuals to have their own copy of the code, or multiple copies each stored on different 'branches'. A branch of code represents a new feature or any significant change. Git is clever because it only stores the changes we make each time we create a new branch. 

Unlike a real tree, these branches will eventually be merged back into the trunk. The trunk is just the main branch and it's typically called 'master'. You normally branch off master but you can (if you have a good reason) create a branch off any other branch.

[IMAGE]

You can also work on multiple branches at once. When you switch between them you 'checkout' a branch to update the files

## Commits

A branch is made up of one or more sets of changes to files that we call commits. If a branch represents a feature, a commit represents a unit of change. Each commit has an associated message. Ideally that message describes a single idea or step taken to implement a feature. 

A good series of commit messages should read like steps in a recipe or a set or instructions. For example the commit messages for adding timestamps to article pages on my [Writing](/writing/) page, might look something like this:

  1. Write tests for formatDate function
  2. Create formatDate function
  3. Add timestamps to articles
  4. Add styles to timestamp 

*Truthful Disclaimer: They do not.*


## Repositories

Git works on your local file system and initially all your changes are stored in a local 'repository'. The repository represents the entire project but it doesn't contain every change or even every branch. Two developers working independently can each have branches that the other is not aware of. 

To share branches we can push them to a remote repository, and we can also pull to get updates. By regularly syncronising with a centralised repository multiple developers can share their work and manage changes.

Git does not require a centeralised remote repository although it is the most common way of working with git and services like GitHub provide hosting for these as well as tool to help review code and manage requests to merge one branch into another via 'pull requests'.



- Set-up
  - Installing git
  - Configuring
  - Creating a repository
  - Useful Aliases
- The basics
  - Creating and navigating branches
  - Adding and removing changes
  - Synchronize files
- Advanced tips
  - Find and remove stale branches
  - Find and remove stale branches

## Getting set-up

If you're new to Git the first thing you will need to decide is whether you'd prefer to use a graphical interface (GUI) or the terminal. There's no right answer. I know plenty of skilled developers who perfer a GUI as well as plenty of weekend hackers who get by just fine learning a few terminal commands.

Myself, I use a combination of the terminal and graphical tools within VSCode. That's what the majority of this guide will tutorial focus on. However even if you choose to use a dedicated GUI, understanding the concepts behind different commands is essential. A GUI might provide a better user experience for some people, but no GUI is a shortcut to understanding these concepts. 

### Installing git

To install git in the terminal:

#### Mac
```
brew install git
```

#### Ubuntu
```
sudo apt-get install git
```

**Windows Users**: In my experience the windows verion of git is significantly slower. I **strongly recommend** setting up WSL and Ubuntu for Git. To get started with WSL, you just need to install Ubuntu from the Windows store. If you absolutely must, you can get Git for Windows here: [Slow Git](https://git-scm.com/download/win)

#### Still want a GUI?

If you use VSCode there are a number of built in tools for Git that centre aroundthe source control pane. These tools allow you to diff files, stage changes, manage merge conflicts and even push, pull or execute more advanced git commands without leaving VSCode. I find it practically essential when dealing with merge conflicts. If you are after a GUI, this might be a great place to start.

<figure>
<img alt="Source control pane" src="/images/source-control-vs-code.jpg" style="max-width:100%;">
<figcaption>
My IDE is purple, this is important
</figcaption>
</figure>

Friends use [Git Tower](https://www.git-tower.com), [Sourcetree](https://www.sourcetreeapp.com/) and if you're after something simple, [GitHub Desktop](https://desktop.github.com/).

#### Plugins

On top of the built-in tools the only plugin I recommend is [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens). It adds a lot of features but the one I enjoy most is, it un-obtrusively adds a information to the text editor to show who last changed each line, when, and what the commit message was. 

## Configuring Git

## Aliases

On any new machine the first thing I do is set up aliases for the commands I'll be using ever day, `status`, `checkout`, `branch` and `commit`. I could not work without this.
```
git config --global alias.s status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```
You can setup your own aliases but I recommend these. I use `git s` religiously. For some reason, I don't use an alias for `push`, and find I don't always use `git ci` either. I think I find it satisfying to pound the letters P-U-S-H as I demonstrate my victory to the code.  

## Starting a new project

I'm usually working from an existing repository. So I'll go to either github, bitbucket, so somewhere else and copy a URL. 

<img alt="GitHub clone URL form" src="/images/github.jpg" style="max-width:100%;">

### Cloning
In the terminal, I navigate to a directory I want start in, then:

```
git clone https://github.com/MadeByMike/madebymike.github.io.git
```
This will create a folder for the project. If I want to clone into a specific folder I can add this after the URL. For example, adding `.` will clone into the current directory.

Once you have cloneed your project it will be set-up to track the remote origin. This means when you `push git` knows where to send it. 

### Creating an empty git repository

Sometimes I start new project that dosen't have an existing git repository. For these I need to run the command:

```
git init
```

You can work with git locally but at some point you will probably want to push to gitHub or similar. When you create a new project via the gitHub UI you have the option to initialse it. This is often easier as you can just clone it after that, but if you have existing work you will need to add the remote respository manually like this:

```
git remote add origin https://github.com/MadeByMike/madebymike.github.io.git
```

## The basics

### Create a branch

Before we start any work we should create a new branch. Working on master is not a good idea and almost any workplace will have processes that involve reviewing pull-requests. So it's a good habit when working locally too. 

To create a branch we can use the alias we created earlier.

```
git br name-of-my-branch
```
Or `git branch` if you don't have the alais.

### Checkout a branch

After you create a branch don't forget to checkout that branch before you start any work.


### Stage changes

You can be more surgical and stage only selected files or folers, but I use this about 90% of the time. The `-A` command tells git to add everything including and deleted files.

```
git add -A
```

If you want to stage specific files or folders you can add a path after `add`. For example `git add ./my-folder/` will stage all files in `my-folder`. You might do this if you want selected files for more meaningful commit messages. In my opinion, it's easier, and a better habit to just commit more often. I like to only edit files that I intend to go into the next commit.

This will add all 

## Unstage a commit

Quite often I will add something I didn't intend to a commit. Or I will commit files to the wrong branch. When this happends the easiest way is to reset like this:

```
git reset HEAD~1
```
Resetting this way will keep the changes you have made and just uncommit them `--hard` if you want to remove everything.



## Git stash
```
git stash
```

## Delete merged branches

```
git branch --merged | 
grep -v "\*" | 
grep -v "master" | 
grep -v "develop" | 
grep -v "staging" 
>/tmp/merged && 
nano /tmp/merged && 
cat /tmp/merged | 
xargs -n 1 git branch -d
```

## Delete branches

```
git branch | 
>/tmp/branches && 
nano /tmp/branches && 
cat /tmp/branches | 
xargs -n 1 git branch -d
```
```
git branch | grep -v "\*" | grep -v "master" | grep -v "develop" | grep -v "staging"  >/tmp/branches && nano /tmp/branches && cat /tmp/branches | xargs -n 1 git branch -d
```


I've always wielded Git with a healthy dose of fear and trepidation. It can be quite intimidating, but I've come to realise, it's actually hard to break anything with Git. Almost every change is reversable, but figuring out how can be the hard part.