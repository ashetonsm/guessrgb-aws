## guessRGB

##### *AKA Wordle With Colors*

---

### What is this?

A casual browser game. Guess the color by selecting a value from the color input. The answer is randomly generated. The player has five chances to guess correctly.

This application is currently in development. It's being completely rewritten and the demo is not live at this time.

### To do:
- General
    - [x] Move to a global app context (useContext)
- Navigation
    - [x] Integrate log in session info with app navigation
- Styling
    - [ ] Finish styling
- Login and registration
    - [ ] Redirect after logging in
    - [ ] Add retry cooldown
    - [x] Rework login with better salt/hash protocols
- Profile page
    - [ ] Show win/lose stats
    - [ ] Show winning color swatches

---

### Tools:

- React Typescript
- Bootstrap 5/React-Bootstrap
- MongoDB/Mongoose
- Bcryptjs
- Express
- Node.js