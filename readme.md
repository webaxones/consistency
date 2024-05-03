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

![image](https://user-images.githubusercontent.com/17084006/216155475-0a85f34d-89dc-4365-9aed-23ca401dde14.png)



## Description

The purpose of this plugin is to provide a tool allowing administrators to define typographical rules in order to maintain typographical consistency in the text contents entered on the editor.
The corrections are automatic and are made during the entry as well as on a copy paste.
Autocorrect rules can be enabled/disabled by any user.
Autocorrect is available on pages, posts and custom post types (if their configuration allows Rest API usage)

Currently, the AutoCorrects offered are as follows:

### English language corrections

- **Straight quote**: Replaces straight quotes with curved quotes
- **Ellipsis**: Replaces 3 dots with ellipsis
- **Two hyphens**: Replaces 2 hyphens with em dash
- **Ordinal number suffix**: Add HTML tag sup to ordinal number suffix
- **Regular quotes to curly**: Replaces regular quotes with curly quotes
- **No breaking space after**: Adds a breaking space after a character from this list (, … ) ]) when followed with another character
- **Space before**: Remove any space preceding a character from this list (? ! : ; %)
- **First sentence letter not capitalized**: Capitalize the first letter of a sentence

### French language corrections

- **Straight quote**: Replaces straight quotes with curved quotes
- **Ellipsis**: Replaces 3 dots with ellipsis
- **Two hyphens**: Replaces 2 hyphens with em dash
- **Ordinal number suffix**: Add HTML tag sup to ordinal number suffix
- **Regular quotes to French**: Replaces regular quotes with French quotes
- **Breaking space**: Replaces a breaking space followed by a character from this list (? ! : ; » € $ £ ¥ ₽ 元 %) with a non-breaking space
- **No space before**: Adds a non-breaking space before a character from this list (? ! : ; » € $ £ ¥ ₽ 元 %) having no space before
- **No breaking space after**: Adds a breaking space after a character from this list (, … ) ]) when followed with another character
- **No non-breaking space after**: Adds a non-breaking space after open french quote having no space after
- **First sentence letter not capitalized**: Capitalize the first letter of a sentence

**Ctrl+Z** or **Cmd+Z** right after a correction disables the correction for the next keystroke. It is thus possible to force the non-correction of a character.

Technically, rules are saved in the `wp_options` table, while active/inactive states are saved as user meta data in `wp_usermeta` table.
This data is deleted when the plugin is uninstalled.

Settings are directly in a plugin sidebar under the Block Editor: no more searching for an options page, always available and discreet.

## Smoke tests

[![WP compatibility](https://plugintests.com/plugins/wporg/consistency/wp-badge.svg)](https://plugintests.com/plugins/wporg/consistency/latest) [![PHP compatibility](https://plugintests.com/plugins/wporg/consistency/php-badge.svg)](https://plugintests.com/plugins/wporg/consistency/latest)

