# Blogging Platform

## About App
[Blogging Platform](https://vadimgierko.github.io/blogging-platform/) is one of my latest, most complex & advanced responsive full-stack single-page application. It supports all kinds of CRUD features, in which I have used all of my previous knowledge and skills in the field of:
- front-end development (React, Bootstrap)
- back-end development
   - dynamic & nested routing (React Router)
   - realtime database integration (Firebase)
   - database architecture
   - security rules
- app structure
   - Atomic Web Design pattern

## Blogging Platform allows you to:

- create & run your blog (or many blogs) for free after creating a free user account,
- write & edit your articles with simple & intuitive markdown text editor, which was also created by myself (see project repo here: https://github.com/vadimgierko/markdown-text-editor or try it here: https://vadimgierko.github.io/markdown-text-editor/),
- read published blogs without authentication

## Recently the app was updated and rewritten (basically from scratch) and adapted to:
- new app structure according to Atomic Web Design pattern (so now code is split, and components are reused more efficiently)
- new, more flatten realtime database structure (so now the app downloads up to 10 times less data & does it when necessary)
- new security rules (so now the app is protected from malicious users, and that's very hard to download big portions of data, for example it's impossible to download the whole database)

## Technologies used in the project

- React 17
- React Context
- React Router 5.2 (dynamic & nested routing)
- React Markdown 7 & remark-gfm
- Firebase 9.1 (authentication, realtime database, security rules)
- Bootstrap 5.1
- Bootswatch 5.1
- GitHub Pages 3.2
- Atomic Web Design pattern