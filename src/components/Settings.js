import { __ } from '@wordpress/i18n'
import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post'
import { PanelBody, PanelRow } from '@wordpress/components'
import { ConsistencyIcon } from './Icon'
import { ConsistencySettingState } from './ConsistencySettingState'
import { ConsistencySettingCorrectionToggle } from './ConsistencySettingCorrectionToggle'
import { select } from '@wordpress/data'

const { canUser } = select( 'core' )

export const SidebarSettings = () => {
	const isAdmin = canUser( 'create', 'users' )

    return(
        <>
            <PluginSidebar
                name="consistency-custom-sidebar"
                title={ __( 'Consistency Settings', 'consistency' ) }
				icon={ ConsistencyIcon }
            >
				<PanelBody
					title={ __( 'Status', 'consistency' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ConsistencySettingState />
					</PanelRow>
				</PanelBody>
				{ isAdmin && 
					<PanelBody
						title={ __( 'Global Corrections', 'consistency' ) }
						initialOpen={ true }
					>
						<ConsistencySettingCorrectionToggle
							settingSlug='quote' 
							settingName={ __( 'Straight quote', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces straight quotes with curved quotes:', 'consistency' )
									+ `<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>`
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='ellipsis' 
							settingName={ __( 'Ellipsis', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces 3 dots with ellipsis:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>...</code> <span style={ { fontSize: '20px' } }>→</span> <code>…</code></span>`
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='2hyphens' 
							settingName={ __( 'Two hyphens', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces 2 hyphens with em dash:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>--</code> <span style={ { fontSize: '20px' } }>→</span> <code>—</code></span>`
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='ordinalNumberSuffix' 
							settingName={ __( 'Ordinal number suffix', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Add HTML tag sup to ordinal number suffix', 'consistency' )
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='regularToCurlyQuotes' 
							settingName={ __( 'Regular quotes to curly', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with curly quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>“ ”</code></span>`
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='regularToFrenchQuotes' 
							settingName={ __( 'Regular quotes to french', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Replaces regular quotes with french quotes:', 'consistency' )
									+ `<span aria-hidden='true' style={ { display: 'block' } }><code>" "</code> <span style={ { fontSize: '20px' } }>→</span> <code>« »</code></span>`
								} }
						/>
						<ConsistencySettingCorrectionToggle 
							settingSlug='breakingSpace' 
							settingName={ __( 'Breaking space', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Replaces a breaking space followed by a character from this list:%1$s with a non-breaking space', 'consistency' )
									, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` )
								} }
						/>
						<ConsistencySettingCorrectionToggle 
							settingSlug='noSpaceBefore' 
							settingName={ __( 'No space before', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Adds a non-breaking space before a character from this list:%1$s having no space before', 'consistency' )
									, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` )
								} }
						/>
						<ConsistencySettingCorrectionToggle 
							settingSlug='noBreakingSpaceAfter' 
							settingName={ __( 'No breaking space after', 'consistency' ) }
							settingDescription={ {
								__html: sprintf( __( 'Adds a breaking space after a character from this list:%1$s when followed with another character', 'consistency' )
									, `<br /><code>, … ) ]</code><br />` )
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='noNonBreakingSpaceAfter' 
							settingName={ __( 'No non breaking space after', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Adds a non-breaking space after open french quote having no space after', 'consistency' )
								} }
						/>
						<ConsistencySettingCorrectionToggle
							settingSlug='spaceBefore' 
							settingName={ __( 'Space before', 'consistency' ) }
							settingDescription={ {
								__html: __( 'Remove any space preceding a character from this list:', 'consistency' )
									+ `<span style={ { display: 'block' } }><code>? ! : ; %</code></span>`
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
