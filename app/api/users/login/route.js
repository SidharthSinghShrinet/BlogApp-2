import connectDB from "@/config/database";
import sessionCollection from "@/model/session.model";
import userCollection from "@/model/user.model";
import generateJWTToken from "@/utils/jwt.utils";
import { cookies } from "next/headers";
export async function POST(request) {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = await request.json();
  const existingUser = await userCollection.findOne({ email: email });
  if (!existingUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }
  const isMatched = await existingUser.comparePassword(password);
  if (!isMatched) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }
  const sessionId = crypto.randomUUID();
  await sessionCollection.create({
    sessionId: sessionId,
    userId: existingUser._id,
    expiresAt: new Date(
      Date.now() + process.env.SESSION_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    userAgent: request.headers.get("user-agent") || "Unknown Agent",
    ip: request.headers.get("x-forwarded-for") || "Unknown IP",
  });
  const token = generateJWTToken(sessionId);
  // console.log("Generated Token:", token);
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
  });
  return new Response(
    JSON.stringify({
      success: true,
      message: "User logged in successfully",
      token: token,
    }),
    {
      status: 200,
      statusText: "Done Bro!",
    }
  );
}
