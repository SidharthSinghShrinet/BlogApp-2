"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogtitle, setBlogtitle] = useState("");
  const [blogdescription, setBlogdescription] = useState("");
  const [open, setOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  async function handleBlog(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, description } = Object.fromEntries(formData.entries());
    const response = await fetch("/api/blogs/addblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    // console.log(response);
    const { newBlog } = await response.json();
    setAllBlogs([...allBlogs, newBlog]);
  }

  async function handleLogout() {
    // console.log("Logout Button is Clicked");
    const response = await fetch("/api/users/logout");
    if (response.ok) {
      // console.log("Logged out successfully");
      router.push("/login");
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/blogs/deleteBlog/${id}`, {
      method: "DELETE",
    });
    // console.log(response);
    const { blogs } = await response.json();
    setAllBlogs(blogs);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, description } = Object.fromEntries(formData.entries());
    const response = await fetch(`/api/blogs/updateblog/${editBlogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify({ title, description }),
    });
    // console.log(response);
    const { blogs } = await response.json();
    setAllBlogs(blogs);
    setOpen(false);
    setBlogtitle("");
    setBlogdescription("");
  }

  function handleEdit(id) {
    setOpen(!open);
    const blog = allBlogs.filter((ele) => ele._id === id);
    setBlogtitle(blog[0].title);
    setBlogdescription(blog[0].description);
    setEditBlogId(id);
  }
  useEffect(() => {
    async function getAllBlogs() {
      const response = await fetch("/api/blogs/findblogs", {
        method: "GET",
      });
      const { blogs } = await response.json();
      setAllBlogs(blogs);
    }
    getAllBlogs();
  }, []);
  return (
    <div className="relative h-fit p-5 w-full flex flex-col justify-center gap-20 items-center bg-gray-200 text-black">
      <div className="w-full">
        <button
          onClick={handleLogout}
          className="text-2xl rounded-2xl border bg-red-600 text-white p-2 font-bold"
        >
          Logout
        </button>
      </div>
      <div className="w-[75%] h-fit flex flex-col justify-center p-5 bg-white rounded-4xl shadow-2xl items-center gap-5">
        <h1 className="text-4xl font-bold">Blog Application</h1>
        <form
          onSubmit={handleBlog}
          className="flex flex-col w-full justify-center items-center"
        >
          <label htmlFor="title" className="text-2xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your title..."
            className="border w-[50%] h-10 text-xl px-2 tracking-wider font-bold text-gray-600"
          />
          <br />
          <label htmlFor="description" className="text-2xl">
            Description
          </label>
          <input
            placeholder="Enter your description..."
            name="description"
            id="description"
            type="text"
            className="border w-[50%] h-10 text-xl px-2 tracking-wider font-bold text-gray-600"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 text-xl rounded-2xl bg-black text-white"
          >
            Add
          </button>
        </form>
      </div>
      {open && (
        <div className="absolute top-[19%] w-[75%] h-fit flex flex-col justify-center p-5 bg-white rounded-4xl shadow-2xl items-center gap-5">
          <h1 className="text-4xl font-bold">Update Application</h1>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col w-full justify-center items-center"
          >
            <label htmlFor="title" className="text-2xl">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogtitle}
              onChange={(e) => setBlogtitle(e.target.value)}
              placeholder="Enter your title..."
              className="border w-[50%] h-10 text-xl px-2 tracking-wider font-bold text-gray-600"
            />
            <br />
            <label htmlFor="description" className="text-2xl">
              Description
            </label>
            <input
              placeholder="Enter your description..."
              name="description"
              value={blogdescription}
              onChange={(e) => setBlogdescription(e.target.value)}
              id="description"
              type="text"
              className="border w-[50%] h-10 text-xl px-2 tracking-wider font-bold text-gray-600"
            />
            <br />
            <button
              type="submit"
              className="px-4 py-2 text-xl rounded-2xl bg-black text-white"
            >
              Update
            </button>
          </form>
        </div>
      )}
      <div className="w-[75%] h-fit flex flex-col justify-center p-5 bg-white rounded-4xl shadow-2xl items-center gap-5">
        <h1 className="text-4xl font-bold">Blogs List</h1>
        <div className="w-full">
          <div className="w-full grid grid-cols-3">
            <p className="text-2xl font-semibold">Title</p>
            <p className="text-2xl font-semibold">Description</p>
            <p className="text-2xl font-semibold">Action</p>
          </div>
          <div className="w-full">
            {allBlogs?.length === 0 ? (
              <p>No Blogs Available</p>
            ) : (
              allBlogs?.map((blog) => (
                <div key={blog._id} className="w-full p-2 grid grid-cols-3">
                  <p className="text-lg font-mono">{blog.title}</p>
                  <p className="text-lg font-mono">{blog.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="text-lg bg-green-400 font-mono px-2 text-white rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-lg bg-red-600 text-white font-mono px-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
