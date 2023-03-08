const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const puerto = 8000;

require('./config/mongoose.config');
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:3000", exposedHeaders: ["set-cookie"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);

app.listen(puerto, () => {
    console.log("Listening at Port " + puerto)
});