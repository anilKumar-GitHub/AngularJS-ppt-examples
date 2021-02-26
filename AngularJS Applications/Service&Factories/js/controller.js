


	/**
	*	ContactBook application modeule
	*
	*/

	var app = angular.module("myapp", []);
	
	app.filter('forEach', function() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
			
            for (var i = lowBound; i <= highBound; i++)
                result.push(i);
            return result;
        };
    });

	app.controller("HelloController", ["$scope", function($scope){ }]);
	//Here contactsFactory/contactsServices is injected into controller
	//contactsFactory
	//contactsServices
	app.controller("ContactBook", ["$scope", "contactsFactory", function($scope, $cBookInterface){
		// just create reference object
		$scope.contactsBook = [{name:'', number:''}];
		$scope.topic = $cBookInterface.provider;
		//visibility controller for hiding and displaying HTML element
		var updateIndexValue = null;	//reference to updating value
		$scope.name = '';		//reference to new input value
		$scope.number = '';
		$scope.query = '';
		//visibility controls
		$scope.addButtonDisable = true;
		$scope.updateButtonDisable = true;
		$scope.addButtonShow = true;
		$scope.updateButtonShow = false;
		$scope.cancelUpdateButtonShow = false;
		//for sorting, default initial sorting is name
		$scope.sortField = 'name';
		$scope.reverse = false;	// sorting order
		$scope.noOfRec = 5;
		$scope.startFrom = 0;
		$scope.noOfContacts;
		$scope.hello;

		//load inital data
		function init()	{
			$scope.contactsBook = $cBookInterface.getContactList();
			$scope.noOfContacts = $scope.contactsBook.length;
		}
		//call for loading initial data
		init();
		//controll adding & update operation
		$scope.setOperationalButtonStatus = function()	{
			$scope.addButtonDisable = $scope.updateButtonDisable = ($scope.name != '' && $scope.number != '')? false : true;
		}

		//update & controll the visibilty of buttons
		$scope.updateContactInfo = function()	{

			var newContact = {};
			newContact.name = $scope.name;
			newContact.number = $scope.number;

			if(updateIndexValue != null)	{
				//if updeted successfully it returns new JSON object
				//otherwise null
				var updatedContacts = $cBookInterface.updateContact(updateIndexValue, newContact);
				if(updatedContacts != null)	{
					$scope.contactsBook = updatedContacts;
				}
				updateIndexValue = null;
			}
			//depending on true/false those button will shown/hide
			$scope.addButtonShow = true;
			$scope.updateButtonShow = false;
			$scope.cancelUpdateButtonShow = false;
			$scope.clearInputs();
		}

		//adding new record
		$scope.addNewContactInfo = function()	{

			//if added successfully it returns new JSON object
			//otherwise null
			var updatedContacts = $cBookInterface.addContact($scope.name, $scope.number);
			if( updatedContacts == null )	{
				alert("This record related to "+$scope.name+" already exist");
			}else	{
				//just assign new json object to scope.contactsBook object
				$scope.contactsBook = updatedContacts;
				$scope.clearInputs();
			}
			$scope.updateNavigation();
		}

		//pre-update controlls updates
		$scope.updateThis = function(recName)	{

			var i = $cBookInterface.getIndex(recName);
			updateIndexValue = recName;
			var contact = $cBookInterface.getContactDetailsOf(recName);
 			$scope.name = contact.name;
			$scope.number = contact.number;
 			$scope.addButtonShow = false;
			$scope.updateButtonShow = true;
			$scope.cancelUpdateButtonShow = true;
			$scope.setOperationalButtonStatus();
		}
		//reset visibility controls on cancel
		$scope.cancelUpdateOperation = function()	{

			updateIndexValue = null;
			$scope.operationButton = true;
			$scope.addButtonShow = true;
			$scope.updateButtonShow = false;
			$scope.cancelUpdateButtonShow = false;
			$scope.clearInputs();
		}

		$scope.removeThis = function(recName) {
			//check for removing element is selected for update
			if(updateIndexValue != null)	{
				if(updateIndexValue == recName)		
					$scope.cancelUpdateOperation();
			}

			var updatedContacts = $cBookInterface.removeThisContact(recName);
			if(updatedContacts != null)
				$scope.contactsBook = updatedContacts;
			$scope.updateNavigation();
		}

		//clear input text boxes
		$scope.clearInputs = function()	{
			$scope.name = '';
			$scope.number = '';
			$scope.setOperationalButtonStatus();
		}

		//changing sorting order of column
		$scope.sortBy = function(fieldName)	{
			$scope.sortField = fieldName;
			$scope.reverse = !$scope.reverse;
		}
		
		$scope.updateNavigation = function()	{
			$scope.noOfContacts = $scope.contactsBook.length;
		}
	}]);
