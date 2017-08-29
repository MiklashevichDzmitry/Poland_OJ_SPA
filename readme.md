
Setting up node environment variable for production:

linux & mac: export NODE_ENV=production
windows: set NODE_ENV=production
_______________________________________

In case of hosting you also need to change 
variable 'serverURN' in file 

    './public/send.js' 
    
to your real site name (root).

______________________________________

In 'server.js' file port in production mode is set to 'http' variable port (80). 
In case of having https website set it to 'https' variable (443)