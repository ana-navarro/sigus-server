const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const companyRoutes = require('./routes/companyRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const installationNumbersRoutes = require('./routes/installationNumberRoutes');
const creditRoutes = require('./routes/creditRoute');
const clientRoutes = require('./routes/clientRoutes');
const stripe = require('./routes/stripe');
const checklistRoutes = require('./routes/checklistRoutes');
const popRoutes = require('./routes/popRoutes');
const allowCors = require('./allowCors');
const path = require('path');

const app = express();

dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB is connected!');
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is running on ${process.env.PORT}`);
  connect();
});

app.use(cors());
app.use(allowCors());

// app.use(cors({ origin: true, credentials: true }));


app.use(express.json());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://181.215.134.184:5000',
    changeOrigin: true,
  })
);

//routes
app.use('/api/company', companyRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoute);
app.use('/api/installations_numbers/', installationNumbersRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/stripe', stripe);
app.use('/api/technical', checklistRoutes);
app.use('/api/pops', popRoutes);


app.use(express.static(path.join(__dirname, "./sigus-app/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../sigus-app/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

module.exports = app;