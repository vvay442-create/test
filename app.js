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

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length === 0 || tabPanes.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Убираем active у всех кнопок и панелей
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Добавляем active текущей кнопке и соответствующей панели
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Node/тесты (CommonJS): отдаём функции наружу. В браузере они остаются глобальными.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sortByYear, createCard, renderTimeline, initTabs };
}
