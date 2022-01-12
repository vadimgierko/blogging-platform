import { useDatabase } from "../hooks/use-database";
import convertTitleIntoLink from "../functions/convertTitleIntoLink";
import Form from "./organisms/Form";
import { CREATE_BLOG } from "../initial-data/form-structure-templates";

export default function CreateBlogForm() {

    const { addBlog } = useDatabase();

    function handleSubmit(blog) {
        if (
            blog.title.replace(/\s/g, '').length &&
            blog.description.replace(/\s/g, '').length
        ) {
            const blogLink = convertTitleIntoLink(blog.title);
            const newBlogDataWithLink = {
                ...blog,
                blogLink: blogLink
            }
            addBlog(newBlogDataWithLink);
        } else {
            alert("You need to complete all input fields (not only white spaces...) to create new blog... Try again!");
        }  
    }

    return (
        <div className="create-blog-section container">
            <h1>Create new blog!</h1>
            <hr />
            <Form
                structure={CREATE_BLOG}
                text="create blog"
                to="/dashboard/user-blogs"
                formClassname="create-blog-form"
                onSubmit={handleSubmit}
            />            
        </div>
    );
}