//const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
/*
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("f$&ing firebase version");
 });*/



//const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
/*exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push it into the Realtime Database then send a response
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });


*/
/*
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Only edit data when it is first created.
      if (event.data.previous.exists()) {
        return;
      }
      // Exit when the data is deleted.
      if (!event.data.exists()) {
        return;
      }
		// Grab the current value of what was written to the Realtime Database.
		const original = event.data.val();
		console.log('Uppercasing', event.params.pushId, original);
		const uppercase = original.toUpperCase();
		// You must return a Promise when performing asynchronous tasks inside a Functions such as
		// writing to the Firebase Realtime Database.
		// Setting an "uppercase" sibling in the Realtime Database returns a Promise.
		return event.data.ref.parent.child('uppercase').set(uppercase);
	});*/
//SENDING AN EMAIL...STILL TRYING :(

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.mail);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);


exports.sendEmail = functions.https.onRequest((request,response) => {
	const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
	 const mailOptions = {
	    from: '"Spammy Corp." <noreply@firebase.com>',
	    to: 'oswalfut_96@hotmail.com, os@fixter.org, oswaldinho963@gmail.com',
	    subject: 'hunger ✔', // Subject line
	    text: 'Una pizza o khé ?', // plain text body
	    html: '<b>Pizza or what ?</b>' // html body
	  };
	  return mailTransport.sendMail(mailOptions).then(() => {
	      console.log('se envió tu correo paps');
	      response.send('se envió tu correo paps');
	    }).catch((e) => {
	    	console.log(e);
	    });

});
//FUC%(==ING EMAIL)
