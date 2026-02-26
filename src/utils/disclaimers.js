/**
 * Recursively collects all disclaimer HTML content and paths from a disclaimer array.
 * Handles nested referencedDisclaimers.
 * @param {Array} disclaimerArray - Array of disclaimer objects
 * @returns {Array} Flat array of { html, _path } from termDetails
 */
export function collectDisclaimerItems(disclaimerArray) {
  if (!disclaimerArray || !Array.isArray(disclaimerArray)) return [];

  const result = [];

  function traverse(disclaimers) {
    if (!disclaimers || !Array.isArray(disclaimers)) return;
    for (const d of disclaimers) {
      if (d.termDetails && Array.isArray(d.termDetails)) {
        for (const td of d.termDetails) {
          if (td.html) result.push({ html: td.html, _path: td._path });
        }
      }
      if (d.referencedDisclaimers && d.referencedDisclaimers.length > 0) {
        traverse(d.referencedDisclaimers);
      }
    }
  }

  traverse(disclaimerArray);
  return result;
}

/** @deprecated Use collectDisclaimerItems */
export function collectDisclaimerHtml(disclaimerArray) {
  return collectDisclaimerItems(disclaimerArray).map((item) => item.html);
}
