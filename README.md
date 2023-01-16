To run the project in development mode w/o auth, just need to add the MONGODB_URI string below and place in a .env at the root. To test auth, change NODE_ENV to say "production" and get an AWS user pool id and client id.

MONGODB_URI=  
NODE_ENV=development  
AWS_USER_POOL=  
AWS_CLIENT_ID=  