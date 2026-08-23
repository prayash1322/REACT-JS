import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { ExternalLink } from 'lucide-react'

function ProjectCard({ index, title, description, tags, image, link }) {
  return (
    <div className="project-card d-flex flex-column h-100">
      <div style={{ borderBottom: '2px solid var(--color-border)' }}>
        <LazyLoadImage
          src={image}
          alt={`${title} preview`}
          effect="opacity"
          width="100%"
          height="auto"
          style={{ display: 'block', width: '100%' }}
        />
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1">
        <h3 className="h4 text-uppercase fw-bold mb-2">{title}</h3>
        <p className="project-card-muted-text flex-grow-1">{description}</p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="custom-button custom-button-outline align-self-start"
        >
          View Project
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
