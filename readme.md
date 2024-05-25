# Consistency

[![release](https://badgen.net/github/tag/webaxones/consistency)](https://wordpress.org/plugins/consistency/) [![wordpress](https://badgen.net/badge/wordpress/6.1+/green)](https://wordpress.org/plugins/consistency/) [![php](https://badgen.net/badge/php/7.4+/green)](https://wordpress.org/plugins/consistency/)

Fixes typographical errors when typing in the WordPress editor.  

Do you see the typographic corrector in your word processor that formats what you type in real time? Well, it's the same idea but with Gutenberg.
  
See [WordPress directory page](https://wordpress.org/plugins/consistency/).

## Installation

From your WordPress dashboard, visit Plugins > Add New.  
Search for 'Consistency'.  
Click on the 'Install Now' button.  
Then 'Activate'.

## How to use it?  

**Consistency** is installed with built-in rules based on the site's default language.  
These rules can be modified by the administrator(s).  
In addition, each user can decide whether or not to activate automatic correction.  
And all the settings are accessible directly under the editor.  

From the 'Options menu', clicking on the **Consistency Settings** menu brings up the plugin options page.  

Clicking on the star will pin the **Consistency** sidebar, but it is not mandatory.  

At the top are the settings for the current user.  
Below are the global settings that you can view and modify if you are an administrator.  
Remember to unfold the panel to see the rules.  



## Description

The purpose of this plugin is to provide a tool allowing administrators to define typographical rules in order to maintain typographical consistency in the text contents entered on the editor.  
> [!IMPORTANT]The corrections are automatic and are made during the entry as well as on a copy paste.  

Autocorrect rules can be enabled/disabled by any user.
Autocorrect is available on pages, posts and custom post types (if their configuration allows Rest API usage)

Currently, the AutoCorrects offered are as follows:

| Name | Description | Example | Locales |
| --- | --- | :---: | --- |
| *Straight quote* | Replaces straight quotes with curved quotes | `'` → `'` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` |
| *Two hyphens* | Replaces 2 hyphens with em dash | `--` → `—` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *Ordinal number suffix* | Add HTML tag sup to ordinal number suffix | `1st` → 1<sup>st</sup> | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` |
| *Curly quotes* | Replaces regular quotes with curly quotes | `" "` → `“ ”` | `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` |
| *Regular quotes to german* | Replaces regular quotes with german quotes | `" "` → `„ “` | `de_DE` `de_AT` `ro_RO` |
| *Regular quotes to german book-style quotes* | Replaces regular quotes with german book-style quotes | `" "` → `» «` | `de_DE` `de_AT` |
| *Regular quotes to french* | Replaces regular quotes with french quotes | `" "` → `«   »` | `fr_FR` `fr_BE` |
| *Regular quotes to french quotes without spaces* | Replaces regular quotes with french quotes without spaces | `" "` → `« »` | `de_CH` |
| *Curly quotes to french quotes* | Replaces curly quotes with french quotes | `“ ”` → `«   »` | `fr_FR` `fr_BE` |
| *Breaking space* | Replaces a breaking space followed by a character from this list with a non-breaking space: | `? ! : ; » € $ £ ¥ ₽ 元 %` | `fr_FR` `fr_BE` |
| *No space before* | Adds a non-breaking space before a character from this list having no space before: | `? ! : ; » € $ £ ¥ ₽ 元 %` | `fr_FR` `fr_BE` |
| *Space before* | Remove any space preceding a character from this list: | `? ! : ; %` | `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *No breaking space after* | Adds a breaking space after a character from this list when followed with another character: | `, … ) ]` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` |
| *No non breaking space after* | Adds a non-breaking space after open french quote having no space after | `«` → `« ` | `fr_FR` `fr_BE` |
| *First sentence letter not capitalized* | Capitalize the first letter of a sentence | `a é ș` → `A É Ș` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *3 dots following "etc"* | Replaces 3 dots placed after the abbreviation "etc" with a point | `etc...` → `etc.` | `fr_FR` `fr_BE` |
| *2 dots following "etc"* | Replaces 2 dots placed after the abbreviation "etc" with a point | `etc..` → `etc.` | `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` |
| *Ellipsis following "etc"* | Replaces ellipsis placed after the abbreviation "etc" with a point | `etc…` → `etc.` | `fr_FR` `fr_BE` |
| *Ellipsis* | Replaces 3 dots with ellipsis | `...` → `…` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *Symbol in a circle* | Replaces 1 character placed in parentheses with a symbol | `(c) (p) (r)` → `© ℗ ®` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *Symbol in small caps and superscript style* | Replaces 2-character abbreviations with a symbol in small caps and superscript style | `tm sm md mc` → `™ ℠ 🅫 🅪` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *Fractions* | Replaces fractions with fraction symbols | `1/2 3/5 1/9` → `½ ⅗ ⅑` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |
| *Percentages* | Replaces percentages with percentages symbols | `0/0 0/00 0/000` → `% ‰ ‱` | `fr_FR` `fr_BE` `en_US` `en_AU` `en_CA` `en_NZ` `en_ZA` `en_GB` `de_DE` `de_AT` `de_CH` `ro_RO` |

    
> [!TIP]
> **Ctrl+Z** or **Cmd+Z** right after a correction disables the correction for the next keystroke. It is thus possible to force the non-correction of a character.

Technically, rules are saved in the `wp_options` table, while active/inactive states are saved as user meta data in `wp_usermeta` table.
This data is deleted when the plugin is uninstalled.

Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

## Smoke tests

[![WP compatibility](https://plugintests.com/plugins/wporg/consistency/wp-badge.svg)](https://plugintests.com/plugins/wporg/consistency/latest) [![PHP compatibility](https://plugintests.com/plugins/wporg/consistency/php-badge.svg)](https://plugintests.com/plugins/wporg/consistency/latest)

