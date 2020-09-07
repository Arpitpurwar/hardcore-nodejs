// Set Envoirments for our node code

 var envoirments = {};

 // Staging Envoirment
 envoirments.stag={
     'port':2000,
     'envName':'staging',
     'secret':'This is Secret',
     'maxChecks' : 5,
      'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
}
 };
 
 // production Envoirment
 envoirments.prod={
    'port':3000,
    'envName':'production',
    'secret':'This is Also Secret',
    'maxChecks':5
};

 // QA Envoirment
 envoirments.test={
    'port':3500,
    'envName':'QA',
    'secret':'This is Quite Secret',
    'maxChecks':5
};

//Determine which env passed on cmd
var currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.trim(): '';

// checking env which we sent from currentenv
var checkenv = typeof(envoirments[currentEnv]) == 'object' ? envoirments[currentEnv]: envoirments.stag;

// Export

module.exports = checkenv;