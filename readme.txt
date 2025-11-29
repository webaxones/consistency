=== Consistency – Typography Corrector for Gutenberg ===
Contributors: webaxones
Tags: punctuation, typography, block editor, gutenberg
Requires at least: 6.1
Tested up to: 6.9
Stable tag: 1.8.5
Requires PHP: 7.4
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Corrects the input of text content in the Block Editor according to the configured typographic and punctuation rules.

== Description ==

Have you seen the typographic corrector in your word processor that formats what you type in real time? Well, it's the same idea but with Gutenberg.

This WordPress plugin ensures consistent typography and punctuation on your site.
Corrections are applied automatically both during text entry and when pasting text.

All users can choose to enable or disable corrections, but only administrators can configure the correction rules.
Autocorrect is available for pages, posts, and custom post types (if they are configured to use the Rest API).
The available automatic corrections are listed on [the plugin repository on github](https://github.com/webaxones/consistency/) and are categorized as follows: Apostrophes, Quotation Marks, Dashes, Suffixes, Spaces, Case, Ellipsis, Symbols.

Pressing Ctrl+Z or Cmd+Z immediately after a correction disables the correction for the next keystroke.

== Technical Informations ==

**Data Storage**: Rules are saved in the wp_options table, while active/inactive states are saved as user meta data.
This data is deleted when the plugin is uninstalled.

**Settings Location**: Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

**Supported Locales**: The locales supported by this plugin are:
fr_FR, fr_BE, en_US, en_AU, en_CA, en_NZ, en_ZA, en_GB, de_DE, de_AT, de_CH, ro_RO

If your locale is not supported by Consistency but you still want to access all available rules, you can disable the localization of rules via a filter. Add this to your theme's functions.php file:
`
add_filter( 'Consistency\only_show_locale_correction_rules', '__return_false' );
`
All correction rules will then appear, with automatic management of rule incompatibilities (if rule A is enabled and it is incompatible with rule B, rule B will be grayed out).

== Screenshots ==

1. Actions Settings: These settings can be seen and modified by all user roles, unlike the following ones relating to correction rules which can only be seen and modified by an administrator role.
2. Apostrophes
3. Quotation marks
4. Dashes
5. Suffixes
6. Spaces
7. Case
8. Ellipsis
9. Symbols

== Installation ==

1. Install the plugin and activate.
2. Configure the rules in the editor.

== Frequently Asked Questions ==

= Does this plugin modify my content? =

Yes, the saved content will be the one modified by the plugin, but you can see the changes being made in real time and you can choose to accept or reject them.

= Will this plugin slow down my page loading time? =

Absolutely not, since nothing is done on the front end. The processing only occurs when you enter content.


== Changelog ==

= 1.8.5 =
* Fix: readme.

= 1.8.4 =
* Fix: settings saving reliability.
* Fix: sprintf compatibility for WordPress 6.9.

= 1.8.3 =
* Add: Indicate compatibility with WordPress 6.8

= 1.8.2 =
* Fix: Fix cursor repositionning which was buggy since wp6.6
* Fix: Disable number suffix correction while waiting to recode it using formats
* Add: Indicate compatibility with WordPress 6.7

= 1.8.1 =
* Fix: Resolves incompatibilities with block plugins such as Kadence, GeneratePress, etc.
* Fix: Fix the names of enabled or disabled rules in the notices

= 1.8.0 =
* Update: code refactoring (replace global variables with global context, some functions with custom hooks, and allow to process more blocks)

See [changelog.txt](https://plugins.svn.wordpress.org/consistency/trunk/changelog.txt) for older changelog
