import { useId, useState } from 'react';
import './accordian.scss';

let sections = [
  {
    value: 'html',
    title: 'HTML',
    contents:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    value: 'css',
    title: 'CSS',
    contents:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    value: 'javascript',
    title: 'JavaScript',
    contents:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
]

function getAccordionHeaderId(accordionId, value) {
  return accordionId + '-header-' + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + '-panel-' + value;
}

export default function Accordion(props) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(
    new Set(),
  );
  
  function focusOnSection(index) {
    document.getElementById(getAccordionHeaderId(accordionId, sections[index].value)).focus();
  }
  
  function handleOnKeyDown(event) {
    const activeItemValue =
      document.activeElement.getAttribute('data-accordion-value',);
    
    // Only respond to these interactions if
    // an accordion title is in focus.
    if (activeItemValue == null) return;
    
    switch (event.code) {
      case 'ArrowUp': {
        const index = sections.findIndex(({ value: itemValue }) => itemValue === activeItemValue);
        focusOnSection((index - 1 + sections.length) % sections.length);
        break;
      }
      case 'ArrowDown': {
        const index = sections.findIndex(({ value: itemValue }) => itemValue === activeItemValue);
        focusOnSection((index + 1) % sections.length);
        break;
      }
      case 'Home': {
        focusOnSection(0);
        break;
      }
      case 'End': {
        focusOnSection(sections.length - 1);
        break;
      }
      default:
        break;
    }
  }
  
  function handleOpenSection(value) {
    const newOpenSections = new Set(openSections);
    newOpenSections.has(value) ? newOpenSections.delete(value) : newOpenSections.add(value);
    setOpenSections(newOpenSections);
  }
  
  return (
    <div
      className="accordion"
      onKeyDown={handleOnKeyDown}>
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value), headerId = getAccordionHeaderId( accordionId, value), panelId = getAccordionPanelId(accordionId, value);
        
        return (
          <div className="accordion-item" key={value}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              id={headerId}
              className="accordion-item-title"
              type="button"
              data-accordion-value={value}
              onClick={() => handleOpenSection(value)}>
              {title}{' '}
              <span aria-hidden={true} className={['accordion-icon', isExpanded && 'accordion-icon--rotated'].filter(Boolean).join(' ')} />
            </button>
            <div
              aria-labelledby={headerId}
              role="region"
              className="accordion-item-contents"
              id={panelId}
              hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
