const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const appRoute = require("./routes/routes");
const variables = require("./localConfig.js");


const PORT =  variables.PORT || 6666;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


mongoose
 .connect(variables.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true })
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/", appRoute);

app.get("/", (req, res) => {
    res.status(200).json("server is running");
})



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})