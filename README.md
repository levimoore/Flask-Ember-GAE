Flask-Ember-GAE
===============
Flask-Ember-GAE is a simple web application that is a scaffold for using the Flask Python library on Google App Engine as a RESTful back end for Ember.js applications.

##To Use:

###Install App Engine

Download and install the [Google App Engine Launcher.](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)This will provide you a local development environment that simulates the actual live App Engine envrionment. More information on using App Engine is available [here.](https://cloud.google.com/appengine/docs/python/gettingstartedpython27/introduction) 

###Download the Flask-Ember-GAE zip file

Or use the Terminal application

	git clone https://github.com/levimoore/Flask-Ember-GAE 

Unpack the zip file and change the first line of app.yaml, by naming your project.

	application: Flask-Ember-GAE

Launch the Google App Engine Launcher application. Choose File>Add Exsisting Application... *Be sue to make note of the port assigned to your application.

###Update Ember Application

On line 8 of the app.js file fill out the port number assigned to you by the Google App Engine Launcher

	  host: 'http://localhost:<add the port assigned you by GoogleAppEngineLauncher here>'
	  
