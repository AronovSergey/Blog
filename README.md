# Blog Project

## Add an environment file to the project
Add a .env file in the api folder 
 - add your own DATABASE_URL in the .env file
 - add your own JWT_SECRET in the .env file

Example of file: 

    DATABASE_URL=<your url>  
    JWT_SECRET=jklasjdoij897231na

## Start the Backend in dev Mode after you added the .env file
`cd backend`  
`npm install`  
`npm run start:dev`  
  
## Start the Frontend in dev Mode after you added the .env file
`cd frontend`    
`npm install`  
`ng serve`  

## Start the e2e tests
`cd e2e`    
`npm install`  
`npm run cypress:open`
### Generate e2e Report (html)
`npm run cypress:report`