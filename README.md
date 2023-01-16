The following variables should be placed in a .env at the root. To run the project in development mode w/o auth, just need to add the MONGODB_URI. To test auth, change NODE_ENV to say "production" and get an AWS user pool id and client id.

MONGODB_URI=  
NODE_ENV=development  
AWS_USER_POOL=  
AWS_CLIENT_ID=  