import BoardingSection from './BoardingSection'

function DogKennels() {
  return <BoardingSection tone="dog" reverse title="Dog Kennels" image="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=85" imageAlt="Dog resting on a sofa" text="For dogs who love a little more room to roam, our bright suites combine play, cosy rest, and lots of friendly company." activities={[{ icon: '◉', name: 'Eat' }, { icon: '◯', name: 'Play' }, { icon: '✦', name: 'Brush' }]} />
}

export default DogKennels
