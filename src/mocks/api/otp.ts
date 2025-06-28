export const getOtp = (countryCode: string, phoneNumber: string) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (!countryCode)
          return reject(new Error("Country code nhi mila lawdee"));
        if (!phoneNumber)
          return reject(new Error("Phone number nhi mila lawdee"));
        if (countryCode.length < 1 && countryCode.length > 3)
          return reject(new Error("Sahi country code bhej lawdee"));
        if (phoneNumber.length < 8)
          return reject(new Error("Sahi number daal lawdee"));
        resolve(phoneNumber.slice(0, 4));
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyOtp = (
  countryCode: string,
  phoneNumber: string,
  otp: string
) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Verifying OTP with:", { countryCode, phoneNumber, otp });
      setTimeout(() => {
        if (!countryCode)
          return reject(new Error("Country code nhi mila lawdee"));
        if (!phoneNumber)
          return reject(new Error("Phone number nhi mila lawdee"));
        if (countryCode.length < 1 && countryCode.length > 3)
          return reject(new Error("Sahi country code bhej lawdee"));
        if (phoneNumber.length < 8)
          return reject(new Error("Sahi number daal lawdee"));
        if (otp !== phoneNumber.slice(0, 4))
          return reject(new Error("Galat otp hai lawdee"));
        resolve(true);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};
