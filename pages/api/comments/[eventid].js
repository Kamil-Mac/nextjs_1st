import {
  connectDB,
  insertDocument,
  getAllDocuments,
} from "../../helpers/db-util";

const handler = (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = connectDB();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the db failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalide input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Success, signed up!", comment: newComment });

    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  }

  if (req.method === "GET") {
    let documents;

    try {
      documents = getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  }

  client.close();
};
export default handler;
