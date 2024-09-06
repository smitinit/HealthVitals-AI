import React, { useReducer } from "react";
import { blogData } from "../../Data/blogData";
import image from "../../assets/Images/no-image-blog.jpg";
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
    <div className="w-full h-[calc(100vh-120px)] overflow-y-scroll select-none">
      <div className="w-full flex flex-col items-center my-5 gap-10 h-fit">
        {BlogData.map((blog, i) => {
          const isOpen = state.open[blog.id] || false;

          return (
            <div className="w-full flex flex-col items-center gap-2">
              <section
                onClick={() => toggleBlog(blog)}
                key={i}
                className={
                  isOpen
                    ? "w-[90%]  bg-slate-50 overflow-hidden text-ellipsis justify-center flex flex-col items-center h-fit  p-6 shadow-lg rounded-lg ease-in-out duration-700 cursor-pointer "
                    : "w-[90%] lg:w-[65%] overflow-hidden text-ellipsis lg:h-[50vh] h-[30vh]  duration-300 bg-slate-50 p-6 shadow-lg rounded-lg ease-in cursor-pointer"
                }
              >
                <p className="text-3xl mb-6">{blog.title}</p>
                <div className="w-full h-full flex gap-5 flex-col lg:flex-row ">
                  <div>
                    <p className="text-xl ">{blog.content}</p>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
