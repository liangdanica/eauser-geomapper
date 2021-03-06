// POST request body -? {message: <message>, subject: <subject>}
//  Subject has already been formatted properly

var keys = require("/private/keys.sjs");
var emailRecipient = keys.emailRecipient;

declareUpdate();

var sr = require('/MarkLogic/jsearch.sjs');

var rawInput = xdmp.getRequestBody();

var input = rawInput.toObject();

var success = true;

try {
  var email = {"from":{"name":"eauser-geomapper", "address":"eauser.geomapper@marklogic.com"},
                 "to":{"name":emailRecipient.name, "address":emailRecipient.address},
                 "subject": input.subject,
                 "content": input.message};
  xdmp.email(email);
  xdmp.log("successfully emailed feedback: " + input.subject);
}
catch (err) {
  xdmp.log("failed to send: " + input.subject);
  xdmp.log(err);
  success = false;
}

success;

