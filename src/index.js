import domReady from '@wordpress/dom-ready';
import { createRoot, useEffect, useState } from '@wordpress/element';

import { Button, ColorPalette, Panel, PanelBody, PanelRow, TextareaControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalHeading as Heading,
} from '@wordpress/components';

// Add Save notice to backend.
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { store as noticeStore } from '@wordpress/notices';


//Custom Components.
import Notices from './components/Notices';
import SizeControl from './components/SizeControl';

import './index.scss';


const SettingsTitle = () => {
    return (
        <Heading level={1}>
            {__(' React Announcement Bar Settings', 'wp-react-announcement-bar')}
        </Heading>
    )
}


// Use Settings, testing my comment.
const useSettings = () => {
    const [message, setMessage] = useState();
    const [display, setDisplay] = useState();
    const [size, setSize] = useState();
    const [background, setBackground] = useState();

    const { createSuccessNotice } = useDispatch(noticeStore);

    useEffect(() => {
        apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
            setMessage(settings.shamim_react_announcement_bar.message);
            setDisplay(settings.shamim_react_announcement_bar.display);
            setSize(settings.shamim_react_announcement_bar.size);
            setBackground(settings.shamim_react_announcement_bar.background);
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
                    size,
                    background
                },
            },
        }).then(() => {
            createSuccessNotice(
                __('Announcement Settings Saved.', 'wp-react-announcement-bar')
            )
        });
    };
    return {
        message,
        setMessage,
        display,
        setDisplay,
        size,
        setSize,
        background,
        setBackground,
        saveSettings
    };
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

const BarBackground = ({ value, onChange }) => {
    return (
        <ColorPalette
            colors={[
                {
                    color: '#f00',
                    name: 'Red'
                },
                {
                    color: '#000',
                    name: 'Black'
                },
                {
                    color: '#00f',
                    name: 'Blue'
                }
            ]}
            value={value}
            onChange={onChange}
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
        background,
        setBackground,
        saveSettings
    } = useSettings();
    return (
        <>
            <SettingsTitle />
            <Notices />
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
                    initialOpen={true}
                >
                    <PanelRow>
                        <SizeControl
                            value={size}
                            onChange={(value) => setSize(value)}
                        />
                    </PanelRow>
                    <PanelRow>
                        <BarBackground
                            value={background}
                            onChange={(value) => setBackground(value)}
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