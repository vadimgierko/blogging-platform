import ReactMarkdown from "react-markdown";
import { useState } from "react";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor({ content }) {
    //console.log("content passed for edition:", content);
    
    const [contentForEdition, setContentForEdition] = useState(content);

    return (
        <div>
            <h1>Markdown Editor</h1>
            <hr />
            <div className="row">
                <div className="col-lg mt-2 mx-2" style={{marginBottom: 90}}>
                    <p className="text-center">Write your content here using Markdown Syntax</p>
                    <hr />
                    <textarea
                        defaultValue={contentForEdition}
                        onChange={(e) => setContentForEdition(e.target.value)}
                        style={{width: "100%", height: "80%"}}
                    />
                    <button
                        type="button"
                        className="btn btn-success my-2"
                        onClick={() => console.log(contentForEdition)}
                    >Save changes</button>
                </div>
                <div className="col-lg m-2">
                    <p className="text-center">Here you can see how your article would be looking like</p>
                    <hr />
                    <div>
                        <ReactMarkdown children={contentForEdition} remarkPlugins={[remarkGfm]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
# Finally I'm used!

Finally this markdown editor will be used in real-life project - Blogging Platform!

I've made it separately a few days ago & now I can use this extra feature to let my users:

- create articles
- edit them
- and format text whatever they like!
*/