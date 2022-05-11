const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host:'34.123.115.142',
	password: "hudahuda",
	database: "database1",
    port: 5432,
    ssl:{
        rejectUnauthorized: false,
    }
});

pool.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected ');
});

module.exports = pool;