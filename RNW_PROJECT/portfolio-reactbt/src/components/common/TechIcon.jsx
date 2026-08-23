import { Atom, Layers, Cpu, Database, Table, Cylinder, Smartphone, Triangle } from 'lucide-react'

const lucideIcons = {
  Atom,
  Layers,
  Cpu,
  Database,
  Table,
  Cylinder,
  Smartphone,
  Triangle,
}

function TechIcon({ iconSet, icon, size = 28 }) {
  if (iconSet === 'bootstrap') {
    return <i className={`bi ${icon}`} style={{ fontSize: size }} />
  }

  const LucideIcon = lucideIcons[icon]

  if (!LucideIcon) {
    return null
  }

  return <LucideIcon size={size} strokeWidth={1.5} />
}

export default TechIcon
