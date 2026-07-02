// Generates a print-ready A4 one-pager (HTML) for the China contact info.
// Mirrors /contact-2 content (minus the form). Usage:
//   1) node scripts/generate-flyer.mjs <out.html>
//   2) Chrome --headless=new --screenshot (2x) of the HTML -> PNG
//   3) wrap the PNG full-bleed on an A4 page and Chrome --print-to-pdf -> public/scale-up-ai-contact.pdf
// (Text is rasterized via the screenshot step because Chrome's print-to-pdf text
// path renders blank on this machine; images embed fine.)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const out = process.argv[2] || join(root, 'flyer.html');

const dataUri = (rel, mime) => `data:${mime};base64,${readFileSync(join(root, 'public', rel)).toString('base64')}`;
const logo = dataUri('navbar_logo_optimized.webp', 'image/webp');
const wechat = dataUri('wechat-icon.png', 'image/png');

const FONT =
  '"PingFang SC","Microsoft YaHei","Hiragino Sans GB","Heiti SC","Noto Sans CJK SC","WenQuanYi Micro Hei",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';

const lantern = (scale, char, stringLen) => `
  <div style="display:flex;flex-direction:column;align-items:center;">
    <div style="width:1px;height:${stringLen}px;background:rgba(246,226,122,0.5);"></div>
    <div style="width:${28 * scale}px;height:${6 * scale}px;background:linear-gradient(#f6e27a,#cb9b51);border-radius:3px 3px 0 0;"></div>
    <div style="position:relative;width:${54 * scale}px;height:${64 * scale}px;border-radius:50%;background:radial-gradient(circle at 50% 32%,#f05252,#c81e1e 62%,#7f1d1d);display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(255,170,60,0.4);">
      <div style="position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(90deg,rgba(0,0,0,0.14) 0 1px,transparent 1px 8px);"></div>
      <span style="position:relative;color:#fde68a;font-weight:700;font-size:${20 * scale}px;">${char}</span>
    </div>
    <div style="width:${28 * scale}px;height:${6 * scale}px;background:linear-gradient(#cb9b51,#f6e27a);border-radius:0 0 3px 3px;"></div>
    <div style="width:1px;height:${8 * scale}px;background:rgba(246,226,122,0.6);"></div>
    <div style="display:flex;gap:2px;">
      <div style="width:1px;height:${14 * scale}px;background:#f6c700;"></div>
      <div style="width:1px;height:${18 * scale}px;background:#fde68a;"></div>
      <div style="width:1px;height:${14 * scale}px;background:#f6c700;"></div>
    </div>
  </div>`;

const icon = (paths) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const phoneIcon = icon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.68 2.75a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.32 1.81.55 2.75.68A2 2 0 0 1 22 16.92z"/>');
const mailIcon = icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>');
const pinIcon = icon('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>');
const clockIcon = icon('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>');

const row = (ic, label, value) => `
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:44px;height:44px;border-radius:10px;background:#dbeafe;display:flex;align-items:center;justify-content:center;flex:0 0 auto;">${ic}</div>
    <div>
      <div style="font-size:12px;color:#64748b;">${label}</div>
      <div style="font-size:16px;font-weight:600;color:#0f172a;">${value}</div>
    </div>
  </div>`;

const html = `<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: ${FONT};
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color: #0f172a;
    background: #ffffff;
  }
  .page { width: 210mm; height: 297mm; overflow: hidden; position: relative; display: flex; flex-direction: column; }
</style>
</head>
<body>
  <div class="page">
    <!-- Header band -->
    <div style="position:relative;background:linear-gradient(160deg,#0f172a,#1f2937);padding:48px 56px 44px;text-align:center;overflow:hidden;">
      <div style="position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 0%,rgba(37,99,235,0.28),transparent);"></div>
      <div style="position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;padding:0 60px;">
        ${lantern(0.7, '福', 26)}${lantern(1, '春', 46)}${lantern(0.7, '財', 20)}
      </div>
      <div style="position:relative;padding-top:64px;">
        <img src="${logo}" alt="Scale Up AI" style="height:52px;object-fit:contain;margin-bottom:22px;">
        <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:0.5px;">用人工智能实现规模化增长</div>
        <div style="font-size:16px;color:#cbd5e1;margin-top:10px;">企业级人工智能咨询与解决方案</div>
        <div style="margin:22px auto 0;width:56px;height:1px;background:rgba(246,226,122,0.6);"></div>
        <div style="font-size:20px;color:#fde68a;font-weight:600;letter-spacing:4px;margin-top:14px;">安居乐业</div>
      </div>
    </div>

    <!-- Body -->
    <div style="flex:1;background:#f0f6fa;padding:40px 56px;display:flex;flex-direction:column;gap:28px;">
      <!-- About -->
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <span style="width:4px;height:20px;border-radius:2px;background:#f6c700;"></span>
          <span style="font-size:20px;font-weight:700;color:#0f172a;">关于我们</span>
        </div>
        <p style="margin:0;font-size:15px;line-height:1.9;color:#334155;">
          我们帮助富有远见的企业驾驭人工智能，从战略规划到全面部署的 AI 智能体。让我们携手打造您企业的未来。
        </p>
      </div>

      <!-- WeChat highlight -->
      <div style="display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 20px;box-shadow:0 4px 14px rgba(2,6,23,0.06);">
        <div style="width:48px;height:48px;border-radius:10px;background:#07C160;display:flex;align-items:center;justify-content:center;flex:0 0 auto;">
          <img src="${wechat}" alt="WeChat" style="height:26px;width:26px;object-fit:contain;">
        </div>
        <div>
          <div style="font-size:12px;color:#64748b;">微信号 · WeChat</div>
          <div style="font-size:20px;font-weight:700;color:#0f172a;">elyasalemi</div>
        </div>
      </div>

      <!-- Contact info -->
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
          <span style="width:4px;height:20px;border-radius:2px;background:#f6c700;"></span>
          <span style="font-size:20px;font-weight:700;color:#0f172a;">联系方式</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px 32px;">
          ${row(phoneIcon, '电话 · Phone', '03 9001 7788')}
          ${row(mailIcon, '邮箱 · Email', 'info@scaleupwithai.ai')}
          ${row(pinIcon, '地址 · Address', '墨尔本 William 街 263 号 19 楼')}
          ${row(clockIcon, '营业时间 · Hours', '周一至周五 9:00-18:00 (AEST)')}
        </div>
      </div>
    </div>

    <!-- Footer band -->
    <div style="background:#0f172a;color:#94a3b8;padding:18px 56px;display:flex;justify-content:space-between;align-items:center;font-size:13px;">
      <span>© 2025 Scale Up AI. 版权所有</span>
      <span style="color:#e2e8f0;font-weight:600;">scaleupwithai.ai</span>
    </div>
  </div>
</body>
</html>`;

writeFileSync(out, html);
console.log('Wrote flyer HTML to', out);
