const { Pool } = require('pg');

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: process.env.password,
	database: "database1",
});

pool.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected ');
});

module.exports = pool;