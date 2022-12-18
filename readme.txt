=== Consistency ===
Contributors: webaxones
Tags: block editor, typography
Requires at least: 5.9
Tested up to: 6.1
Stable tag: 1.0.2
Requires PHP: 7.3 or higher
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Corrects the input of text content in the Block Editor according to the configured typographical rules.

== Description ==

The purpose of this plugin is to provide a tool allowing administrators to define typographical rules in order to maintain typographical consistency in the text contents entered on the editor.
The corrections are automatic and are made during the entry as well as on a copy paste.
Autocorrect rules can be enabled/disabled by any user.
Autocorrect is available on pages, posts and custom post types (if their configuration allows Rest API usage)

Currently, the AutoCorrects offered are as follows:
- Replace straight quote with curly quote
- Replaces 3 successive dots with ellipsis
- Replace a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space

Technically, rules are saved in the wp_options table, while active/inactive states are saved as user meta data.
This data is deleted when the plugin is uninstalled.

Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

== Screenshots ==

1. Plugin settings sidebar in the Block Editor.

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Changelog ==

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