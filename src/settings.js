import { __ } from '@wordpress/i18n'
import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/edit-post'
import { PanelBody, PanelRow } from '@wordpress/components'
import { ConsistencySettingState } from './ConsistencySettingState'
import { ConsistencySettingQuote } from './ConsistencySettingQuote'
import { ConsistencySettingEllipsis } from './ConsistencySettingEllipsis'
import { ConsistencySettingNonBreakingSpace } from './ConsistencySettingNonBreakingSpace'
import { select } from '@wordpress/data'


const { canUser } = select( 'core' )

export const SidebarSettings = () => {
	const isAdmin = canUser( 'create', 'users' )
    return(
        <>
            <PluginSidebar
                name="consistency-custom-sidebar"
                title={ __( 'Consistency Settings', 'consistency' ) }
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
						title={ __( 'Global Settings', 'consistency' ) }
						initialOpen={ true }
					>
						<PanelRow>
							<ConsistencySettingQuote />
						</PanelRow>
						<PanelRow>
							<ConsistencySettingEllipsis />
						</PanelRow>
						<PanelRow>
							<ConsistencySettingNonBreakingSpace />
						</PanelRow>
					</PanelBody>
				}
            </PluginSidebar>
            <PluginSidebarMoreMenuItem target='consistency-custom-sidebar'>
				{ __( 'Consistency Settings', 'consistency' ) }
			</PluginSidebarMoreMenuItem>
        </>
    )
}
