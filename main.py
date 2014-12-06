from flask import Flask, request, jsonify, render_template, make_response, json, redirect, url_for
from models import Contact
from functools import wraps
from google.appengine.ext import db
from google.appengine.api.datastore import Key

app = Flask(__name__)
app.config['DEBUG'] = True

def add_response_headers(headers={}):
    """This decorator adds the headers passed in to the response"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            resp = make_response(f(*args, **kwargs))
            h = resp.headers
            for header, value in headers.items():
                h[header] = value
            return resp
        return decorated_function
    return decorator

def apiheaders(f):
    """This decorator passes UTF8"""
    return add_response_headers({'X-Requested-With': 'XMLHttpRequest',
    							  'content-type': 'text/javascript, charset=utf-8'})(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contacts', methods = ['GET'])
@apiheaders
def contacts():
	if request.method == 'GET':
		results = Contact.all()

	json_results = []
	for result in results:
		d = {'id': result.key().id(),
			 'firstName': result.firstName,
			 'lastName': result.lastName,
			 'bday': result.bday,
			 'zodiac': result.zodiac}
		json_results.append(d)

	return jsonify(contacts=json_results)

@app.route('/api/contacts/<int:contact_id>', methods = ['GET'])
@apiheaders
def contact(contact_id):
	if request.method == 'GET':
		result = Contact.get_by_id (contact_id, parent=None)

	json_results = []
	d = {'id': result.key().id(),
		 'firstName': result.firstName,
		 'lastName': result.lastName,
		 'bday': result.bday,
		 'zodiac': result.zodiac}
	json_results.append(d)

	return jsonify(contacts=json_results)

@app.route('/api/contacts', methods = ['POST'])
@apiheaders
def create_task():
    contact = Contact(
        firstName = request.json['firstName'],
        lastName = request.json['lastName'],
        bday = request.json['bday'],
        zodiac = request.json['zodiac']
    )
    contact.put()
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(e):
    """Return a 404 error."""
    return 'Sorry, nothing at this URL.', 404
