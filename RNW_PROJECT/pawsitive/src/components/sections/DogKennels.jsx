import { UtensilsCrossed, Gamepad2, Scissors } from 'lucide-react'
import BoardingSection from './BoardingSection'
import dogImage from '../../assets/images/hero_image_03.png'

function DogKennels() {
  return (
    <BoardingSection
      tone="dog"
      reverse
      title="Dog Kennels"
      image={dogImage}
      imageAlt="Dog relaxing in a kennel"
      text="Designed so animals can relax in a kind, pet style, run around our exercise yards, make new friends in doggy daycare, or simply spend some time grooming."
      activities={[
        { icon: <UtensilsCrossed size={25} />, name: 'Eat' },
        { icon: <Gamepad2 size={25} />, name: 'Play' },
        { icon: <Scissors size={25} />, name: 'Brush' },
      ]}
    />
  )
}

export default DogKennels
