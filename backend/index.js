
const express = require('express');
const DataBaseConnect = require('./config/dbConnection');
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const servicesRoute = require('./routes/servicesRoute')
const paymentRoute = require('./routes/paymentRoute')
const path = require('path'); // Add this line

// ==make app==
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;


// =====database connection=====
DataBaseConnect.dbConnection();
app.use(cors());


// ======middleware===== 
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname,"./client-eccom/build")))


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/services', servicesRoute);
app.use('/api/v1/payment',paymentRoute);

// app.get('*', function(_, res){
//     res.sendFile(path.resolve(__dirname,"client-eccom","build","index.html"));
// });

// for deployment
const __dirName = path.resolve();
// get the current working directory's parent directory
const rootDir = path.resolve(__dirName, ".");
console.log(rootDir);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "/client-eccom/build")));
  app.get("*", (req, res) => {
    console.log(__dirName);
    res.sendFile(path.resolve(rootDir, "client-eccom", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("The server is running in development mode.")
  })
}

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
// app.get('/', (req, res) => {
//     res.send(
//         "welcome to my abhishek gautam"
//     );
// });
