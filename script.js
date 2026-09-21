const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const copyButton = document.getElementById('copy-bibtex');
const bibtex = document.getElementById('bibtex');

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bibtex.innerText);
    copyButton.textContent = 'Copied';

    setTimeout(() => {
      copyButton.textContent = 'Copy BibTeX';
    }, 1600);
  } catch {
    copyButton.textContent = 'Select + copy';
  }
});

const modal = document.getElementById('image-modal');
const modalImg = modal?.querySelector('img');
const modalCaption = modal?.querySelector('p');
const modalClose = modal?.querySelector('.modal-close');

document.querySelectorAll('[data-zoom]').forEach((card) => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const caption = card.querySelector('figcaption');

    if (!img || !modal || !modalImg) return;

    modalImg.src = img.src;
    modalImg.alt = img.alt;

    if (modalCaption) {
      modalCaption.textContent =
        caption?.textContent || img.alt;
    }

    modal.showModal();
  });
});

modalClose?.addEventListener('click', () => {
  modal.close();
});

modal?.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();

  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    modal.close();
  }
});
