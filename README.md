## guessRGB - AWS Edition

##### *AKA Wordle With Colors*

---

### What is this?

A casual browser game. Guess the color by selecting a value from the color input. The answer is randomly generated. The player has five chances to guess correctly.

This application is currently in development. It's being completely rewritten. It can be played below:

## [AWS Amplify demo with login/registration](https://main.d3p24kghk68qsi.amplifyapp.com/)

## [Non-AWS Github Demo (without login/registration)](https://ashetonsm.github.io/guessRGB/)

### To do:
- General
    - [ ] Select a color family to streamline guessing
    - [ ] Add a social/sharing feature for results
    - [x] Adjust handicap (default: a value within 25pts of the target is correct)
    - [x] Add an info/about page or modal
    - [x] Move local variables to useContext
- Navigation
    - [x] Integrate log in session info with app navigation
- Styling
    - [ ] Sound effects
    - [ ] Finish styling
    - [ ] More feedback in general
- Login and registration
    - [ ] Stop checking for login on every page?
    - [ ] Add retry cooldown
    - [ ] Add more feedback/info to login/registration
    - [x] Rework login with better salt/hash protocols
- Profile page
    - [ ] View others' profiles
    - [ ] Display by newest to oldest
    - [x] Paginate results
    - [x] Show win/lose stats
    - [x] Show winning color swatches

---

### Tools:

- React + Typescript
- Bootstrap 5 + React-Bootstrap
- Node.js
- Next.js
- AWS Amplify
- GraphQL
- DynamoDB
- AWS S3

