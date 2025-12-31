import { Link } from 'react-router-dom'
import './Blog.css'
import blogPostsData from '../data/blogPosts.json'

function Blog() {
  const blogPosts = blogPostsData

  return (
    <div className="blog">
      <section className="blog-hero section">
        <div className="container">
          <h1 className="fade-in">Blog</h1>
          <p className="blog-subtitle">
            Compartiendo mi aprendizaje y experiencias en desarrollo web
          </p>
        </div>
      </section>

      <section className="blog-content section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card card fade-in">
                <div className="blog-card-image">
                  <span>{post.image}</span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h2>
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-footer">
                    <span className="read-time">{post.readTime}</span>
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
