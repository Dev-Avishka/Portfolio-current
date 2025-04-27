import { useState, useEffect, JSX } from 'react'
import './styles/app.universal.css'
import './styles/blog.css'

// Define types for our blog content
interface BlogContentItem {
  type: 'divider' | 'image' | 'heading1' | 'heading2' | 'paragraph' | 'bulletPoint';
  text?: string;
  src?: string;
  formattedText?: React.ReactNode;
}

interface ParsedBlog {
  title: string;
  subtitle: string;
  content: BlogContentItem[];
}

interface LoadedBlog {
  filename: string;
  content: ParsedBlog;
}

export default function Blog() {
    const [blogs, setBlogList] = useState<string[]>([]);
    const [loadedBlogs, setLoadedBlogs] = useState<LoadedBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedBlog, setSelectedBlog] = useState<LoadedBlog | null>(null);

    // Load the blog list from blogs.json
    useEffect(() => {
        async function fetchBlogList() {
            try {
                const response = await fetch('/blog/blogs.json');
                const data = await response.json();
                setBlogList(data);
            } catch (error) {
                console.error('Error loading blog list:', error);
                setBlogList([]);
            }
        }
        
        fetchBlogList();
    }, []);

    // Load individual blog content when the blog list changes
    useEffect(() => {
        async function loadBlogContent() {
            if (blogs.length === 0) return;
            
            setLoading(true);
            const blogContents: LoadedBlog[] = [];
            
            for (const blogFile of blogs) {
                try {
                    const response = await fetch(`/blog/${blogFile}`);
                    const content = await response.text();
                    blogContents.push({
                        filename: blogFile,
                        content: parseBlogContent(content)
                    });
                } catch (error) {
                    console.error(`Error loading blog ${blogFile}:`, error);
                }
            }
            
            setLoadedBlogs(blogContents);
            setLoading(false);
        }
        
        loadBlogContent();
    }, [blogs]);

    // Process text to format [b] tags as bold
    const formatBoldText = (text: string): React.ReactNode => {
        const parts = text.split(/(\[b\].*?\[b\])/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('[b]') && part.endsWith('[b]')) {
                // Extract the content between [b] tags and make it bold
                const boldContent = part.substring(3, part.length - 3);
                return <strong key={index} className="blog-bold">{boldContent}</strong>;
            }
            return part;
        });
    };

    // Parse blog content according to the specified format
    function parseBlogContent(content: string): ParsedBlog {
        const lines = content.split('\n');
        const parsed: ParsedBlog = {
            title: '',
            subtitle: '',
            content: []
        };
        
        lines.forEach(line => {
            if (line.startsWith('!')) {
                parsed.title = line.substring(1).trim();
            } else if (line.startsWith('$')) {
                parsed.subtitle = line.substring(1).trim();
            } else if (line === '*') {
                parsed.content.push({ type: 'divider' });
            } else if (line.startsWith('@')) {
                const imageName = line.substring(1).trim();
                parsed.content.push({ 
                    type: 'image', 
                    src: `/blog/imgs/${imageName}` 
                });
            } else if (line.startsWith('##')) {
                const text = line.substring(2).trim();
                parsed.content.push({ 
                    type: 'heading2', 
                    text: text,
                    formattedText: formatBoldText(text)
                });
            } else if (line.startsWith('#')) {
                const text = line.substring(1).trim();
                parsed.content.push({ 
                    type: 'heading1', 
                    text: text,
                    formattedText: formatBoldText(text)
                });
            } else if (line.startsWith('-')) {
                const text = line.substring(1).trim();
                parsed.content.push({ 
                    type: 'bulletPoint', 
                    text: text,
                    formattedText: formatBoldText(text)
                });
            } else if (line.trim() !== '') {
                const text = line.trim();
                parsed.content.push({ 
                    type: 'paragraph', 
                    text: text,
                    formattedText: formatBoldText(text)
                });
            }
        });
        
        return parsed;
    }

    // Render blog content elements
    // function renderBlogContent(blogContent: ParsedBlog) {
    //     return blogContent.content.map((item, index) => {
    //         switch (item.type) {
    //             case 'divider':
    //                 return <hr key={index} className="blog-divider" />;
    //             case 'image':
    //                 return (
    //                     <div key={index} className="blog-image-container">
    //                         <img src={item.src} alt="Blog illustration" className="blog-image" />
    //                     </div>
    //                 );
    //             case 'heading1':
    //                 return <h1 key={index} className="blog-heading-1">{item.formattedText || item.text}</h1>;
    //             case 'heading2':
    //                 return <h2 key={index} className="blog-heading-2">{item.formattedText || item.text}</h2>;
    //             case 'paragraph':
    //                 return <p key={index} className="blog-paragraph">{item.formattedText || item.text}</p>;
    //             case 'bulletPoint':
    //                 return <li key={index} className="blog-bullet-point">{item.formattedText || item.text}</li>;
    //             default:
    //                 return null;
    //         }
    //     });
    // }

    // Organize blog content in proper list structures
    function organizeContent(blogContent: ParsedBlog) {
        let result: JSX.Element[] = [];
        let currentList: JSX.Element[] = [];
        let inList = false;
        
        blogContent.content.forEach((item, index) => {
            if (item.type === 'bulletPoint') {
                if (!inList) {
                    inList = true;
                    currentList = [];
                }
                currentList.push(
                    <li key={`bullet-${index}`} className="blog-bullet-point">
                        {item.formattedText || item.text}
                    </li>
                );
            } else {
                if (inList) {
                    result.push(
                        <ul key={`list-${index}`} className="blog-bullet-list">
                            {currentList}
                        </ul>
                    );
                    inList = false;
                }
                
                switch (item.type) {
                    case 'divider':
                        result.push(<hr key={`content-${index}`} className="blog-divider" />);
                        break;
                    case 'image':
                        result.push(
                            <div key={`content-${index}`} className="blog-image-container">
                                <img src={item.src} alt="Blog illustration" className="blog-image" />
                            </div>
                        );
                        break;
                    case 'heading1':
                        result.push(<h1 key={`content-${index}`} className="blog-heading-1">{item.formattedText || item.text}</h1>);
                        break;
                    case 'heading2':
                        result.push(<h2 key={`content-${index}`} className="blog-heading-2">{item.formattedText || item.text}</h2>);
                        break;
                    case 'paragraph':
                        result.push(<p key={`content-${index}`} className="blog-paragraph">{item.formattedText || item.text}</p>);
                        break;
                }
            }
        });
        
        // If we ended with a list, add it to the result
        if (inList) {
            result.push(
                <ul key="final-list" className="blog-bullet-list">
                    {currentList}
                </ul>
            );
        }
        
        return result;
    }

    // Handle clicking on a blog to view it
    const handleBlogClick = (blog: LoadedBlog) => {
        setSelectedBlog(blog);
        window.scrollTo(0, 0);
    };

    // Handle going back to the blog list
    const handleBackClick = () => {
        setSelectedBlog(null);
    };

    // Render blog list
    const renderBlogList = () => {
        return loadedBlogs.map((blog, index) => (
            <div 
                key={index} 
                className="blog-preview" 
                onClick={() => handleBlogClick(blog)}
            >
                <h2 className="preview-title">{blog.content.title}</h2>
                {blog.content.subtitle && (
                    <p className="preview-subtitle">{blog.content.subtitle}</p>
                )}
                <div className="read-more">Read more →</div>
            </div>
        ));
    };

    if (loading && blogs.length > 0) {
        return (
            <div className="app">
                <div className="blog-container">
                    <div className="loading-blogs">Loading blogs...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="blog-container">
                {selectedBlog ? (
                    <>
                        <button onClick={handleBackClick} className="back-button">
                            ← Back to blogs
                        </button>
                        <article className="blog-post">
                            <header className="blog-header">
                                <h1 className="blog-title">{selectedBlog.content.title}</h1>
                                {selectedBlog.content.subtitle && (
                                    <h2 className="blog-subtitle">{selectedBlog.content.subtitle}</h2>
                                )}
                            </header>
                            <div className="blog-body">
                                {organizeContent(selectedBlog.content)}
                            </div>
                        </article>
                    </>
                ) : (
                    <>
                        <h1 className="blogs-main-title">Blog Posts</h1>
                        {loadedBlogs.length === 0 ? (
                            <div className="no-blogs">No blogs found</div>
                        ) : (
                            <div className="blog-list">
                                {renderBlogList()}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}