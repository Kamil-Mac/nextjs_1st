import { connectDB, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid address" });
      return;
    }
    //mongoDB

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({message: 'Connecting to the db failed'})
      return;
    }

    try {
      await insertDocument(client, 'emails', { email });
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'})
      return;
    }

    res.status(201).json({ message: "Success, signed up!" });
  }
};
export default handler;
