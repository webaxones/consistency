/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/controls.js":
/*!*****************************!*\
  !*** ./src/app/controls.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blockCanBeChecked": () => (/* binding */ blockCanBeChecked),
/* harmony export */   "blockShouldBeChecked": () => (/* binding */ blockShouldBeChecked),
/* harmony export */   "isUsedByLocale": () => (/* binding */ isUsedByLocale),
/* harmony export */   "regDealWithPair": () => (/* binding */ regDealWithPair)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/app/data.js");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules */ "./src/app/rules.js");
/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


const {
  getBlockName,
  getBlockAttributes
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor');

/**
 * Check if setting is used by current active locale
 *
 * @param {string} settingSlug Slug of setting, same as regex
 * @return {boolean} 
 */
const isUsedByLocale = settingSlug => {
  const currentLocale = (0,_data__WEBPACK_IMPORTED_MODULE_1__.getCurrentLocale)();
  const theRegex = _rules__WEBPACK_IMPORTED_MODULE_2__.regs?.find(x => x.name === settingSlug);
  if (undefined !== theRegex && theRegex?.locales?.includes(currentLocale)) {
    return true;
  }
  return false;
};

/**
 * Checks if the current block should be checked or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Should the block be checked?
 */
const blockShouldBeChecked = currentBlockId => {
  const blockName = getBlockName(currentBlockId);
  if (_rules__WEBPACK_IMPORTED_MODULE_2__.processedBlocks.includes(blockName)) {
    return true;
  }
  return false;
};

/**
 * Checks if the current block can be checked or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Can the block be checked?
 */
const blockCanBeChecked = currentBlockId => {
  const blockAttributes = getBlockAttributes(currentBlockId);
  if (blockAttributes && blockAttributes.hasOwnProperty('content') && '' !== blockAttributes.content) {
    return true;
  }
  return false;
};

/**
 * Checks if the regex processes a pair
 *
 * @param {string} reg regex
 * @return {boolean} Does the regex process a pair?
 */
const regDealWithPair = reg => {
  if (_rules__WEBPACK_IMPORTED_MODULE_2__.regsWithPair.includes(reg.name)) {
    return true;
  }
  return false;
};

/***/ }),

/***/ "./src/app/data.js":
/*!*************************!*\
  !*** ./src/app/data.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentLocale": () => (/* binding */ getCurrentLocale),
/* harmony export */   "getCurrentUserSettings": () => (/* binding */ getCurrentUserSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const {
  getEntityRecord
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core');

/**
 * Get current user settings from usermeta
 *
 * @return {object} userSettings Current user settings: userSettings.onTheFly, userSettings.onPaste
 */
const getCurrentUserSettings = () => {
  const userSettings = {
    onTheFly: false,
    onPaste: false
  };
  const currentUser = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store).getCurrentUser();
  const idUser = currentUser?.id || 0;
  const currentUserEntity = getEntityRecord('root', 'user', idUser, 'consistency_plugin_user_settings');
  const userConsistencySettings = currentUserEntity?.meta?.consistency_plugin_user_settings;
  userSettings.onTheFly = userConsistencySettings?.find(s => s.slug === 'on_the_fly')?.value || false;
  userSettings.onPaste = userConsistencySettings?.find(s => s.slug === 'on_paste')?.value || false;
  return userSettings;
};

/**
 * Get current active site locale
 *
 * @return {string} currentLocale Current active site locale
 */
const getCurrentLocale = () => {
  const siteEntity = getEntityRecord('root', 'site');
  const currentLocale = siteEntity?.language || 'en_US';
  return currentLocale;
};

/***/ }),

/***/ "./src/app/fix.js":
/*!************************!*\
  !*** ./src/app/fix.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fixIt": () => (/* binding */ fixIt)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/app/helpers.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/app/controls.js");
/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


const {
  getBlock,
  getBlockAttributes,
  getSelectionStart,
  isTyping
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor');
const {
  updateBlock,
  selectionChange
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/block-editor');

/**
 * Fixes the typography of one block
 *
 * @param {object} props String currentBLockId Current selected block ID, Array theRegs all regex, Boolean isPasting
 */
const fixIt = props => {
  const {
    currentBlockId,
    theRegs,
    isPasting
  } = props;
  const block = getBlock(currentBlockId);

  // Check if the current block should be checked and can be checked
  if (!(0,_controls__WEBPACK_IMPORTED_MODULE_2__.blockShouldBeChecked)(currentBlockId) || !(0,_controls__WEBPACK_IMPORTED_MODULE_2__.blockCanBeChecked)(currentBlockId)) return;
  let blockAttributes = getBlockAttributes(currentBlockId);

  // Loop on regular expressions
  Object.entries(theRegs).forEach(_ref => {
    let [_, reg] = _ref;
    __webpack_require__.g.consistencyLoop++;
    if (__webpack_require__.g.consistencyLoop > 150) {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.aMemoryLeakHasOccured)(currentBlockId);
    }
    let replaceWithThis = reg.replace;
    let firstPart = '';
    let lastPart = '';
    let cursorPosition = 0;
    let blockContent = blockAttributes.content;
    let selectionStart;

    // Remove 'code' 'pre' and 'kbd' tags from block content
    let textContentWithoutCode = blockContent.replace(/<\b(code|pre|kbd)\b>.*?<\/\b(code|pre|kbd)\b>/gi, '');

    // Remove HTML tags from block content
    let textContent = textContentWithoutCode.replace(/(<([^>]+)>)/gi, '');

    // Check if block content is concerned by the regex
    let isConcerned = false;
    if (!isTyping()) {
      isConcerned = reg.mask.test(textContent);
    }

    // Content splitting in case of typing on the fly to allow the user to undo a correction
    // If isTyping is false, it is the processing of pasted innerBlocks
    if (isTyping()) {
      // Get cursor position in textContent (without tags): needed for cursor repositioning
      selectionStart = getSelectionStart(block.name);
      cursorPosition = selectionStart?.offset || 0;

      // Get cursor position in HTML (with tags): needed to cut at the right position
      const cursorPositionInsideHTML = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getCursorPositionInInnerHTML)(currentBlockId) || cursorPosition;

      // If the rule depends on previous characters, we need to separate the string taking those characters into account
      const captureGroups = textContent.match(reg.mask);
      if (null === captureGroups || 0 === captureGroups.length) return;
      const lengthToGoBack = captureGroups[0].length || 1;

      // Split the string to process only the part from the cursor position to the end
      firstPart = blockContent.substring(0, cursorPositionInsideHTML - lengthToGoBack);
      lastPart = blockContent.substring(cursorPositionInsideHTML - lengthToGoBack, blockContent.length);

      // If first part of the string matches but not the lastPart, it means that a character has been typed uncorrected voluntarily before, so it should not be taken into account
      isConcerned = reg.mask.test(textContent) && reg.mask.test(lastPart);
    }

    // Stop correction if block content isn't concerned by the regex nor by the current site locale (language)
    if (!isConcerned || !(0,_controls__WEBPACK_IMPORTED_MODULE_2__.isUsedByLocale)(reg.name)) return;

    // Pairing characters need specific process for the replacement
    if ((0,_controls__WEBPACK_IMPORTED_MODULE_2__.regDealWithPair)(reg)) {
      replaceWithThis = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getReplacementStringForPairs)(reg, blockContent, replaceWithThis);
    }

    // Concat strings
    if (0 !== cursorPosition) {
      blockContent = firstPart + lastPart.replace(reg.mask, replaceWithThis);
    }

    // Pasted content innerBlocks case: no selection, no cursor position so the whole block is fixed 
    if (0 === cursorPosition) {
      blockContent = blockContent.replace(reg.mask, reg.replace);
    }

    // If CTRL Z was used just before, then we do not correct this time
    if (true === __webpack_require__.g.consistencyHistory) {
      __webpack_require__.g.consistencyHistory = false;
      return;
    }

    // Update block
    if (false === __webpack_require__.g.consistencyHistory) {
      updateBlock(currentBlockId, {
        ...block,
        attributes: {
          ...block.attributes,
          content: blockContent
        }
      });
    }

    // Cursor repositioning:
    if (0 === reg.nbMoved || 0 === cursorPosition || isPasting) return;

    // If the replaced string had more characters than the new string, the cursor has moved forward, so it must be moved back
    // Eg: ... replaced with … removes 2 characters
    if (reg.nbMoved < 0) {
      selectionChange(currentBlockId, selectionStart.attributeKey, cursorPosition - 1, cursorPosition + reg.nbMoved);
    }

    // If the replaced string had fewer characters than the new string, the cursor has moved backwards, so it must be moved forward
    // Eg: "" replaced with «  » adds 2 characters
    if (reg.nbMoved > 0) {
      selectionChange(currentBlockId, selectionStart.attributeKey, cursorPosition + 1 + reg.nbMoved, cursorPosition + reg.nbMoved);
    }
  });
  __webpack_require__.g.consistencyLoop = 0;
};

/***/ }),

/***/ "./src/app/helpers.js":
/*!****************************!*\
  !*** ./src/app/helpers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aMemoryLeakHasOccured": () => (/* binding */ aMemoryLeakHasOccured),
/* harmony export */   "getAllInnersFromParents": () => (/* binding */ getAllInnersFromParents),
/* harmony export */   "getCursorPositionInInnerHTML": () => (/* binding */ getCursorPositionInInnerHTML),
/* harmony export */   "getReplacementStringForPairs": () => (/* binding */ getReplacementStringForPairs)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const {
  getBlock
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor');
const {
  updateBlock
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/block-editor');

/**
 * Get all innerBlocks from an array of parents
 * The main use is to retrieve the child core/list-item blocks of the core/list block
 *
 * @param {*} arr
 */
const getAllInnersFromParents = arr => arr.flatMap(_ref => {
  let {
    innerBlocks,
    ...rest
  } = _ref;
  return innerBlocks.map(b => ({
    ...rest,
    ...b
  }));
});

/**
 * Get specific replacement string for pairing characters by checking if we are on opening one or closing one
 *
 * Character pairs have between 3 and 5 parts to be cut in the "replace" part:
 * opening character pair + left separator + string between the pair + right separator + closing character pair
 * french quotes eg: « +   + $1 +   + »
 * left and right separators are optionals
 * 
 * @param {object} reg Replacement parameters
 * @param {string} fullBlockContent Full block string
 * @param {string} replaceWithThis Replacement string
 * @return {string} replaceWithThis Replacement string
 */
const getReplacementStringForPairs = (reg, fullBlockContent, replaceWithThis) => {
  // Get the opening and closing characters of the pair
  const openPairChar = reg.replace.charAt(0);
  const closPairChar = reg.replace.charAt(reg.replace.length - 1);

  // Get left separator and right separators
  const leftSep = reg.replace.substring(1, reg.replace.indexOf('$')) || '';
  let rightSep = '';
  if (0 !== [...reg.replace.matchAll(/[0-9]/g)].length) {
    // Right separator begins after last number from last capturing group
    rightSep = reg.replace.substring([...reg.replace.matchAll(/[0-9]/g)].pop()['index'] + 1, reg.replace.length - 1);
  }

  // Check if the character should be opening or closing by testing the odd or even number
  const getOpenPairRegex = new RegExp(`${openPairChar}`, 'g');
  const getClosPairRegex = new RegExp(`${closPairChar}`, 'g');
  const nbOpenPair = (fullBlockContent.match(getOpenPairRegex) || []).length;
  const nbClosPair = (fullBlockContent.match(getClosPairRegex) || []).length;
  replaceWithThis = nbOpenPair === nbClosPair ? openPairChar + leftSep : rightSep + closPairChar;
  return replaceWithThis;
};

/**
 * Stop the process in the regex loop if a code error generates an infinite loop
 * by removing last 2 characters and adding a message in the console
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 */
const aMemoryLeakHasOccured = currentBlockId => {
  const block = getBlock(currentBlockId);
  updateBlock(currentBlockId, {
    ...block,
    attributes: {
      ...block.attributes,
      content: block.attributes.content.slice(-2)
    }
  });
  __webpack_require__.g.consistency_loop = 0;
  console.log('Consistency - a memory leak has occured');
};

/**
 * Get current cursor position in HTML content
 *
 * @param {string} currentBlockId Active current block ID
 * @return {integer} cursor position in HTML content
 */
const getCursorPositionInInnerHTML = currentBlockId => {
  // Get current block DOM Node
  const currentActiveBlock = document.querySelector(`#block-${currentBlockId}`);
  if (null === currentActiveBlock) return undefined;

  // Get current selection
  const selection = document.getSelection();
  const _range = selection?.getRangeAt(0);

  // Return if user is selecting text instead of typing
  if (!_range.collapsed) return;

  // Clone range to work on
  const range = _range.cloneRange();

  // Create a temporary node to target
  const tempNode = document.createTextNode('\0');

  // Insert temporary node as target into cloned range
  range.insertNode(tempNode);

  // Get position of target inside active block HTML
  let cursorPositionInsideHTML = currentActiveBlock?.innerHTML?.indexOf('\0');

  // Remove temporary node and normalize cut node - important!
  tempNode.parentNode.removeChild(tempNode);
  currentActiveBlock.normalize();

  // Remove non-breaking spaces in &nbsp; format from the count
  const nbNbsp = (currentActiveBlock?.innerHTML.match(/&nbsp;/g) || []).length;
  if (nbNbsp > 0) {
    cursorPositionInsideHTML = cursorPositionInsideHTML - nbNbsp * 6 + nbNbsp;
  }
  return cursorPositionInsideHTML;
};

/***/ }),

/***/ "./src/app/rules.js":
/*!**************************!*\
  !*** ./src/app/rules.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processedBlocks": () => (/* binding */ processedBlocks),
/* harmony export */   "regs": () => (/* binding */ regs),
/* harmony export */   "regsWithPair": () => (/* binding */ regsWithPair)
/* harmony export */ });
// List of all processed blocks (obligation to filter them because not all of them have textual content)
const processedBlocks = ['core/paragraph', 'core/heading', 'core/quote', 'core/list-item', 'core/read-more'];

// List of all correction rules with each regular expression used
const regs = [{
  // Replaces straight quote with curly quote
  name: 'quote',
  // slug of the setting and the related regex
  mask: /\'/,
  // mask
  replace: '’',
  // replacement string
  nbMoved: 0,
  // number of characters less or more during replacement
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB'] // concerned locales
}, {
  // Replaces three dots with ellipsis
  name: 'ellipsis',
  mask: /\.{3}/,
  replace: '…',
  nbMoved: -2,
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Replaces two hyphens with em dash
  name: '2hyphens',
  mask: /(?:\-)\-/,
  replace: '—',
  nbMoved: -1,
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Adds HTML tag sup to ordinal number suffix
  name: 'ordinalNumberSuffix',
  mask: /([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)(?= | )/,
  replace: '$1<sup>$2<\/sup>',
  nbMoved: 0,
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Replaces regular quotes with curly quotes
  name: 'regularToCurlyQuotes',
  mask: /"/,
  // specific mask with specific process
  replace: '“$1”',
  nbMoved: 0,
  locales: ['en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Replaces regular quotes with french quotes
  name: 'regularToFrenchQuotes',
  mask: /"/,
  // specific mask with specific process
  replace: '« $1 »',
  nbMoved: 1,
  locales: ['fr_FR', 'fr_BE']
}, {
  // Replaces a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
  name: 'breakingSpace',
  mask: / ([\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
  replace: ' $1',
  nbMoved: 0,
  locales: ['fr_FR', 'fr_BE']
}, {
  // Adds a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
  name: 'noSpaceBefore',
  mask: /(?<! | |&nbsp;)([\?|\!|\:|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
  replace: ' $1',
  nbMoved: 1,
  locales: ['fr_FR', 'fr_BE']
}, {
  // Adds a non-breaking space after [«] having no space after
  name: 'noNonBreakingSpaceAfter',
  mask: /(«)(?! | |&nbsp;)/,
  replace: '$1 ',
  nbMoved: 0,
  locales: ['fr_FR', 'fr_BE']
}, {
  // Adds a breaking space after a character from this list [, … ) ]] if this character is followed with another character except [, .] and a number
  name: 'noBreakingSpaceAfter',
  mask: /([\,|\…|\)|\]])(?! | |\.|\,|\d)/,
  replace: '$1 ',
  nbMoved: 1,
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Capitalize the first letter of a sentence
  name: 'capitalizeFirstSentenceLetter',
  mask: /(^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ])|(?<=[\.|\?|\!|\…] )[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/,
  replace: matched => matched.toUpperCase(),
  nbMoved: 0,
  locales: ['fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}, {
  // Removes any space preceding a character from this list [? ! : ; %]
  name: 'spaceBefore',
  mask: /([ | ])(?=[\?|\!|\:|\;|\%])/,
  replace: '',
  nbMoved: -1,
  locales: ['en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB']
}];

// Regular expressions with pairs
const regsWithPair = ['regularToCurlyQuotes', 'regularToFrenchQuotes'];

/***/ }),

/***/ "./src/components/ConsistencyGlobalSettingToggle.js":
/*!**********************************************************!*\
  !*** ./src/components/ConsistencyGlobalSettingToggle.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsistencyGlobalSettingToggle": () => (/* binding */ ConsistencyGlobalSettingToggle)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_controls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app/controls */ "./src/app/controls.js");

/**
 * WordPress dependencies
 */






/**
 * External dependencies
 */

const ConsistencyGlobalSettingToggle = props => {
  const {
    settingSlug,
    settingName,
    settingDescription
  } = props;
  if (!(0,_app_controls__WEBPACK_IMPORTED_MODULE_6__.isUsedByLocale)(settingSlug)) return '';
  const [settings, setSettings] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.useEntityProp)('root', 'site', 'consistency_plugin_settings', undefined);
  const {
    saveEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store);
  const onSettingChanged = value => {
    let newSettings = settings.map(obj => {
      if (settingSlug === obj.slug) {
        return {
          ...obj,
          value: value
        };
      }
      return obj;
    });
    if (!newSettings?.find(x => x.slug === settingSlug)) {
      newSettings.push({
        slug: settingSlug,
        value: value
      });
    }
    setSettings(newSettings);
    saveEditedEntityRecord('root', 'site', undefined, newSettings);
    createNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('info', 'consistency'),
    // Can be one of: success, info, warning, error.
    value ? sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('"%1$s" Correction is enabled', 'consistency'), settingName) : sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('"%1$s" Correction is disabled', 'consistency'), settingName), {
      isDismissible: true,
      type: 'snackbar',
      speak: true
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: settingName,
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      dangerouslySetInnerHTML: settingDescription
    }),
    checked: settings?.find(x => x.slug === settingSlug)?.value || false,
    onChange: onSettingChanged
  }));
};

/***/ }),

/***/ "./src/components/ConsistencyUserSettingToggle.js":
/*!********************************************************!*\
  !*** ./src/components/ConsistencyUserSettingToggle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsistencyUserSettingToggle": () => (/* binding */ ConsistencyUserSettingToggle)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__);

/**
 * WordPress dependencies
 */





const ConsistencyUserSettingToggle = props => {
  const {
    settingSlug,
    settingName,
    settingDescription
  } = props;
  const {
    currentUser
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentUser: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentUser()
    };
  }, []);
  const idUser = currentUser && currentUser.id;
  const [settings, setSettings] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.useEntityProp)('root', 'user', 'meta', idUser);
  const {
    saveEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_5__.store);
  const onSettingChanged = value => {
    // For usermeta, settings= meta
    let newSettings = settings?.consistency_plugin_user_settings.map(obj => {
      if (settingSlug === obj.slug) {
        return {
          ...obj,
          value: value
        };
      }
      return obj;
    });
    if (!newSettings?.find(x => x.slug === settingSlug)) {
      newSettings.push({
        slug: settingSlug,
        value: value
      });
    }
    setSettings({
      ...settings,
      consistency_plugin_user_settings: newSettings
    });
    saveEditedEntityRecord('root', 'user', idUser, {
      ...settings,
      meta: newSettings
    });
    createNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('info', 'consistency'),
    // Can be one of: success, info, warning, error.
    value ? sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('"%1$s" Correction is enabled', 'consistency'), settingName) : sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('"%1$s" Correction is disabled', 'consistency'), settingName), {
      isDismissible: true,
      type: 'snackbar',
      speak: true
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: settingName,
    help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      dangerouslySetInnerHTML: settingDescription
    }),
    checked: settings?.consistency_plugin_user_settings?.find(x => x.slug === settingSlug)?.value || false,
    onChange: onSettingChanged
  });
};

/***/ }),

/***/ "./src/components/Icon.js":
/*!********************************!*\
  !*** ./src/components/Icon.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsistencyIcon": () => (/* binding */ ConsistencyIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const ConsistencyIcon = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      version: "1.1",
      id: "consistency-plugin",
      x: "0px",
      y: "0px",
      width: "24px",
      height: "24px",
      viewBox: "0 0 24 24",
      enableBackground: "new 0 0 24 24"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      x1: "4",
      y1: "20",
      x2: "7",
      y2: "20"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      x1: "14",
      y1: "20",
      x2: "21",
      y2: "20"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      x1: "6.9",
      y1: "15",
      x2: "13.8",
      y2: "15"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("line", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      x1: "10.2",
      y1: "6.3",
      x2: "16",
      y2: "20"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "5,20 11,4 13,4 20,20 "
    }))
  });
};

/***/ }),

/***/ "./src/components/Settings.js":
/*!************************************!*\
  !*** ./src/components/Settings.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarSettings": () => (/* binding */ SidebarSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var _ConsistencyUserSettingToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConsistencyUserSettingToggle */ "./src/components/ConsistencyUserSettingToggle.js");
/* harmony import */ var _ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConsistencyGlobalSettingToggle */ "./src/components/ConsistencyGlobalSettingToggle.js");

/**
 * WordPress dependencies
 */





/**
 * External dependencies
 */



const {
  canUser
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core');
const SidebarSettings = () => {
  const isAdmin = canUser('create', 'users');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
    name: "consistency-custom-sidebar",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Consistency', 'consistency'),
    icon: _Icon__WEBPACK_IMPORTED_MODULE_5__.ConsistencyIcon
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings for my account', 'consistency'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyUserSettingToggle__WEBPACK_IMPORTED_MODULE_6__.ConsistencyUserSettingToggle, {
    settingSlug: "on_the_fly",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('On-the-fly autocorrect', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable/disable on-the-fly autocorrect for my account', 'consistency')
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyUserSettingToggle__WEBPACK_IMPORTED_MODULE_6__.ConsistencyUserSettingToggle, {
    settingSlug: "on_paste",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('On paste autocorrect', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable/disable autocorrect on paste for my account', 'consistency')
    }
  }))), isAdmin && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Global correction rules', 'consistency'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "quote",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Straight quote', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces straight quotes with curved quotes:', 'consistency') + `<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "ellipsis",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ellipsis', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces 3 dots with ellipsis:', 'consistency') + `<span aria-hidden='true' style={ { display: 'block' } }><code>...</code> <span style={ { fontSize: '20px' } }>→</span> <code>…</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "2hyphens",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Two hyphens', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces 2 hyphens with em dash:', 'consistency') + `<span aria-hidden='true' style={ { display: 'block' } }><code>--</code> <span style={ { fontSize: '20px' } }>→</span> <code>—</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "ordinalNumberSuffix",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ordinal number suffix', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add HTML tag sup to ordinal number suffix', 'consistency')
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "regularToCurlyQuotes",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Regular quotes to curly', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces regular quotes with curly quotes:', 'consistency') + `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>“ ”</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "regularToFrenchQuotes",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Regular quotes to french', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces regular quotes with french quotes:', 'consistency') + `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>« »</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "breakingSpace",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Breaking space', 'consistency'),
    settingDescription: {
      __html: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replaces a breaking space followed by a character from this list:%1$s with a non-breaking space', 'consistency'), `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />`)
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "noSpaceBefore",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No space before', 'consistency'),
    settingDescription: {
      __html: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Adds a non-breaking space before a character from this list:%1$s having no space before', 'consistency'), `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />`)
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "noBreakingSpaceAfter",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No breaking space after', 'consistency'),
    settingDescription: {
      __html: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Adds a breaking space after a character from this list:%1$s when followed with another character', 'consistency'), `<br /><code>, … ) ]</code><br />`)
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "noNonBreakingSpaceAfter",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No non breaking space after', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Adds a non-breaking space after open french quote having no space after', 'consistency')
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "spaceBefore",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Space before', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove any space preceding a character from this list:', 'consistency') + `<span style={ { display: 'block' } }><code>? ! : ; %</code></span>`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ConsistencyGlobalSettingToggle__WEBPACK_IMPORTED_MODULE_7__.ConsistencyGlobalSettingToggle, {
    settingSlug: "capitalizeFirstSentenceLetter",
    settingName: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('First sentence letter not capitalized', 'consistency'),
    settingDescription: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Capitalize the first letter of a sentence', 'consistency')
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebarMoreMenuItem, {
    target: "consistency-custom-sidebar"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Consistency Settings', 'consistency')));
};

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Settings */ "./src/components/Settings.js");
/* harmony import */ var _app_fix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/fix */ "./src/app/fix.js");
/* harmony import */ var _app_rules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/rules */ "./src/app/rules.js");
/* harmony import */ var _app_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app/helpers */ "./src/app/helpers.js");
/* harmony import */ var _app_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app/controls */ "./src/app/controls.js");
/* harmony import */ var _app_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app/data */ "./src/app/data.js");
/**
 * WordPress dependencies
 */





/**
 * External dependencies
 */





let contentPasted = false;
let theRegs = [];
const {
  getBlocks,
  getSelectedBlockClientId,
  isTyping,
  getBlockAttributes
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor');
const {
  getEntityRecord
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core');
const {
  updateBlockAttributes
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor');
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('consistency-custom-sidebar', {
  render: _components_Settings__WEBPACK_IMPORTED_MODULE_3__.SidebarSettings
});
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  // This global makes it possible to count the loops on the regex in order to trigger a cut on a possible infinite loop
  __webpack_require__.g.consistencyLoop = 0;
  __webpack_require__.g.consistencyHistoryContent = '';
  __webpack_require__.g.consistencyHistory = false;

  // Fix all blocks in post: only used in content copy/paste
  const fixAll = () => {
    // Get all blocks generated by pasting (which does not integrate innerBlocks)
    const allBlocks = getBlocks();

    // Get all innerBlocks for a later bulk selection process that will generate their fix
    const allInners = (0,_app_helpers__WEBPACK_IMPORTED_MODULE_6__.getAllInnersFromParents)(allBlocks);

    // Fixes all parents blocks
    const updates = allBlocks.reduce((acc, block) => {
      let newContent = block.attributes?.content;
      if (!_app_rules__WEBPACK_IMPORTED_MODULE_5__.processedBlocks.includes(block.name) || undefined === newContent) {
        return acc;
      }
      Object.entries(theRegs).forEach(_ref => {
        let [_, reg] = _ref;
        if ((0,_app_controls__WEBPACK_IMPORTED_MODULE_7__.isUsedByLocale)(reg.name) && _app_rules__WEBPACK_IMPORTED_MODULE_5__.regsWithPair.includes(reg.name)) {
          const singleCharacterOfPair = reg.mask.toString().match(/(?<=\/).+?(?=\/)/g)[0];
          const realReg = new RegExp(`/(?<!\=)${singleCharacterOfPair}(?!>)([^${singleCharacterOfPair}]*)(?<!\=)${singleCharacterOfPair}(?!>)/`, 'g');
          newContent = newContent.replaceAll(realReg, reg.replace);
        }
        if ((0,_app_controls__WEBPACK_IMPORTED_MODULE_7__.isUsedByLocale)(reg.name) && !_app_rules__WEBPACK_IMPORTED_MODULE_5__.regsWithPair.includes(reg.name)) {
          const stringRegex = reg.mask.toString();
          const regWithGlobalFlag = new RegExp(stringRegex.substring(1, stringRegex.length - 1), 'g');
          newContent = newContent.replaceAll(regWithGlobalFlag, reg.replace);
        }
      });
      if (undefined !== newContent) {
        acc[block.clientId] = {
          content: newContent
        };
      }
      return acc;
    }, {});

    // Update all parents blocks
    if (Object.keys(updates).length && contentPasted) {
      contentPasted = false;
      updateBlockAttributes(Object.keys(updates), updates, true);
    }
    contentPasted = false;

    // Select all innerBlocks to trigger their correction, then deselect all by selecting the first block
    const isPasting = true;
    allInners.forEach(block => {
      if (!_app_rules__WEBPACK_IMPORTED_MODULE_5__.processedBlocks.includes(block.name)) return;
      const currentBlockId = block.clientId;
      block?.clientId && (0,_app_fix__WEBPACK_IMPORTED_MODULE_4__.fixIt)({
        currentBlockId,
        theRegs,
        isPasting
      });
    });
  };

  // Intercept clipboard paste to fix all new blocks
  document.querySelector('#editor')?.addEventListener('paste', e => {
    contentPasted = true;
    e.preventDefault();
  });

  // Intercept CTRL Z to cancel next fix
  document.querySelector('#editor')?.addEventListener('keydown', e => {
    if (90 === e.keyCode && (e.ctrlKey || e.metaKey)) {
      __webpack_require__.g.consistencyHistory = true;
      e.preventDefault();
    }
  });

  // Let’s listen for state changes
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(() => {
    // Get current user settings
    const {
      onTheFly,
      onPaste
    } = (0,_app_data__WEBPACK_IMPORTED_MODULE_8__.getCurrentUserSettings)();

    // If everything is disabled, nothing is done
    if (!onTheFly && !onPaste) return;

    // Get Global settings from site entity
    const siteEntity = getEntityRecord('root', 'site');
    const settings = siteEntity?.consistency_plugin_settings;
    if (undefined === settings) return;

    // Get the regex of all rules
    theRegs = _app_rules__WEBPACK_IMPORTED_MODULE_5__.regs.filter(reg => true === settings?.find(s => s.slug === reg.name)?.value);

    // Manage clipboard and fix all blocks
    if (contentPasted && onPaste) {
      fixAll();
      return;
    }

    // Get current selected block
    const currentBlockId = getSelectedBlockClientId();

    // Stop here if everything is disabled
    if (null === currentBlockId || contentPasted || !onTheFly) return;

    // Don't try to fix block content if nothing has changed
    const blockAttributes = getBlockAttributes(currentBlockId);
    if (blockAttributes.hasOwnProperty('content') && __webpack_require__.g.consistencyHistoryContent === blockAttributes.content) {
      return;
    }
    __webpack_require__.g.consistencyHistoryContent = blockAttributes.content;

    // Fixes the typography of current selected block
    const isPasting = false;
    theRegs && isTyping() && (0,_app_fix__WEBPACK_IMPORTED_MODULE_4__.fixIt)({
      currentBlockId,
      theRegs,
      isPasting
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map