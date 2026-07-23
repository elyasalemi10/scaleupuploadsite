/**
 * Escapes text that came from a visitor before it goes into an email body.
 * Form fields and query params are attacker-controlled: without this, a
 * submitted message can inject markup or a link into the mail we receive.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
