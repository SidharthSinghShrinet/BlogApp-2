import connectDB from "@/config/database";
import sessionCollection from "@/model/session.model";
import jwt from "jsonwebtoken";
export async function getAuthUser(token) {
  await connectDB();
  const { sessionId } = jwt.decode(token);
  // console.log("Decoded Token:", sessionId);
  const { userId } = await sessionCollection.findOne({ sessionId });
  // console.log("Decoded Session:", userId);
  return userId;
}
