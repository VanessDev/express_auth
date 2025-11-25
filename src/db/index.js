import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

export const pool = mysql.createPool({
    host: env.db.host,
    port:env.db.port,
    user:env.db.user,
    password:env.db.password,
    database:env.db.database,
    connectionLimit:10, //nbre de connexion simultané 

});



// testConnection.js
export async function testConnection(pool) {
  try {
    // simple lightweight query; returns rows if you need them
    await pool.query('SELECT 1');
    return { ok: true };
  } catch (err) {
    // map or log errors as needed
    return { ok: false, error: err };
     console.log('co a mysql ok a',rows[o].now);
  }
  
}


