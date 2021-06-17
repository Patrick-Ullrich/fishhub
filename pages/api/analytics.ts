import { connectToDatabase } from "../../util/mongodb";

const analytics = async (req: any, res: any) => {
  const { db } = await connectToDatabase();
  const { event } = JSON.parse(req.body);

  try {
    await db.collection("events").insertOne({ event, datetime: new Date() });
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }

  res.setHeader("Content-Type", "application/json");
  return res.status(204).json({ error: "" });
};

export default analytics;
