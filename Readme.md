# Winnetka Wood Works

## A simple e-commerce site.

Known issues:
1. TODO: form validation

Client: create-react-app  
Server: express 



Notes:

RE:
https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61


This folder 'C:\Dev\JavaScript\create-react-app-express' is for the Express server, while the 'client' sub-folder is for
the React dev server that was created with the create-react-app package.

create-react-app hides webpack
create-react-app hides the bundle.js file

create-react-app hides all configuration - which can be exposed by the 'eject' command (npm run eject)

HTTPS

/client/package.json
	"scripts": {
	"start": "set HTTPS=true&&react-scripts start",

	"proxy": "https://localhost:5000/"


/server.js
	https.createServer({
	  key: fs.readFileSync('./ca.key'),
	  cert: fs.readFileSync('./ca.crt')
	//  key: fs.readFileSync('./create-react-app-express/ca.key'),
	//  cert: fs.readFileSync('./create-react-app-express/ca.crt')
	}, app).listen(port, () => console.log(`Listening on port ${port}`));
