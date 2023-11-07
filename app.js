const express = require("express");
const recipeRoutes = require("./routes/recipeRoute");
const commentRoutes = require("./routes/commentRoute");
const userRoutes = require("./routes/userRoute");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe", recipeRoutes);
app.use("/comment", commentRoutes);
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
