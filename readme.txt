=== Consistency ===
Contributors: webaxones
Tags: block editor, typography
Requires at least: 5.9
Tested up to: 6.1
Stable tag: 1.0.0
Requires PHP: 8.0
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Corrects the input of textual content in the block editor according to the configured typographical rules.

== Description ==

The purpose of this plugin is to provide a tool allowing administrators to define typographical rules in order to maintain typographical consistency in the textual contents entered on the editor.
The corrections are automatic and are made during the entry as well as on a copy paste.
Autocorrect can always be disabled by the user.
Autocorrect is available on pages and posts (and custom posts depending on args)

Currently, the AutoCorrects offered are as follows:
- Replace straight quote (') with curly quote (’)
- Replaces 3 successive dots (...) with ellipsis (…)
- Replace a breaking space followed by a character from this list [? ! : € $ %] with a non-breaking space

Technically, rules parameters are saved in settings, while activation parameter is saved in user meta.
This data is deleted when the plugin is uninstalled.

All the settings are directly in a plugin sidebar under the block editor: no more searching for an options page, always available and discreet.

== Screenshots ==

1. Plugin settings sidebar in the block editor.

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Changelog ==

= 1.0.0 =

* Plugin initial commit. Let's write =^.^=