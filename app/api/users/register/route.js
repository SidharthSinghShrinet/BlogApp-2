import connectDB from "@/config/database";
import userCollection from "@/model/user.model";

export async function POST(request) {
  await connectDB();
  const { username, email, password } = await request.json();
  const newUser = await userCollection.create({
    username,
    email,
    password,
  });
  if (!newUser) {
    return new Response(
      { error: "User registration failed" },
      {
        status: 400,
      }
    );
  }
  return new Response(JSON.stringify(newUser), { status: 201 });
}
