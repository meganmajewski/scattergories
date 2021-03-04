const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://hixfdpwggzhmyu:dac4a473157d86999bc9df29275e1e88e8625bf2b5c5ec0674e6b11ae93832f8@ec2-18-207-95-219.compute-1.amazonaws.com:5432/d7tdhnm9r6i63p",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
module.exports = {
  getAllAnswers: async () => {
    const response = await client.query('SELECT * FROM answers');
    return { results: response ? response.rows : null };
  },
  addAnswers: async (body) => {
    let valueArray ="";
    body.map((answer) => valueArray += 
        "('"+ answer.gameid + "', '"+ answer.userId + "'," + answer.categoryId +", '" + answer.input  + "'),");

    console.log(valueArray);
    const query = 'INSERT INTO answers (gameId, userId, categoryId, input) VALUES '
      + valueArray.slice(0, valueArray.length - 1)+";"

    await client.query(query, (err, res) => {
      if (err) throw err;
    });
  },
  getLetter: async ()=> {
    const query = 'SELECT * FROM letter LIMIT 1';
    const response = await client.query(query);
    return response;
  },
  addLetter: async(body)=> {
    const query = "INSERT INTO letters (letter) VALUES ( '" + body.letter + "');"
    await client.query(query, (err, res) => {
      if (err) throw err;
    });
  }
}