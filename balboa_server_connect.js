
var BASE_URL = "https://iot.controlmyspa.com/mobile";
var IAM_BASE_URL = "https://idmqa.controlmyspa.com";

var request = require('request');

module.exports = {
	validateAccessToken: function(AccessToken1, authCall){

	var options = {
		url: 'https://idmqa.controlmyspa.com/oxauth/restv1/userinfo',
		headers: {
		  'Authorization': 'Bearer ' + AccessToken1
		}
	  };
	  
	  function callback(error, response, body) {
		  console.log('gluu user validation status:' +response.statusCode);
		if (!error && response.statusCode == 200) {
		  var info = JSON.parse(body);
		  console.log("reponse:" +info.user_name);
		  return authCall(info, AccessToken1);
		}
	  }
	  
	  request(options, callback);

	},

	getSpaInfo: function(username, accessToken, spaInfoResult) {
		var options = {
			url: 'https://iot.controlmyspa.com/mobile/spas/search/findByUsername?username=' +username,
			headers: {
			  'Authorization': 'Bearer ' + accessToken
			}
		  };

		  function callback(error, response, body) {
			console.log('gluu user validation status:' +response.statusCode);
		  if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log("reponse:" +info._id);
			return spaInfoResult(info, accessToken);
		  }
		}
		
		request(options, callback);
	},

	requestLight: function(access_token, spaId, payload) {
		console.log('payload to send:' +payload);
		var options = {
			url: 'https://iot.controlmyspa.com/mobile/control/'+spaId+'/setLightState',
			method: "POST",
			json: payload,
			headers: {
			  'Authorization': 'Bearer ' + access_token
			  
			}
		  };

		  function callback(error, response, body) {
			  //console.log(error);
		  if (!error && response.statusCode == 202) {
			//var info = JSON.parse(body);
			//console.log("reponse:" +info);
			//return info;
		  }
		}
		
		request(options, callback);
	}
};






// function getSpaInfo(spaId, accessToken_spa) {	

// 	console.log("Spa Id = " + spaId);
// 	console.log("Access Token = " + accessToken_spa);
//    try {
// 	   var getBody = BASE_URL + "/control" + "/spas" + "/search" + "/findByUsername" + "?username=" +user
// 	   console.log("Response = " + getBody)
//    } catch (error) {

//    }
// }

// var user = 'ashishbharadwaj100';
// var accessToken_spa = 'ashish1234';


// getSpaInfo(user, accessToken_spa);

// // Taking SpaId, AccessToken, Control, Payload

// function requestSetControlState(spaId, accessToken, control, payload) {	

// 	 console.log("Spa Id = " + spaId);
// 	 console.log("Access Token = " + accessToken);
// 	 console.log("Control = " + control);
// 	 console.log("Payload = " + payload);

// 	try {
// 		var url = BASE_URL + "/control/" + spaId + "/set" + control + "State"
// 		console.log("Payload = " + url)
// 	} catch (error) {

// 	}
// }

// var spaId = 'aa123aw123';
// var accessToken = 'aa123aw123aa123aw123aa123aw123aa123aw123aa123aw123';
// var control = 'Filter';
// var payload = '123';

// requestSetControlState(spaId, accessToken, control, payload);

// //Making a call back get Method

// function callGetMethod() {

// 	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// 	var http = new XMLHttpRequest();
// 	var url = 'http://ec2-54-244-9-143.us-west-2.compute.amazonaws.com:7000/tracking/children/10';
// 	http.open("GET", url);
// 	http.send();

// 	http.onreadystatechange = function () {
// 		if (this.readyState == 4 && this.status == 200) {
// 			console.log(http.responseText);
// 		}
// 	}

// }

/*

// function callPostMethod() {
// 	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// 	var http = new XMLHttpRequest();
// 	var url = 'http://ec2-54-244-9-143.us-west-2.compute.amazonaws.com:7000/tracking/register';
// 	var params = '{"firstname": "Test","lastname": "Test","password": "12345678","email": "viveksinghpathania1@gmail.com","profileimage":"","phone":"9013609897"}';
// 	http.open('POST', url, true);

// 	//Send the proper header information along with the request
// 	http.setRequestHeader('Content-type', 'application/json');

// 	http.onreadystatechange = function () {//Call a function when the state changes.
// 		if (http.readyState == 4 && http.status == 200) {
// 			//alert(http.responseText);
// 			console.log(http.responseText);
// 		}
// 		console.log(http.responseText);
// 	}
// 	http.send(params);
// }

// callPostMethod();

//POST Method Implementation

*/


//callGetMethod();

// requestSetControlState();