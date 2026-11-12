import site from '../site.config';
import { fontCss, roleStack } from './fonts';

// The CSS variables for your colors, fonts and sizes, shared by the blog and the journal app.
export function themeCss() {
  const t = site.text;
  const step = (n: number) => +(t.size * t.headingScale ** n).toFixed(1);
  const { light, dark } = site.colors;
  const bg = site.background;
  const darkVars = `--paper:${dark.paper};--ink:${dark.ink};--accent:${dark.accent};--highlight:${dark.highlight};`;
  return `${fontCss()}
:root{
  --paper:${light.paper};--ink:${light.ink};--accent:${light.accent};--highlight:${light.highlight};
  --font-body:${roleStack('body')};--font-heading:${roleStack('heading')};
  --font-ui:${roleStack('ui')};--font-code:${roleStack('code')};
  --text-size:${t.size}px;--line-height:${t.lineHeight};--sidebar-size:${t.sidebarSize}px;
  --h3:${step(1)}px;--h2:${step(2)}px;--h1:${step(3)}px;
  --panel-opacity:${bg.image ? Math.round(bg.panelOpacity * 100) : 100}%;
  --panel-blur:${bg.image ? bg.blur : 0}px;
  ${bg.image ? `--bg-image:url("${bg.image}");` : ''}
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${darkVars}}}
:root[data-theme="dark"]{${darkVars}}`;
}

// Runs before the page draws, so the right theme and text size show immediately.
export const earlyScript = `try{var s=parseFloat(localStorage.getItem('reader-scale'));if(s)document.documentElement.style.setProperty('--reader-scale',s);var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}`;
