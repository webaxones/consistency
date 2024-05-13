/**
 * Summary: GlobalSettingPanel component.
 * 
 * @description This file contains the GlobalSettingPanel component used to display the plugin's global settings which contains the global correction rules in sidebar for administrators.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Panel, PanelHeader, PanelBody, PanelRow } from '@wordpress/components'

/**
 * External dependencies
 */
import { GlobalSettingToggle } from './GlobalSettingToggle'
import { rules } from '../config/rules'
import { categories } from '../config/categories'

/**
 * Define the GlobalSettingPanel component
 */
const GlobalSettingPanel = () => (
	<Panel className='GlobalSettingPanel'>
		<PanelHeader><strong>{ __( 'Global correction rules', 'consistency' ) }</strong></PanelHeader>
		{
			[...categories].map( ( cat, key ) => {
				return ( <PanelBody
                    key={ key }
                    title={ __( cat.label, 'consistency' ) }
                    initialOpen={ false }
                >
					{
						[...rules]
							.filter(rule => rule.category === cat.slug)
							.map( ( rule, key )  => (
								<GlobalSettingToggle 
									key={ key }
									settingSlug={ rule.slug }
									settingName={ rule.name }
									settingDescription={ {
										__html: rule.description
									} }
								/>
							) )
					}
				</PanelBody> )
			} )
		}
	</Panel>
)

export default GlobalSettingPanel