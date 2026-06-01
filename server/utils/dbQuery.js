const db = require("../config/db");
//=============Used in AI Interview Prep====================

const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results || []);
    });
  });
};

module.exports = dbQuery;