const otpGenerator = require("otp-generator");
function generatedOtp() {
 return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
}

function otpExpire() {
     return new Date(Date.now() + (10 * 60 * 1000))
}
module.exports = {generatedOtp, otpExpire}