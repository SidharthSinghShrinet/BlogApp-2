import { getAuthUser } from "@/libs/auth";
import blogCollection from "@/model/blog.model";
import { cookies } from "next/headers";
export async function PUT(request, context) {
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
  const { title, description } = await request.json();
  const { id } = await context.params;
  const blog = await blogCollection.findOne({ _id: id });
  if (!blog) {
    return Response.json({
      error: "No Blog Found",
    });
  }
  await blogCollection.updateOne(
    { _id: blog._id },
    {
      $set: {
        title,
        description,
      },
    }
  );
  const blogs = await blogCollection.find({ userId });
  return Response.json({
    success: true,
    message: "Blog updated successfully...",
    blogs,
  });
}
