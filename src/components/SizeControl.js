import { FontSizePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SizeControl = ({ value, onChange }) => {
    return (
        <FontSizePicker
            fontSizes={[
                {
                    name: __(' Small', 'wp-react-announcement-bar'),
                    size: 'small',
                    slug: 'small'
                },
                {
                    name: __(' Medium', 'wp-react-announcement-bar'),
                    size: 'medium',
                    slug: 'medium'
                },
                {
                    name: __(' Large', 'wp-react-announcement-bar'),
                    size: 'large',
                    slug: 'large'
                },
                {
                    name: __(' Extra Large', 'wp-react-announcement-bar'),
                    size: 'x-large',
                    slug: 'x-large'
                },
            ]}
            value={value}
            onChange={onChange}
            disableCustomFontSizes={true}
        />
    )
}

export default SizeControl;