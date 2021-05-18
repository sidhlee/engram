# Engram

A personal tracking system for online learning materials

## Problem

- While learning to become a web developer, I had to absorb large amount of information in a relatively short period of time.
- There are some online documents and articles that I tend to revisit over time because 1. I forget 2. for deeper understanding.
- When I find some really good article, I bookmark it for later read, but when it's hidden inside bookmark folders, I don't even remember that I have them.
- I want to see all the things that I learned in one sight so hold onto the concepts and build mental map, but most of the existing solutions are not utilizing bigger screen to do that.

## Things I learned

### Keep any work that takes more time (computation, network request, etc...) higher in the tree

Components that are lower in the tree tend to get re-rendered more often than their ancestors and have more instances of the same component. Try to keep children as dumb as possible for better performance.

### Firebase is a state management tool

By updating state inside Firebase's value change listener, you're effectively synchronizing your app to the cloud database which works as the single source of truth.

- Added Redux then removed it because when you're working with firebase, almost all actions affecting global state will have side-effect (by mutating outside source - Firebase). Curious what would be the reason if someone's adding Redux into this equation.

## Reference

- [Authentication with Firebase in React - GitHub Repo](https://github.com/WebDevSimplified/React-Firebase-Auth)
