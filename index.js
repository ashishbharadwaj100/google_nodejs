var another = require('./balboa_server_connect.js');

const express = require('express')
const bodyParser = require('body-parser')

var port = process.env.PORT || 3000;
var currentStat = ''


express().use(bodyParser.json());
express().use(bodyParser.urlencoded({ extended: true }));

const { dialogflow } = require('actions-on-google');

const app = dialogflow({ debug: true })

//For Debug Purpose
app.intent('Default Welcome Intent', conv => {
  conv.ask('Welcome to ControlMySpa. How Can I help you? Say ‘Help’ for some suggestions.?')
});

app.intent('help', conv => {
  conv.ask("Here are some things you can say: Turn lights on or off, what is the set temperature, what is the actual temperature, what is the heater status, set temperature to.")
});

function authCall(info, accessToken) {
  if(info != null) {
    console.log(info.user_name);
    console.log("fetching spa information");
    another.getSpaInfo(info.user_name, accessToken, spaInfoResult);
    console.log("spainfo fetched");
  }
}

function spaInfoResult(spa, accessToken) {
  if(spa != null) {
    console.log('turning on light');
 
    var payload = {
      //"desiredState" : "HIGH",
      "desiredState" : currentStat,
      "originatorId" : accessToken,
      "deviceNumber" : "0"
    };
    console.log('CurrentStat = ' + currentStat);
    another.requestLight(accessToken, spa._id, payload);
  }
}

app.intent('lightIntent', (conv, {status}) => {
  console.log('access token:' +conv.user.access.token);
  another.validateAccessToken(conv.user.access.token, authCall);
  if(status === 'on') {
    currentStat = "HIGH";
  } else {
    currentStat = "LOW";
  }
  console.log('currentStat : ' + currentStat);
  conv.ask(`Your lights are now ${status}!`);
});



app.intent('blowerIntent', (conv, {status}) => {
  conv.ask(`Your blower are now ${status}!`);
});

app.intent('heaterIntent', (conv, {status}) => {
  conv.ask(`Your heater are now ${status}!`);
});

app.intent('queryTempIntent', (conv, {temperature}) => {
  conv.ask(`Current temperature is now + ${temperature} + scale!`);
});


app.intent('querySetTempIntent', (conv, {tempValueRounded}) => {
  conv.ask(`Your Spa desired water temperature is now + ${tempValueRounded} + "degrees" + scale;!`);
});

app.intent('queryLightIntent', (conv, {status}) => {
  conv.ask(`Lights are ${status}!`);
});

app.intent('queryHeaterIntent', (conv, {status}) => {
  conv.ask(`Heater is ${status}!`);
});

app.intent('whatCanIDoIntent', (conv) => {
  conv.ask("You can ask me things to help you control your Spa."
  + "For example, you can ask what is the current water temperature by saying Tell my spa, What is the temperature?"
  + " Or you can set the desired water temperature by saying ‘Tell my spa, set temperature to XX.’"
  + " Or you can ask if the heater is On by saying, ‘Tell my spa, is my heater on?’ or"
  + " you can ask if the lights are On or Off by saying, "
  + " Tell my spa, are my lights On? and finally you can turn your lights On or Off by saying "
  + "Tell my spa, turn my lights On.");
});

//temperature, degree, temperaturevalue,
app.intent('setTemperatureIntent', (conv, {number, scale}) => { 
  conv.ask(`Your spa desired water temperature is now ${number} degrees ${scale}`);
});

app.intent('Default Fallback Intent', (conv) => {
    conv.close("I am unable to understand this time " +
      "Can you try again with invocation Control My Spa");
  }
);



express().use(bodyParser.json(), app).listen(port);
