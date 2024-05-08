/**
 * Summary: Consistency Logo.
 * 
 * @description This file contains the Consistency Logo component used to display the plugin's settings sidebar in editor.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components'

export const ConsistencyIcon = () => {
	return(
		<Icon icon={ <svg version="1.1" id="consistency-plugin" x="0px" y="0px"	width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24"><line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="4" y1="20" x2="7" y2="20"/><line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="14" y1="20" x2="21" y2="20"/><line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="6.9" y1="15" x2="13.8" y2="15"/><line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="10.2" y1="6.3" x2="16" y2="20"/><polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="5,20 11,4 13,4 20,20 "/></svg> } />
	)
}

