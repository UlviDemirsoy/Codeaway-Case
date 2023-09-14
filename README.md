The purpose of the project is to manipulate the config file of mobile applications and serve them to devices via public API. The public config service is separated from the back end service. In the backend service, the jwt token provided by Firebase auth is checked for each request with the auth middleware.
 
 # Backend Service

 https://backendapi-a352piz6wq-uc.a.run.app

 POST /account > create account
 POST /account/login > login
 POST /parameter > create parameter
 PUT  /parameter/:id > update parameter
 GET  /parameter/:id > get parameter by id
 GET  /parameterlist > get parameter list
 
 DELETE  /parameter/:id > update parameter

 # Config Service
 
 https://configapi-3uudw2ymta-uc.a.run.app/config
 GET  /config > get app config


 # Frontend
 
 https://reactfrontend-7wpxaylhhq-uc.a.run.app
