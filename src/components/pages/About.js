// import { useEffect } from "react";
// import { database } from "../../firebase";
// import { useArticle } from "../../hooks/use-article";

// import {
//     ref,
//     set,
//     push,
//     child,
//     //update,
//     onValue,
//     remove,
//     //query,
//     //limitToFirst
// } from "firebase/database";

export default function About() {

    // const { deleteArticle, addArticle } = useArticle();

    // useEffect(() => {
    //     console.log("fetch");
    //     onValue(ref(database, "blogs/"), snapshot => {
    //         if (snapshot) {
    //             console.log(snapshot.val());
    //         }
    //     });
    //     //articleKey, title, link, blogKey
    //     deleteArticle("-Mtte3InA9O8p8rG2VKE", "Test EDITED", "test-edited", "-MtYRswcLW0tm4F2dcRL");
    // }, []);

    return (
        <article className="about-page">
            <h1>What you can do with Blogging Platform</h1>
            <hr />
            <p style={{color: "red"}}>NOTE: I'm currently updating the app according to new database structure & security rules, so some of features, like: delete an account & update user data are off for a few days...</p>
            <ul>
                <li>create & run your blog (or many blogs) after creating a free user account</li>
                <li>write & edit your articles with simple & intuitive <a href="https://vadimgierko.github.io/markdown-text-editor/" rel="noreferrer" target="_blank">markdown text editor</a>, which was also created by myself</li>
                <li>read published blogs without authentication</li>
            </ul>
            <p>Blogging Platform is a responsive full-stack single-page application, which supports all kinds of CRUD features, in which I have used all of my previous knowledge and skills in the field of front-end development (React, Bootstrap) and realtime database integration (Firebase).</p>
            <h3>Technologies used in Blogging Platform development</h3>
            <hr />
            <ul>
                <li>React 17</li>
                <li>React Router 5.2 (HashRouter, dynamic & nested routing)</li>
                <li>React Context</li>
                <li>React Markdown 7 & remark-gfm</li>
                <li>Firebase 9.1 (auth, realtime database, security rules)</li>
                <li>Bootstrap 5.1</li>
                <li>Bootswatch 5.1</li>
                <li>GitHub Pages 3.2</li>
                <li>Atomic Web Design</li>
            </ul>
        </article>
    );
}