import connectDB from "@/config/database";
import { getAuthUser } from "@/libs/auth";
import blogCollection from "@/model/blog.model";
import { cookies } from "next/headers";
export async function GET() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    const response = {
      error: "Please login for Blog Creation!",
    };
    return Response.json(response, {
      status: 400,
    });
  }
  //   console.log("Token Details", token);
  const userId = await getAuthUser(token);
  //   console.log("User Details", userId);
  const blogs = await blogCollection.find({ userId });
  // console.log(blogs);
  if (blogs.length === 0) {
    return new Response({ error: "No blogs found" });
  }
  const response = {
    success: true,
    message: "All Blogs fetched successfully...",
    blogs,
  };
  return Response.json(response);
}
