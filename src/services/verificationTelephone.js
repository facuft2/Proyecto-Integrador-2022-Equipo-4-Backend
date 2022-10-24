require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

const sendNumberVerification = async (number) => {
  return client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: `+598${number}`,
      channel: "sms",
   });
};

const verifyNumber = async (number, code) => {
    return client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: `+598${number}`,
        code
      })
      .then((verification_check) => verification_check.status);
};

module.exports = { sendNumberVerification, verifyNumber };
