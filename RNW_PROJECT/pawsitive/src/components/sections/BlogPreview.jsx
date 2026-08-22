import { User, MessageSquare, Folder, PawPrint } from 'lucide-react'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import postOne from '../../assets/images/post_01.jpg'
import postTwo from '../../assets/images/post_02.jpg'
import postThree from '../../assets/images/post_03.jpg'

const blogPosts = [
  {
    image: postOne,
    day: '10',
    month: 'JUL',
    color: 'peach',
    author: 'BoldThemes',
    comments: 2,
    category: 'Grooming',
    title: "Tips and tricks: Puppy's First Grooming",
    excerpt: 'Collaboratively administrate empowered markets via plug-and-play networks....',
  },
  {
    image: postTwo,
    day: '10',
    month: 'JUL',
    color: 'mint',
    author: 'BoldThemes',
    comments: 3,
    category: 'Cats',
    title: 'Cat Health – Keeping Them Purr-fect',
    excerpt: 'Holistically pontificate installed base portals after maintainable products....',
  },
  {
    image: postThree,
    day: '10',
    month: 'JUL',
    color: 'yellow',
    author: 'BoldThemes',
    comments: 1,
    category: 'Dogs',
    title: '14 Foods You Can Share with Your Dog',
    excerpt: 'Collaboratively administrate turnkey channels whereas virtual e-tailers....',
  },
]

function BlogPreview() {
  return (
    <section className="section blog" id="journal">
      <div className="container">
        <SectionHeading eyebrow="PET CARE BLOG" title="Latest News" />
        <div className="row blog-grid">
          {blogPosts.map((post) => (
            <div className="col-12 col-sm-6 col-lg-4" key={post.title}>
              <Card className="blog-item">
                <div className="blog-item-img-wrap">
                  <div className="blog-item-img">
                    <img loading="lazy" src={post.image} alt={post.title} />
                    <div className={`blog-item-badge blog-item-badge--${post.color}`}>
                      <PawPrint className="blog-badge-paw" size={16} />
                      <b className="blog-badge-day">{post.day}</b>
                      <span className="blog-badge-month">{post.month}</span>
                    </div>
                  </div>
                </div>
                <div className="blog-item-body">
                  <div className="blog-item-meta">
                    <span className="blog-meta-item">
                      <User size={13} className="blog-meta-icon" />
                      by {post.author}
                    </span>
                    <span className="blog-meta-item">
                      <MessageSquare size={13} className="blog-meta-icon" />
                      {post.comments}
                    </span>
                    <span className="blog-meta-item">
                      <Folder size={13} className="blog-meta-icon" />
                      {post.category}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview

