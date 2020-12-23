export default () => {
  const fullscreenBtn = document.querySelectorAll('.section__fullscreen-button');
  fullscreenBtn.forEach((btn) => {
    const section = btn.closest('.section');
    btn.addEventListener('click', () => {
      section.classList.toggle('section--fullscreen');
    });
  });
};
