import { cookies } from "next/headers";
import sessionCollection from "@/model/session.model";
import jwt from "jsonwebtoken";
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { sessionId } = jwt.decode(token);
  await sessionCollection.findOneAndDelete({ sessionId });
  cookieStore.delete("token");
  const response = {
    success: true,
    message: "User logged out successfully",
  };
  return Response.json(response, {
    status: 200,
    statusText: "Delete Hogaya Bhai",
  });
}
