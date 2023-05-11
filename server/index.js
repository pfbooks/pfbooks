const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const loadDataFromApi = require("./src/dbload/loadDataBase");

conn.sync({ alter: true })
    .then(() => {
        server.listen(3001, () => {
            console.log('server listening at 3001');
        });
    })
    .then(() => {
        loadDataFromApi();
    });

