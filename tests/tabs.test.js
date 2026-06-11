import { describe, it, expect, beforeEach } from 'vitest';
const { initTabs } = require('../app.js');

describe('Tabs logic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="tabs">
        <button class="tab-btn active" data-target="tab-timeline" id="btn-timeline">Timeline</button>
        <button class="tab-btn" data-target="tab-tools" id="btn-tools">Tools</button>
      </div>
      <div class="tab-content">
        <div id="tab-timeline" class="tab-pane active">Content Timeline</div>
        <div id="tab-tools" class="tab-pane">Content Tools</div>
      </div>
    `;
    initTabs();
  });

  it('should switch active classes on click', () => {
    const btnTimeline = document.getElementById('btn-timeline');
    const btnTools = document.getElementById('btn-tools');
    const paneTimeline = document.getElementById('tab-timeline');
    const paneTools = document.getElementById('tab-tools');

    // Кликаем по второй вкладке
    btnTools.click();

    // Проверяем, что классы переключились
    expect(btnTools.classList.contains('active')).toBe(true);
    expect(paneTools.classList.contains('active')).toBe(true);

    // У первой вкладки классы должны исчезнуть
    expect(btnTimeline.classList.contains('active')).toBe(false);
    expect(paneTimeline.classList.contains('active')).toBe(false);
  });
});
