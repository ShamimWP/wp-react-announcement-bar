import domReady from '@wordpress/dom-ready';
import { createRoot, useState } from '@wordpress/element';

import { Button, Panel, PanelBody, PanelRow, TextareaControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

//Custom Components.
import SizeControl from './components/SizeControl';

import {
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalHeading as Heading,
} from '@wordpress/components';

const SettingsTitle = () => {
    return (
        <Heading level={1}>
            {__(' React Announcement Bar Settings', 'wp-react-announcement-bar')}
        </Heading>
    )
}

import apiFetch from '@wordpress/api-fetch';
import { useEffect } from '@wordpress/element';

const useSettings = () => {
    const [message, setMessage] = useState();
    const [display, setDisplay] = useState();
    const [size, setSize] = useState();

    useEffect(() => {
        apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
            setMessage(settings.shamim_react_announcement_bar.message);
            setDisplay(settings.shamim_react_announcement_bar.display);
            setSize(settings.shamim_react_announcement_bar.size);
        })
    }, []);

    const saveSettings = () => {
        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                shamim_react_announcement_bar: {
                    message,
                    display,
                    size
                },
            },
        });
    };

    return {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize,
        saveSettings
    }
};

// Message Control Component.
const MessageControl = ({ value, onChange }) => {
    return (
        <TextareaControl
            label={__('Announcement Message', 'wp-react-announcement-bar')}
            value={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    )
}

// Display Control Component.
const DisplayControl = ({ value, onChange }) => {
    return (
        <ToggleControl
            label={__('Display Bar', 'wp-react-announcement-bar')}
            checked={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    )
}

// Save Button.
const SaveButton = ({ onClick }) => {
    return (
        <Button variant='primary' onClick={onClick} __next40pxDefaultSize>
            {__('Save', 'wp-react-announcement-bar')}
        </Button>
    )
}


// The Settings Page View.
const SettingsPage = () => {
    const {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize,
        saveSettings
    } = useSettings();
    return (
        <>
            <SettingsTitle />
            <Panel>
                <PanelBody>
                    <PanelRow>
                        <MessageControl
                            value={message}
                            onChange={(value) => setMessage(value)}
                        />
                    </PanelRow>
                    <PanelRow>
                        <DisplayControl
                            value={display}
                            onChange={(value) => setDisplay(value)}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody
                    title={__('Appearance', 'wp-react-announcement-bar')}
                    initialOpen={false}
                >
                    <PanelRow>
                        <SizeControl
                            value={size}
                            onChange={(value) => setSize(value)}
                        />
                    </PanelRow>
                </PanelBody>
            </Panel>
            <SaveButton onClick={saveSettings} />
        </>

    );
}

domReady(() => {
    const root = createRoot(
        document.getElementById('shamim-announcement-bar-settings')
    )

    root.render(<SettingsPage />);
});