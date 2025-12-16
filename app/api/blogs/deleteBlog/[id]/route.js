import { getAuthUser } from "@/libs/auth";
import blogCollection from "@/model/blog.model";
import { cookies } from "next/headers";
export async function DELETE(_, context) {
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
  const { id } = await context.params;
  const blog = await blogCollection.findOne({ _id: id, userId: userId });
  if (!blog) {
    return Response.json({
      error: "No Blogs Found",
    });
  }
  await blogCollection.deleteOne({ _id: blog._id });
  const blogs = await blogCollection.find({ userId });
  return Response.json({
    success: true,
    message: "Blog deleted successfully",
    blogs,
  });
}
