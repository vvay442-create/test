// Рендер хронологии. Функции чистые и тестируемые: данные приходят аргументом.
// Бутстрап (вызов рендера на реальных данных) живёт в index.html.

function sortByYear(milestones) {
  return [...milestones].sort((a, b) => a.year - b.year);
}

function createCard(milestone) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.tag = milestone.tag;
  card.dataset.year = String(milestone.year);

  const year = document.createElement('div');
  year.className = 'card__year';
  year.textContent = milestone.yearLabel || String(milestone.year);
  card.appendChild(year);

  const tag = document.createElement('span');
  tag.className = 'card__tag';
  tag.textContent = milestone.tag;
  card.appendChild(tag);

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = milestone.title;
  card.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = milestone.description;
  card.appendChild(desc);

  return card;
}

function renderTimeline(milestones, container) {
  if (!container) {
    return container;
  }
  container.textContent = '';
  for (const milestone of sortByYear(milestones)) {
    container.appendChild(createCard(milestone));
  }
  return container;
}

// Node/тесты (CommonJS): отдаём функции наружу. В браузере они остаются глобальными.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sortByYear, createCard, renderTimeline };
}
