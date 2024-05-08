/**
 * Summary: SidebarSettings component.
 * 
 * @description This file contains the SidebarSettings component used to display the plugin's settings sidebar in editor.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post'
import { PanelBody, PanelRow } from '@wordpress/components'
import { select } from '@wordpress/data'

/**
 * External dependencies
 */
import { ConsistencyIcon } from './Icon'
import { ConsistencyUserSettingToggle } from './ConsistencyUserSettingToggle'
import { ConsistencyGlobalSettingToggle } from './ConsistencyGlobalSettingToggle'

const { canUser } = select( 'core' )

export const SidebarSettings = () => {
	const isAdmin = canUser( 'create', 'users' )

    return(
        <>
            <PluginSidebar
                name='consistency-custom-sidebar'
                title={ __( 'Consistency', 'consistency' ) }
				icon={ ConsistencyIcon }
            >
				<PanelBody
					title={ __( 'Settings for my account', 'consistency' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ConsistencyUserSettingToggle
							settingSlug='on_the_fly' 
							settingName={ __( 'On-the-fly autocorrect', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Enable/disable on-the-fly autocorrect for my account', 'consistency' )
								} }
						/>
					</PanelRow>
					<PanelRow>
						<ConsistencyUserSettingToggle
							settingSlug='on_paste' 
							settingName={ __( 'On paste autocorrect', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Enable/disable autocorrect on paste for my account', 'consistency' )
								} }
						/>
					</PanelRow>
				</PanelBody>
				{ isAdmin && 
					<PanelBody
						title={ __( 'Global correction rules', 'consistency' ) }
						initialOpen={ false }
					>
						<ConsistencyGlobalSettingToggle
							settingSlug='quote' 
							settingName={ __( 'Straight quote', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces straight quotes with curved quotes:', 'consistency' )
									+ `<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='ellipsis' 
							settingName={ __( 'Ellipsis', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces 3 dots with ellipsis:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>...</code> <span style={ { fontSize: '20px' } }>→</span> <code>…</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='2hyphens' 
							settingName={ __( 'Two hyphens', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces 2 hyphens with em dash:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>--</code> <span style={ { fontSize: '20px' } }>→</span> <code>—</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='ordinalNumberSuffix' 
							settingName={ __( 'Ordinal number suffix', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Add HTML tag sup to ordinal number suffix', 'consistency' )
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='regularToCurlyQuotes' 
							settingName={ __( 'Regular quotes to curly', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with curly quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>“ ”</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='regularToGermanQuotes' 
							settingName={ __( 'Regular quotes to german', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with german quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>„ “</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='regularToGermanBookStyleQuotes' 
							settingName={ __( 'Regular quotes to german book-style quotes', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with german book-style quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>» «</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='regularToFrenchQuotes' 
							settingName={ __( 'Regular quotes to french', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with french quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>« »</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='regularToFrenchQuotesWithoutSpaces' 
							settingName={ __( 'Regular quotes to french quotes without spaces', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with french quotes without spaces:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>« »</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle 
							settingSlug='breakingSpace' 
							settingName={ __( 'Breaking space', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Replaces a breaking space followed by a character from this list:%1$s with a non-breaking space', 'consistency' )
									, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` )
								} }
						/>
						<ConsistencyGlobalSettingToggle 
							settingSlug='noSpaceBefore' 
							settingName={ __( 'No space before', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Adds a non-breaking space before a character from this list:%1$s having no space before', 'consistency' )
									, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` )
								} }
						/>
						<ConsistencyGlobalSettingToggle 
							settingSlug='noBreakingSpaceAfter' 
							settingName={ __( 'No breaking space after', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Adds a breaking space after a character from this list:%1$s when followed with another character', 'consistency' )
									, `<br /><code>, … ) ]</code><br />` )
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='noNonBreakingSpaceAfter' 
							settingName={ __( 'No non breaking space after', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Adds a non-breaking space after open french quote having no space after', 'consistency' )
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='spaceBefore' 
							settingName={ __( 'Space before', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Remove any space preceding a character from this list:', 'consistency' )
									+ `<span style={ { display: 'block' } }><code>? ! : ; %</code></span>`
								} }
						/>
						<ConsistencyGlobalSettingToggle
							settingSlug='capitalizeFirstSentenceLetter' 
							settingName={ __( 'First sentence letter not capitalized', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Capitalize the first letter of a sentence', 'consistency' )
								} }
						/>
					</PanelBody>
				}
            </PluginSidebar>
            <PluginSidebarMoreMenuItem target='consistency-custom-sidebar'>
				{ __( 'Consistency Settings', 'consistency' ) }
			</PluginSidebarMoreMenuItem>
        </>
    )
}
