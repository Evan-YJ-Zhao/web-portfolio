import { OptionalClassName } from '@/utils/commonTypes'


type Props = OptionalClassName & {
  children: React.ReactNode;
  title: string;
} 

const SectionWrapper = ({children, className, title} : Props) => {
  return (
    <section className={`${className}`}>
      <h2 className="absolute">{title}</h2>
      {children}
    </section>
  )
}

export default SectionWrapper