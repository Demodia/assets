import { DARK_COLOR, LIGHT_COLOR } from 'https://cdn.jsdelivr.net/gh/Demodia/assets/CONSTANTS/COLOR.mjs';

const LOG_COLOR = new Map([
  ['DARK', DARK_COLOR],
  ['LIGHT', LIGHT_COLOR],
]);

/**
 * Returns a formatted console message with colors
 *
 * @param {string[]} messages - The messages to log.
 * @param {string[]} colors - The colors to use for each message.
 * @param {Object} debugConfig - The debug configuration.
 * @param {boolean} debugConfig.ENABLE - Whether to actually log the messages.
 * @param {string} debugConfig.THEME - The color theme to use.
 * @param {string} debugConfig.LOCATION - The location to prepend to each message.
 * @param {string} debugConfig.SEPARATOR - The separator to append to each message.
 */
export default function debugWithColor(messages, colors, { ENABLE = false, THEME = 'DARK', LOCATION = '', SEPARATOR = '⟼' } = {}) {
  if (!ENABLE) return [];

  if (!Array.isArray(messages) || !Array.isArray(colors)) {
    console.warn('debugWithColor: Both messages and colors must be arrays.');
    return [];
  }

  if (messages.length !== colors.length) {
    console.warn('debugWithColor: Messages and colors must have the same length.');
    return [];
  }

  const colorTheme = LOG_COLOR.get(THEME.toUpperCase());

  if (!colorTheme) throw new Error(`debugWithColor: Invalid theme "${THEME}".`);

  const formattedMessages = [`%c${LOCATION}`];
  const formattedColors = [`color: ${colorTheme['VIOLET']}`];

  messages.forEach((message, index) => {
    const colorName = colors[index].toUpperCase();
    const color = colorTheme[colorName];
    if (!color) {
      console.warn(`debugWithColor: Invalid color "${colorName}".`);
      return;
    }
    formattedMessages.push(`%c ${SEPARATOR} ${message}`);
    formattedColors.push(`color: ${color}`);
  });

  return [formattedMessages.join(''), ...formattedColors];
}
