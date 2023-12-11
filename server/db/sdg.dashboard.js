const Pool = require("pg").Pool;

const pool = new Pool({
    host: "54.179.35.184",
    user: "postgres",
    password: "dyasmir",
    database: "dashboard",
    port: 5432,
});

module.exports = pool;
