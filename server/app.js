import express from "express"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
import router from "./router.js"
import conn from "./connection.js"

dotenv.config();

const app= express();

app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use("/api", router);
app.use(express.static("/dist"));

app.get("/",(req, res) => {
    return res.sendFile(path.resolve("./dist/index.html"));
})


conn().then(() => {  

    app.listen(process.env.VITE_PORT, () => {
        console.log("started");
    });
})



