=== Consistency – Typographical Corrector for Gutenberg ===
Contributors: webaxones
Tags: block editor, typography, gutenberg
Requires at least: 6.1
Tested up to: 6.5.2
Stable tag: 1.5.9
Requires PHP: 7.4
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Corrects the input of text content in the Block Editor according to the configured typographical rules.

== Description ==

Do you see the typographic corrector in your word processor that formats what you type in real time? Well, it's the same idea but with Gutenberg.

This WordPress plugin is designed to help administrators enforce consistent typography in text content entered in the editor.
Corrections are applied automatically both during text entry and when pasting text.
Users can enable or disable autocorrect rules as needed.
Autocorrect is available for pages, posts, and custom post types (if they are configured to use the Rest API).

Automatic fixes are listed on [the plugin repository on github](https://github.com/webaxones/consistency/).



Ctrl+Z or Cmd+Z right after a correction disables the correction for the next keystroke

Technically, rules are saved in the wp_options table, while active/inactive states are saved as user meta data.
This data is deleted when the plugin is uninstalled.

Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

The locales supported by this plugin are:
'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB', 'de_DE', 'de_AT', 'de_CH', 'ro_RO'

== Screenshots ==

1. Rules specific to the English language and correction of a copy-pasted text.
1. Rules specific to the French language and correction on the fly.

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Changelog ==

= 1.5.9 =
* Add rule for percentages symbols
* Refactor some code
* Actualise Readme

= 1.5.8 =
* Add rule for fraction symbols

= 1.5.7 =
* Fix for last rule

= 1.5.6 =
* Fix for version number

= 1.5.5 =
* Add rule to replace curly quotes with french quotes for fr_FR & fr_BE because Google Doc transforms double quotes into curved quotes, but does not offer French quotes

= 1.5.4 =
* Sort settings by categories in sidebar
* Add some rules for symbols
* Fix settings saving that was broken in last version

= 1.5.3 =
* Fix missing stable tag

= 1.5.2 =
* Fix missing autoload vendor

= 1.5.1 =
* Fix for forgotten PHP locale rules update
* Adds GitHub Action for deploy
* Adds blueprint for WordPress Playground

= 1.5.0 =
* Fix SVN problem

= 1.4.9 =
* Fix requires PHP tag

= 1.4.8 =
* Code refactoring
* Adds first level of support for German and Romanian locales

= 1.4.7 =
* Fix a regex parsing bug for quotes on pasted text (no need to use / character with template literals)
* Fix a compatibility problem with Otter block by removing the e.preventDefault from the paste event detection (blocked copy/paste content within blocks like embed, HTML...)
* Fix PHP bug with currentUser authCallBack that prevented to save User Settings
* Upgrade @wordpress/scripts to 27.8.0 and @wordpress/compose to 6.34.0
* Updated for WordPress 6.5.2

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

