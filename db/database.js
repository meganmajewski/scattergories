const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://hixfdpwggzhmyu:dac4a473157d86999bc9df29275e1e88e8625bf2b5c5ec0674e6b11ae93832f8@ec2-18-207-95-219.compute-1.amazonaws.com:5432/d7tdhnm9r6i63p",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = {
  getAllAnswers: ()=> {
    client.query('SELECT * FROM answers', (err, res) => {
      console.log('query');
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    });
  },
  addAnswers: async (body) => {
    let valueArray ="";
    body.map((answer) => valueArray += '(1, 1, ' + answer.categoryId +", '" + answer.input  + "'),");

    const query = 'INSERT INTO answers (gameId, userId, categoryId, input) VALUES '+valueArray.slice(0, valueArray.length - 1)+";"
    console.log('query', query);
    await client.query(query, (err, res) => {
      if (err) throw err;
      client.end();
    });
  }
}