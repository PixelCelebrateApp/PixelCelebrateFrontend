PixelCelebrateFrontend Project

Steps for running the app:

- `npm install` to install all dependencies from `package.json`;
- `npm start` to start running the app in development mode;
- open http://localhost:3000 to view it in the browser.

There are two users that can log in:

- Employee - can view their profile and a table with all the other users (employees and admins so there is a possibility for those to communicate);
- Admin - can view their profile, a table with all the other users and has a separate page for creating new accounts and changing the notifications' configuration;

Every form has validators that ensure the data that is inserted in the db is correct;
