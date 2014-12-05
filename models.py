from google.appengine.ext import db

class DictModel(db.Model):
	def to_dict(self):
	    tempdict1 = dict([(p, unicode(getattr(self, p))) for p in self.properties()])
	    tempdict2 = {'key':unicode(self.key())}
	    tempdict3 = db.to_dict(self, {'id':self.key().id()})
	    tempdict2.update(tempdict3)
	    tempdict1.update(tempdict2)
	    return tempdict1

class Contact(DictModel):
	firstName = db.StringProperty(required=False)
	lastName = db.StringProperty(required=False)
	bday = db.StringProperty(required=False)
	zodiac = db.StringProperty(required=False)
	photo = db.BlobProperty(required=False)