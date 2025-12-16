import { cookies } from "next/headers";
export async function GET() {
  const cookieStore = await cookies();
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
