const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "dyasmir",
    database: "dashboard",
    port: 5432,
});

module.exports = pool;
