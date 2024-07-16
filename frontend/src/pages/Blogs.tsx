import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const {loading,blogs}=useBlogs();

  if (loading) {
    return <div>
        <Appbar />
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
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
