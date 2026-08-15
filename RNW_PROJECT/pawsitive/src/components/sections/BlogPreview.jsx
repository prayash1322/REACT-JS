import blogPosts from '../../data/blogPosts'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

function BlogPreview() {
  return (
    <section className="section blog-section" id="journal">
      <div className="container">
        <SectionHeading eyebrow="PET CARE BLOG" title="Latest News" />
        <div className="row blog-cards">
          {blogPosts.map((post) => (
            <div className="col-12 col-sm-6 col-lg-4" key={post.title}>
              <Card className="blog-card">
                <div className="blog-card__image"><img loading="lazy" src={post.image} alt="" /><span className="blog-card__date"><b>{post.day}</b>{post.month}</span></div>
                <div className="blog-card__content"><span className="blog-card__category">{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><a href="#journal">Read article →</a></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
