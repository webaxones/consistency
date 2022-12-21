import { registerPlugin } from '@wordpress/plugins'
import { subscribe, select, dispatch } from '@wordpress/data'
import { store as coreStore } from '@wordpress/core-data'
import domReady from '@wordpress/dom-ready'
import { regs, processedBlocks } from './rules'
import { SidebarSettings } from './settings'
import { fixIt } from './fix'
import { isUsedByLocale } from './app/helpers'

let contentPasted = false

let theRegs = []

const { getBlocks, getSelectedBlockClientId } = select( 'core/block-editor' )
const { getEntityRecord } = select( 'core' )
const { updateBlockAttributes } = dispatch( 'core/block-editor' )

registerPlugin( 'consistency-custom-sidebar', {
    render: SidebarSettings,
} )

domReady( () => {

	// Fixes the typography of all blocks in the post that are part of the intended list named "processedBlocks"
	const fixAll = () => {
		const allBlocks = getBlocks()

		const updates = allBlocks.reduce( ( acc, block ) => {
			let newContent = block.attributes?.content

			Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {

				if ( processedBlocks.includes( block.name ) 
					&& 'undefined' !== typeof( newContent )
					&& isUsedByLocale( reg.name ) ) {
					newContent = newContent.replaceAll( reg.mask, reg.replace )
				}

			} )

			acc[ block.clientId ] = { content: newContent }
			return acc
		}, {} )

		if ( Object.keys( updates ).length && contentPasted ) {
			contentPasted = false
			updateBlockAttributes( Object.keys( updates ), updates, true )
		}
	}

	// Intercept clipboard paste to fix all new blocks
	document.querySelector( ' #editor ' )?.addEventListener( 'paste', e => {
		contentPasted = true
		e.preventDefault()
	} )

	// Let’s listen for state changes
	subscribe( () => {

		// Check if consistency is active for current user
		const currentUser = select( coreStore ).getCurrentUser()
		const idUser = currentUser?.id || 0
		const currentUserEntity = getEntityRecord( 'root', 'user', idUser, 'consistency_plugin_setting_state' )
		if ( ! currentUserEntity?.meta?.consistency_plugin_setting_state[0] ) return

		// Get Global settings from site entity
		const siteEntity = getEntityRecord( 'root', 'site' )
		const settings = siteEntity?.consistency_plugin_settings
		if ( undefined === settings ) return
	
		theRegs = regs.filter( reg => true === settings?.find( s => s.slug === reg.name )?.value )

		// Manage clipboard and fix all pasted blocks (in fact, all blocks but others must have already been fixed)
		if ( contentPasted ) {
			fixAll()
			return
		}

		const currentBlockId = getSelectedBlockClientId()
		if ( null === currentBlockId ) return

		// Fixes the typography of current selected block
		theRegs && fixIt( { currentBlockId, theRegs } )
		
	} )
} )
