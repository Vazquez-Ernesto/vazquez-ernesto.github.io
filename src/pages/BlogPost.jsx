import { useParams, Link } from 'react-router-dom'
import './BlogPost.css'
import blogPostsData from '../data/blogPosts.json'

function BlogPost() {
  const { id } = useParams()

  // Cargar posts desde archivo JSON
  const blogPosts = blogPostsData

  // Buscar el post por ID
  const post = blogPosts.find(p => p.id === parseInt(id))

  // Función para compartir en LinkedIn
  const shareOnLinkedIn = () => {
    const url = window.location.href
    const title = post.title
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=600')
  }

  // Si no se encuentra el post, mostrar error
  if (!post) {
    return (
      <div className="blog-post">
        <div className="container">
          <h1>Post no encontrado</h1>
          <Link to="/blog" className="btn">← Volver al Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post">
      <div className="blog-post-hero">
        <div className="container">
          <Link to="/blog" className="back-link">
            ← Volver al Blog
          </Link>
          <div className="post-header">
            <span className="post-category">{post.category}</span>
            <h1 className="fade-in">{post.title}</h1>
            <div className="post-meta">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="blog-post-content section">
        <div className="container">
          <div className="post-image">
            <span>{post.image}</span>
          </div>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Botones para compartir en redes sociales */}
          <div className="social-share">
            <h3>Compartir este artículo</h3>
            <button 
              onClick={shareOnLinkedIn} 
              className="btn-linkedin"
              title="Compartir en LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              Compartir en LinkedIn
            </button>
            <p className="share-note">
              🎯 Al compartir en LinkedIn, podrás agregar tus comentarios y tu red podrá reaccionar y comentar
            </p>
          </div>

          <div className="post-footer">
            <Link to="/blog" className="btn btn-secondary">
              ← Volver al Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost