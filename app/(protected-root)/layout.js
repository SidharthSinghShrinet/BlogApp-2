import { cookies } from "next/headers";
import sessionCollection from "@/model/session.model";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
export default async function ProtectedRootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  const { sessionId } = jwt.decode(token);
  const session = await sessionCollection.findOne({ sessionId });
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
}
