import DreamCareer from './DreamCareer'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import WhyOpenMentorship from './WhyOpenMentorship'

type Props = {}

const Landing = (props: Props) => {
  return (
    <div className="">
        <Hero />
        <HowItWorks />
        <WhyOpenMentorship />
        <DreamCareer />
    </div>
  )
}

export default Landing