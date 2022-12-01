import "./index.css";

import Advantage from "../components/Advantage.js";
import Vacancy from "../components/Vacancy";
import Section from "../components/Section.js";
import Tabs from "../components/Tabs.js";
import Faq from "../components/Faq.js";

import {
  advantageArray,
  vacancyArray,
  advantageListSection,
  templateAdvantageSelector,
  templateVacancySelector,
  faqArray,
  faqAccordion,
  faqList,
  galleryMain,
  galleryFilm,
  gallerySlideAll,
  gallerySlide,
  triggerLeft,
  triggerRight
} from "../utils/constants.js";

// advantages
const advantagesList = new Section(
  {
    renderer: (item) => {
      const advantageElement = getAdvantage(item);

      advantagesList.setItem(advantageElement);
    },
  },
  advantageListSection
);

const getAdvantage = (item) => {
  const advantage = new Advantage(item, templateAdvantageSelector);

  return advantage.getAdvantagesElement();
};

advantagesList.renderItems(advantageArray);

// vacancy
const getVacancy = (item) => {
  const vacancy = new Vacancy(item, templateVacancySelector);

  return vacancy.getCardElement();
};

const rendererVacancy = (dataAttribute) => {
  const vacancyList = new Section(
    {
      renderer: (item) => {
        const vacancyElement = getVacancy(item);

        vacancyList.setItem(vacancyElement);
      },
    },
    `[data-content=${dataAttribute}]`
  );
  const cardsArray = vacancyArray.filter(
    (item) => item.tabContent === dataAttribute
  );

  vacancyList.clearItems();
  vacancyList.renderItems(cardsArray);
};

rendererVacancy("mentor-programming");
rendererVacancy("reviewer-programming");

new Tabs({
  tabsSelector: ".vacancy__tabs",
  tabsHeadSelector: ".vacancy__head",
  tabsBodySelector: ".vacancy__body",
  tabsCaptionSelector: ".vacancy__tab-button",
  tabsCaptionActiveClass: "vacancy__tab-button_active",
  tabsContentActiveClass: "vacancy__content_active",
}).init();

new Tabs(
  {
    tabsSelector: ".mentor",
    tabsHeadSelector: ".mentor__head",
    tabsBodySelector: ".mentor__body",
    tabsCaptionSelector: ".mentor__tab-button",
    tabsCaptionActiveClass: "tabs__tab-button_active",
    tabsContentActiveClass: "tabs__content_active",
  },
  (data) => rendererVacancy(data)
).init();

new Tabs(
  {
    tabsSelector: ".reviewer",
    tabsHeadSelector: ".reviewer__head",
    tabsBodySelector: ".reviewer__body",
    tabsCaptionSelector: ".reviewer__tab-button",
    tabsCaptionActiveClass: "tabs__tab-button_active",
    tabsContentActiveClass: "tabs__content_active",
  },
  (data) => rendererVacancy(data)
).init();

// faq
const faqItems = new Section(
  {
    renderer: (item) => {
      const faqElement = getFaq(item);

      faqItems.setItem(faqElement);
    },
  },
  faqList
);

const getFaq = (item) => {
  const faq = new Faq(item);

  return faq.getFaqElement();
};


faqItems.renderItems(faqArray)


let slideIndex = 0;

function render() {
  const mainWidth = galleryMain.offsetWidth
  galleryFilm.style.right = (mainWidth * slideIndex) + (slideIndex * 50) + 'px';
}

function changeSize(){
  const mainWidth = galleryMain.offsetWidth;
  galleryFilm.style.width = (gallerySlideAll.length - 1) * 50 + mainWidth * gallerySlideAll.length +'px';
  gallerySlideAll.forEach(slide => slide.style.width = mainWidth + 'px')
  render();
}

window.addEventListener('resize', changeSize);
changeSize();

function disableTrigger(boolean, trigger){
  if(boolean){
    trigger.classList.add('gallery__trigger_disabled');
    trigger.setAttribute("disabled", '');
  }else{
    trigger.classList.remove('gallery__trigger_disabled');
    trigger.disabled = false
  }
}

triggerLeft.addEventListener('click', ()=>{
	if (slideIndex > 0){
		slideIndex--;
    if(slideIndex === 0){
      disableTrigger(true, triggerLeft)
    }else{
      disableTrigger(false, triggerRight)
    }
	}
	render()
});

triggerRight.addEventListener('click', (evt)=>{
  console.log(evt.target)
	if (gallerySlideAll.length - 1 > slideIndex){
		slideIndex++;
    if(gallerySlideAll.length - 1 === slideIndex){
      disableTrigger(true, triggerRight)
    }else{
      disableTrigger(false, triggerLeft)
    }
	}
	render()
});

disableTrigger(true, triggerLeft);
