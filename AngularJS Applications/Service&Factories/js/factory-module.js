
	//creating factory
	//use can connect to database in factory

  	app.factory('contactsFactory', function(){
		// JSON object to hold contact list
		var contactsBook = [
			{name:"Anil", number:"9060544890"},
			{name:"Rajesh", number:"9538543735"}
		];
		
		// reference to factory object
		var factory = {};

		factory.provider = "factories";

		//methods to access factory operations
		//get list of
		//if you write like this, such functions get exposed to outside
		factory.getContactList = function()	{
			return contactsBook;
		};

		//get perticular record
		factory.getContactDetailsOf = function(recName)	{
			//find whether given name is exist or not
			//if exist take that index
			var i = getIndexOf(recName);
			// see this method, how search is carried out.
			//Note : this search may differ with type of data being used by application
			if( i != -1 )
					return contactsBook[i];
			return null;
		};

		//just gets contact number of user
		factory.getNumberOf = function(recName)	{
			var i = getIndexOf(recName);
			if( i != -1 )
					return contactsBook[i].number;
			return null;
		};

		//if you write like this, it won't exposed outside the factory
		//its equivalent to private method in java class
		function getIndexOf(recName)	{
			for( i = 0; i < contactsBook.length; i++ )
				if(contactsBook[i].name == recName)
					return i;
			return -1;
		};

		//adding new record to contacts object, you can also pass json object
		factory.addContact = function(newName, newNumber)	{

			var i = getIndexOf(newName);
			if( i >= 0 )	{
				return null;
			}
			else	{
				var newContact = {};
				newContact.name = newName;
				newContact.number = newNumber;
				contactsBook.push(newContact);
				return contactsBook;
			}
		};

		//update the object
		factory.updateContact = function(oldValue, newContact)	{

			var i = getIndexOf(oldValue);
			if( i >= 0 )	{
				//get index of updating data and just assign this new data to that index json object
				//internally it will take care of GUI updated, that's beauty of AngularJS called two way binding
				contactsBook[i] = newContact;
				return contactsBook;
			}
			return null;
		};

		factory.removeThisContact = function(recName) {
			var i = getIndexOf(recName);
			if( i >= 0){
				//this is special method which helpful remove data from GUI as well as from JSON object
				contactsBook.splice(i,1);
				return contactsBook;
			}
			return null;
		};

		//complimentary method to expose this method outside the factory`
		factory.getIndex = function(recName)	{
			getIndexOf(recName)
		};

		//this compulsory statement to expose the factory to other controller in application
		return factory;
	});
