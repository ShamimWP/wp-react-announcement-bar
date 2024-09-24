import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SettingsPage = () => {
    return (
        <Panel>
            <PanelBody>
                <PanelRow>
                    <div>The Setting Controls</div>
                </PanelRow>
                <PanelRow>
                    <div>The Display Setting Controls</div>
                </PanelRow>
            </PanelBody>
            <PanelBody
                title={__('Appearance', 'wp-react-announcement-bar')}
                initialOpen={false}
            >
                <PanelRow>
                    <h2> Setting for Size Control</h2>
                </PanelRow>
            </PanelBody>
        </Panel>
    );
}

domReady(() => {
    const root = createRoot(
        document.getElementById('shamim-announcement-bar-settings')
    )

    root.render(<SettingsPage />);
});