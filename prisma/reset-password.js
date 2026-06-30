const bcrypt = require('bcrypt');
const mysql  = require('mysql2/promise');

async function main() {
  const newPass = '123123';
  const hash    = await bcrypt.hash(newPass, 10);

  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'healing',
  });

  const [result] = await conn.execute(
    "UPDATE users SET password_hash = ? WHERE role = 'Doctor'",
    [hash]
  );

  await conn.end();

  console.log(`Updated ${result.affectedRows} doctor(s). New password: ${newPass}`);
}

main().catch(console.error);
