import { __ } from '@wordpress/i18n'
import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post'
import { PanelBody, PanelRow } from '@wordpress/components'
import { ConsistencyIcon, ConsistencySettingState, ConsistencySettingQuote, ConsistencySettingEllipsis,
		ConsistencySettingEmDash, ConsistencySettingOrdinalNumberSuffix, ConsistencySettingBreakingSpace, ConsistencySettingRegularToCurlyQuotes,
		ConsistencySettingRegularToFrenchQuotes, ConsistencySettingNoSpaceBefore,
		ConsistencySettingNoBreakingSpaceAfter, ConsistencySettingSpaceBefore, ConsistencySettingNoNonBreakingSpaceAfter } from '.'
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
						<ConsistencySettingQuote />
						<ConsistencySettingEllipsis />
						<ConsistencySettingEmDash />
						<ConsistencySettingOrdinalNumberSuffix />
						<ConsistencySettingRegularToCurlyQuotes />
						<ConsistencySettingRegularToFrenchQuotes />
						<ConsistencySettingBreakingSpace />
						<ConsistencySettingNoSpaceBefore />
						<ConsistencySettingNoBreakingSpaceAfter />
						<ConsistencySettingNoNonBreakingSpaceAfter />
						<ConsistencySettingSpaceBefore />
					</PanelBody>
				}
            </PluginSidebar>
            <PluginSidebarMoreMenuItem target='consistency-custom-sidebar'>
				{ __( 'Consistency Settings', 'consistency' ) }
			</PluginSidebarMoreMenuItem>
        </>
    )
}
