const twilio = require('twilio');

exports.handler = async function(event, context) {
    const accountSid = process.env.ACf4066b34105402ef9ae0e98de89524ae; // Get from environment variables
    const authToken = process.env.65e9d0bbef5cda5238831096ceb2a07c;   // Get from environment variables
    const client = twilio(accountSid, authToken);

    // Parse the phone number and message from the request
    const { phoneNumber, message } = JSON.parse(event.body);

    try {
        // Send SMS using Twilio API
        const response = await client.messages.create({
            body: message,
            from: '+18777804236', // Twilio phone number
            to: phoneNumber
        });

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, messageSid: response.sid })
        };
    } catch (error) {
        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
