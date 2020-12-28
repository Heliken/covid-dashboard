export default () => {
  const fullscreenBtn = document.querySelectorAll('.section__fullscreen-button');
  fullscreenBtn.forEach((btn) => {
    const section = btn.closest('.section');
    const sectionParent = section.parentNode;
    btn.addEventListener('click', () => {
      section.classList.toggle('section--fullscreen');
      sectionParent.classList.toggle('section-fullscreen-parent');
    });
  });
};
