
# Books platform

This is the coding challenge of the Book platform following the requirements given

in the platform you can create account as Author or Collaborator , login to your account and modify your user name ( email and password are not to be changed because of using json-server-auth, it doesn't provide ways to prevent from duplicating email , or check if old password is correct )

Authors can create infinite amount of sections and subsections, and can give access to some collaborators to modify the sections name 


## Runnig the project

Install project dependencies using 

`npm install`

install `json-server` in its stable version `0.17.4` globally

`npm i -g json-server@0.17.4`

run the frontend with `npm start`

run the server with `json-server --watch db.json -m ./node_modules/json-server-auth`



## Code explanations

App created using React 

Features used:

- Context Api:
    i have used Context to create Authentication Provider , in order to provide the authenticated user across the whole app and its components , in order to make restrictions for roles 
- useMemo: 
    i used useMemo to prevent random rerenderings of the app , to gain in performance
- RTK query: 
    i used Redux toolkit query library in order to implement caching mechanism, preventing the app to make recurrent calls to api
- Testing:
    i have implemented tests in `App.test.tsx`