const app = require('express')();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI);


app.use(express.static(path.join(__dirname, 'views')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


require('./routes/routes.js')(app);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`); // Good to go!
});
