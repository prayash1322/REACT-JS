import BoardingSection from './BoardingSection'

function CatBoarding() {
  return <BoardingSection tone="cat" title="Cat Boarding" image="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85" imageAlt="Grey cat sitting calmly" text="Our quiet cat suites are designed for gentle naps, curious play, and plenty of one-to-one affection." activities={[{ icon: '◉', name: 'Eat' }, { icon: '◯', name: 'Play' }, { icon: '☾', name: 'Sleep' }]} />
}

export default CatBoarding
