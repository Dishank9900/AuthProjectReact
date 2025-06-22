export const checkUserValidity = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (!token) return new Error("token not found");
        resolve(true);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};
