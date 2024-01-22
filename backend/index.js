const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const cors = require("cors")

app.use(cors())

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.json())
app.use("/admin", adminRouter)
app.use("/user", userRouter)


app.get('/',(req,res)=>{
    res.send("backend is working fine")
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
     