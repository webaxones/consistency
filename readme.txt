=== Consistency – Typography Corrector for Gutenberg ===
Contributors: webaxones
Tags: block editor, typography, gutenberg
Requires at least: 6.1
Tested up to: 6.6
Stable tag: 1.6.4
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

1. Apostrophes
2. Quotation marks
3. Dashes
4. Suffixes
5. Spaces
6. Case
7. Ellipsis
8. Symbols

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Changelog ==

= 1.6.4 =
* Fix: Fix name of plugin and add some screenshots

= 1.6.3 =
* Fix: Update plugin description, changelog, and stable tag

= 1.6.2 =
* Add: Update readme

= 1.6.1 =
* Fix: Remove vendor subdirectories from git

= 1.6.0 =
* Fix: Refactor some code: Rename Rules class to Languages
* Fix: Decouple Languages and rules
* Fix: Fix Paste event interception since Editor location depends on custom fields status (if they are not activated, Editor is loaded in an iframe)
* Fix: Separate old changelog and new logs in 2 files

= 1.5.9 =
* Add rule for percentages symbols
* Refactor some code
* Actualise Readme

See [changelog.txt](https://plugins.svn.wordpress.org/consistency/trunk/changelog.txt) for older changelog