const connection = require("../configs/dbconfig");
const isEmailInUse = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS count FROM t_employee WHERE f_Email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Error checking email:", err);
          return reject(err);
        }
        const count = results[0].count;
        resolve(count > 0);
      }
    );
  });
};

const isPhoneInUse = (phone) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS count FROM t_employee WHERE f_Mobile = ?",
      [phone],
      (err, results) => {
        if (err) {
          console.error("Error checking phone number:", err);
          return reject(err);
        }
        const count = results[0].count;
        resolve(count > 0);
      }
    );
  });
};

module.exports = {
  isEmailInUse,
  isPhoneInUse,
};
