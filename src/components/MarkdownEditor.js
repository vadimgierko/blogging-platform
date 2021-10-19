import ReactMarkdown from "react-markdown";
import { useState } from "react";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor({ articleData, setArticleData }) {
    //console.log("content passed for edition:", content);
    
    //const [contentForEdition, setContentForEdition] = useState(articleData.content);

    return (
        <div className="row">
            <div className="col-lg mt-2 mx-2" style={{marginBottom: 90}}>
                <p className="text-center">Write your content here using Markdown Syntax</p>
                <hr />
                <textarea
                    defaultValue={articleData.content}
                    onChange={(e) => setArticleData({...articleData, content: e.target.value})}
                    style={{width: "100%", height: "80%"}}
                />
            </div>
            <div className="col-lg m-2">
                <p className="text-center">Here you can see how your article would be looking like</p>
                <hr />
                <div>
                    <ReactMarkdown children={articleData.content} remarkPlugins={[remarkGfm]} />
                </div>
            </div>
        </div>
    );
}

/*
<button
                    type="button"
                    className="btn btn-success my-2"
                    onClick={() => console.log(contentForEdition)}
                >Save changes</button>
                */

/*
# Finally I'm used!

Finally this markdown editor will be used in real-life project - Blogging Platform!

I've made it separately a few days ago & now I can use this extra feature to let my users:

- create articles
- edit them
- and format text whatever they like!
*/