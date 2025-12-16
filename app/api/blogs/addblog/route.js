import { getAuthUser } from "@/libs/auth";
import blogCollection from "@/model/blog.model";
import { cookies } from "next/headers";
export async function POST(request) {
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
  const { title, description } = await request.json();
  const newBlog = await blogCollection.create({ title, description, userId });
  if (!newBlog) {
    return Response.json({
      error: "Blog creation failed...",
    });
  }
  return Response.json({
    success: true,
    message: "Blog created successfully",
    newBlog,
  });
}
