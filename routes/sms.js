// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your order has been received and will be ready in 15 minutes!',
     from: '+13658000732', //(365) 800-0732
     to: '+15197885111'
   })
  .then(message => console.log(message.sid));
