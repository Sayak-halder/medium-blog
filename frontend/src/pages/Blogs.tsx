import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const {loading,blogs}=useBlogs();

  if(loading){
    return <div>
      loading...
    </div>
  }

  return (<div>
      <Appbar/>
    <div className="flex justify-center">
      <div>
        {blogs.map(blog=><BlogCard
          id={blog.id}
          title={blog.title}
          authorName={blog.author.name||"Anonymous"}
          content={blog.content}
           publishedDate={"13 June"}
        />)}
      </div>
    </div>
    </div>
  );
};

export default Blogs;
