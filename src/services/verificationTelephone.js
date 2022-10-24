require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

const sendNumberVerification = async (number) => {
  try {
  return await client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: `+598${number}`,
      channel: "whatsapp",
   });
  } catch (error) {
    console.log(error)
  }
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
