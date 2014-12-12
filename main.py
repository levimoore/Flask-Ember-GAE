from flask import Flask, request, jsonify, render_template, make_response, json, redirect, url_for
from models import Contact
from functools import wraps
from google.appengine.ext import db
from google.appengine.api.datastore import Key

app = Flask(__name__)
app.config['DEBUG'] = True

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contacts', methods = ['GET'])
@crossdomain(origin='*')
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
@crossdomain(origin='*')
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
@crossdomain(origin='*')
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
