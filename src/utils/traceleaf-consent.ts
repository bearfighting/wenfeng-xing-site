import { createBrowserAnalytics, type Analytics } from '@traceleaf/browser';

const CONSENT_STORAGE_KEY = 'traceleaf-analytics-consent';
const siteId = import.meta.env.PUBLIC_TRACELEAF_SITE_ID?.trim();
const endpoint = import.meta.env.PUBLIC_TRACELEAF_ENDPOINT?.trim();
const ingestKey = import.meta.env.PUBLIC_TRACELEAF_INGEST_KEY?.trim();

let analytics: Analytics | undefined;

function readConsent(): 'granted' | 'denied' | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function saveConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // The current choice still applies for this page even when storage is unavailable.
  }
}

function startAnalytics() {
  if (!siteId || !endpoint || !ingestKey) return;
  if (analytics) {
    analytics.setConsent('granted');
    return;
  }

  analytics = createBrowserAnalytics({
    siteId,
    endpoint,
    ingestKey,
    consent: 'granted',
    onError: (error) => console.warn('[Traceleaf] Analytics delivery failed', error),
  });
}

export function mountTraceleafConsent() {
  if (!siteId || !endpoint || !ingestKey) return;
  if (document.querySelector('[data-traceleaf-consent-root]')) return;

  const style = document.createElement('style');
  style.textContent = `
    .traceleaf-consent-root { position: fixed; z-index: 1000; inset: auto 18px 18px auto; color: var(--paper-ink, #272d28); font: 14px/1.55 var(--font-mono, system-ui, sans-serif); }
    .traceleaf-consent-panel { width: min(410px, calc(100vw - 36px)); padding: 18px; border: 1px solid var(--paper-line-strong, #d8ddd7); border-radius: 12px; background: var(--paper-surface, #fffffc); box-shadow: 0 12px 40px #15201524; }
    .traceleaf-consent-panel p { margin: 8px 0 14px; color: var(--paper-ink-soft, #667066); }
    .traceleaf-consent-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .traceleaf-consent-actions button, .traceleaf-consent-settings { min-height: 38px; padding: 7px 12px; border: 1px solid var(--paper-line-strong, #d8ddd7); border-radius: 8px; background: var(--paper-bg, #fdfdf9); color: inherit; cursor: pointer; font: inherit; }
    .traceleaf-consent-actions [data-consent-grant] { border-color: var(--paper-accent, #52735b); background: var(--paper-accent, #52735b); color: white; }
    .traceleaf-consent-settings { display: none; margin-left: auto; font-size: 12px; opacity: .82; }
    .traceleaf-consent-root[data-settled='true'] .traceleaf-consent-settings { display: block; }
    @media (max-width: 520px) { .traceleaf-consent-root { inset: auto 12px 12px; } .traceleaf-consent-settings { margin-left: auto; } }
  `;
  document.head.append(style);

  const root = document.createElement('aside');
  root.className = 'traceleaf-consent-root';
  root.dataset.traceleafConsentRoot = '';
  root.setAttribute('aria-label', 'Analytics privacy settings');
  root.innerHTML = `
    <section class="traceleaf-consent-panel" data-consent-panel hidden aria-labelledby="traceleaf-consent-title">
      <strong id="traceleaf-consent-title">访问统计与性能数据</strong>
      <p>同意后，本站会在浏览器本地保存随机访客标识以关联回访，并收集页面浏览、来源、浏览器与设备信息及性能指标。拒绝不影响浏览。</p>
      <div class="traceleaf-consent-actions">
        <button type="button" data-consent-deny>暂不允许</button>
        <button type="button" data-consent-grant>同意并启用</button>
      </div>
    </section>
    <button class="traceleaf-consent-settings" type="button" data-consent-settings>统计设置</button>
  `;
  document.body.append(root);

  const panel = root.querySelector<HTMLElement>('[data-consent-panel]')!;
  const currentConsent = readConsent();
  if (currentConsent === 'granted') startAnalytics();
  root.dataset.settled = String(currentConsent !== null);
  panel.hidden = currentConsent !== null;

  root.querySelector('[data-consent-grant]')?.addEventListener('click', () => {
    saveConsent('granted');
    root.dataset.settled = 'true';
    panel.hidden = true;
    startAnalytics();
  });
  root.querySelector('[data-consent-deny]')?.addEventListener('click', () => {
    saveConsent('denied');
    analytics?.setConsent('denied');
    root.dataset.settled = 'true';
    panel.hidden = true;
  });
  root.querySelector('[data-consent-settings]')?.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });
}
