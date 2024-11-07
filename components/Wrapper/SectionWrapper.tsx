import { OptionalClassName } from '@/utils/commonTypes'


type Props = OptionalClassName & {
  children: React.ReactNode
} 

const SectionWrapper = ({children, className} : Props) => {
  return (
    <div className={`${className}`}>{children}</div>
  )
}

export default SectionWrapper