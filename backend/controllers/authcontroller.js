const connection = require("../configs/dbconfig");
const login = async (req, res) => {
  try {
    // console.log("body", req.body);
    const { username, password } = req.body;
    const q = `SELECT * FROM t_login WHERE f_username='${username}' AND f_Pwd='${password}'`;
    connection.query(q, async (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "fail",
          message: "Failed to log in",
        });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid username or password",
        });
      }

      // Get the user data
      const user = results[0];
      if (user) {
       // console.log(user.f_userName);
        res.status(200).json({
          status: "success",
          message: "Logged in successfully",
          user,
        });
      } else {
        res
          .status(401)
          .json({ status: "fail", message: "Unauthorized access" });
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to log in",
    });
  }
};

module.exports = { login };
