=== Consistency – Typographical Corrector for Gutenberg ===
Contributors: webaxones
Tags: block editor, typography, gutenberg
Requires at least: 6.1
Tested up to: 6.2
Stable tag: 1.4.5
Requires PHP: 7.4 or higher
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Corrects the input of text content in the Block Editor according to the configured typographical rules.

== Description ==

The purpose of this plugin is to provide a tool allowing administrators to define typographical rules in order to maintain typographical consistency in the text contents entered on the editor.
The corrections are automatic and are made during the entry as well as on a copy paste.
Autocorrect rules can be enabled/disabled by any user.
Autocorrect is available on pages, posts and custom post types (if their configuration allows Rest API usage)

Currently, the AutoCorrects offered are as follows:

For the English language

- "Straight quote": Replaces straight quotes with curved quotes
- "Ellipsis": Replaces 3 dots with ellipsis
- "Two hyphens": Replaces 2 hyphens with em dash
- "Ordinal number suffix": Add HTML tag sup to ordinal number suffix
- "Regular quotes to curly": Replaces regular quotes with curly quotes
- "No breaking space after": Adds a breaking space after a character from this list (, … ) ]) when followed with another character
- "Space before": Remove any space preceding a character from this list (? ! : ; %)
- "First sentence letter not capitalized": Capitalize the first letter of a sentence

For the French language

- "Straight quote": Replaces straight quotes with curved quotes
- "Ellipsis": Replaces 3 dots with ellipsis
- "Two hyphens": Replaces 2 hyphens with em dash
- "Ordinal number suffix": Add HTML tag sup to ordinal number suffix
- "Regular quotes to French": Replaces regular quotes with French quotes
- "Breaking space": Replaces a breaking space followed by a character from this list (? ! : ; » € $ £ ¥ ₽ 元 %) with a non-breaking space
- "No space before": Adds a non-breaking space before a character from this list (? ! : ; » € $ £ ¥ ₽ 元 %) having no space before
- "No breaking space after": Adds a breaking space after a character from this list (, … ) ]) when followed with another character
- "No non-breaking space after": Adds a non-breaking space after open french quote having no space after
- "First sentence letter not capitalized": Capitalize the first letter of a sentence

Ctrl+Z or Cmd+Z right after a correction disables the correction for the next keystroke

Technically, rules are saved in the wp_options table, while active/inactive states are saved as user meta data.
This data is deleted when the plugin is uninstalled.

Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

== Screenshots ==

1. Rules specific to the English language and correction of a copy-pasted text.
1. Rules specific to the French language and correction on the fly.

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Changelog ==

= 1.4.5 =
* Fix a regex parsing bug on link insertion because the fetched content had changed and contained the HTML tags
* Fix the processing of capital letters at the beginning of a sentence which did not take into account question marks, exclamation marks and ellipsis
* Removes CODE, PRE, KBD tags and their content from scanned content

= 1.4.4 =
* Fix composer package check

= 1.4.3 =
* Fix version number

= 1.4.2 =
* Plugin requires PHP: 7.4 or higher

= 1.4.1 =
* Plugin stops supporting an End of life version of PHP: Requires PHP: 8.0 or higher

= 1.4.0 =
* Code goes to OOP

= 1.3.1 =
* Spelling corrections

= 1.3.0 =
* New correction added: "First sentence letter not capitalized"
* Cancellation management: Ctrl+Z or Cmd+Z right after a correction disables the correction for the next keystroke
* Code improvements

= 1.2.2 =
* Replace multiple components with one

= 1.2.1 =
* Fix: remove concat from getAllInnersFromParents

= 1.2.0 =
* New corrections added: "Two hyphens", "Ordinal number suffix", "No breaking space after", "No non-breaking space after", "No breaking space after"
* Autocorrect is now also done on innerBlocks like list items, on the fly as well as copy-paste 

= 1.1.1 =
* Remove special characters from readme since they are transformed on wp org

= 1.1.0 =
* Locales management: English and French for now. Rules are automatically selected but can be modified by an admin
* Replacement of notices with self-hiding snackbars
* Code improvements
* Replacement of screenshots with animated gifs to show the process even if it is discreet.

= 1.0.4 =
* Finally fixed the translation bug: it was an extra slash to plugin_dir_path

= 1.0.3 =
* Next try to fix translations by adding wp_set_script_translations

= 1.0.2 =
* Fixed translation problem and replace get_locale with current active locale

= 1.0.1 =
* Implementation of the preparation for the management of the different locales
* Added more currencies to regex
* Changed PHP min requirements for PHP 7.3 or higher and open by default both settings panels
* Improved texts with the help of Vlad Timotei, aka @vlad-timotei aka aka Baby Yoda
* Improved the banner and fix bad help message for non breaking/breaking spaces toggle control

= 1.0.0 =

* Plugin initial commit. Let's write =^.^=

