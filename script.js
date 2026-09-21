const copyButton = document.getElementById('copy-bibtex');
const bibtex = document.getElementById('bibtex');

copyButton?.addEventListener('click', async () => {
  const original = copyButton.innerHTML;

  try {
    await navigator.clipboard.writeText(bibtex.innerText);

    copyButton.innerHTML =
      '<span class="icon"><i class="fas fa-check"></i></span><span>Copied</span>';
  } catch {
    copyButton.textContent = 'Select + copy';
  }

  window.setTimeout(() => {
    copyButton.innerHTML = original;
  }, 1600);
});


const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');


function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';
}


document.querySelectorAll('.zoomable').forEach((figure) => {
  figure.addEventListener('click', () => {
    const image = figure.querySelector('img');

    if (!image || !lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || 'Expanded figure';

    if (lightboxCaption) {
      lightboxCaption.textContent =
        figure.querySelector('figcaption')?.textContent ||
        image.alt ||
        '';
    }

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  });
});


lightboxClose?.addEventListener('click', closeLightbox);


lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
