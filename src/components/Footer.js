export default function Footer() {
    return (
        <p className="text-muted">
            <a
                className="nav-link text-center mb-3"
                href="https://github.com/vadimgierko/blogging-platform"
                target="_blank"
                rel="noreferrer"
                style={{display: "inline"}}
            >Blogging Platform</a>
            & 
            <a
                className="nav-link text-center mb-3"
                href="https://github.com/vadimgierko/markdown-text-editor"
                target="_blank"
                rel="noreferrer"
                style={{display: "inline"}}
            >Markdown Editor</a>
            created by
            <a
                className="nav-link text-center mb-3"
                href="https://github.com/vadimgierko"
                target="_blank"
                rel="noreferrer"
                style={{display: "inline"}}
            >Vadim Gierko</a>
            | 2021
        </p>
    );
}