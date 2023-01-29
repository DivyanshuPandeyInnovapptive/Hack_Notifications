import express from "express";
import dynamo from "./dynamo";
const app = express();
app.use(express.json());

app.get("/notification/", async (req, res) => {
  res.json(await dynamo.getNotifications());
});

app.post("/notification/", async (req, res) => {
  try {
    const data = await dynamo.createorUpdateNotification(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/notification/:id", async (req, res) => {
  try {
    const data = await dynamo.getNotificationById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/notification/:id", async (req, res) => {
  try {
    await dynamo.deleteNotificationById(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is runnig on post ${port}`);
});
