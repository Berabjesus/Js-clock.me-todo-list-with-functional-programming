import it from '../modules/main_module';
import tasks from '../helpers/create_collapsible_object'

const leftSection = () => {
  const section = it.is('section')
  section.classes('col-3 d-flex flex-column left-section h-100vh custom-border')
  const header = it.is('h2')
  header.classes('h2 pb-4')
  header.innerText = 'Clock.me'

  section.appendChild(header)
  section.appendChild(tasks())
  section.appendChild(tasks())

  return section
}

const middleSection = () => {
  console.log('middle');
}

const rightSection = () => {
  console.log('right');
}

const home = () => {
  return {
    leftSection, middleSection, rightSection
  }
}

export default home()