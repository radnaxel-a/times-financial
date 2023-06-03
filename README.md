# Sample solution monorepo

In this repository you will find a sample solution for the take home test. The solution has of 4 parts:

- sample back-end implementation
- sample front-end implementation
- unit tests for the front-end part with coverage %
- monorepo to manage both easly

## How to run

---

Clone the repo and run the following commands in that order.

- `npm i`
- `npm run install`
- `npm run start`
- open your browser on localhost:4200

Description:
Clone the repo and run `npm i` in the root dir. Afterwards run `npm run install` to install the required dependencies for the FE and BE projects. To start the projects run `npm run start` to start both FE and BE solutions and open your browser on `localhost:4200`.

## Monorepo

---

The monorepo is set up with lerna to make running and managing the fe and be more easly.

scripts:

- start - start the be and fe
- build - run the build scripts for both projects
- install - install dependencies for projects in the `packages` dir
- test - run FE unit tests

## Front-end

---

The FE is build with Angular and Typescript. You can run it standalone by navigating to the front-end dir and running `npm run start`

## Back-end

The BE is build with Express.js and Typescript. The region data is stored in json files, for the sake of a fully working CRUD solution. You can run it standalone by navigating to the back-end dir and running `npm run start`

## Unit test

---

**Coverage summary**

Statements : 86.32% ( 101/117 ) <br>
Branches : 84.21% ( 16/19 )<br>
Functions : 79.54% ( 35/44 )<br>
Lines : 87.96% ( 95/108 )<br>

Coverage is generated in with running the test script. The report can be found under front-end/coverage/index.html

Note: testing is done only for the FE part.
