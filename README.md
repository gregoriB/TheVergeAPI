Uses an API from https://newsapi.org.

The API key is hidden from the public.  In order to run this, one must add their own API key.  To do this, create an 'apikeys.js' file and add your API key to an object.  Then perform a module export on the object.  Follow this example: 

	const apikey = {
			SECRET_KEY: 'apiKey=YOUR_SECRET_API_KEY_GOES_HERE'
			}

	module.exports = apikey;


Of if you choose to, you can instead paste your API key into the 'key' variable in the app.js file.  Example:

	const key = 'apikey=YOUR_SECRET_API_KEY_GOES_HERE';


It's recommended that you don't upload your API key to github or anywhere else public.  Keep 'gitignore' file to exclude your apikeys.js file from the repository.