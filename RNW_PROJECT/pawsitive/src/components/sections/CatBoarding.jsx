import { UtensilsCrossed, Gamepad2, Moon } from 'lucide-react'
import BoardingSection from './BoardingSection'
import catImage from '../../assets/images/hero_image_04.png'

function CatBoarding() {
  return (
    <BoardingSection
      tone="cat"
      title="Cat Boarding"
      image={catImage}
      imageAlt="Cat boarding"
      text="We offer long term and short term boarding. Every cat family has their own private, spacious room and daily individual time in our open play room for the fussiest feline."
      activities={[
        { icon: <UtensilsCrossed size={25} />, name: 'Eat' },
        { icon: <Gamepad2 size={25} />, name: 'Play' },
        { icon: <Moon size={25} />, name: 'Sleep' },
      ]}
    />
  )
}

export default CatBoarding
