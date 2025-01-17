import React, { useReducer } from "react";
import { blogData } from "../../Data/blogData";

const initialState = {
  open: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_BLOG":
      return {
        ...state,
        open: {
          ...!state.open,
          [action.payload.blogId]: !state.open[action.payload.blogId],
        },
      };
    default:
      return state;
  }
};

const Blogs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BlogData = blogData;

  const toggleBlog = (blog) => {
    dispatch({
      type: "TOGGLE_BLOG",
      payload: {
        blogId: blog.id,
      },
    });
  };

  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-y-scroll select-none bg-gray-100">
      <div className="w-full flex flex-col items-center my-5 gap-10 h-fit">
        {BlogData.map((blog, i) => {
          const isOpen = state.open[blog.id] || false;

          return (
            <div key={i} className="w-full flex flex-col items-center gap-4">
              <section
                onClick={() => toggleBlog(blog)}
                key={i}
                className={`w-[90%] lg:w-[65%] bg-white shadow-lg rounded-lg p-6 transform duration-300 ease-in-out cursor-pointer ${
                  isOpen
                    ? "max-h-full scale-105"
                    : "max-h-[6rem] overflow-hidden"
                }`}
              >
                <p className="text-3xl mb-4 font-semibold text-gray-800">
                  {blog.title}
                </p>
                {isOpen && (
                  <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div>
                      <p className="text-xl text-gray-600">{blog.content}</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
