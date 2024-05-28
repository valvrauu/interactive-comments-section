import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Textarea({ mixName, ...props }) {
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, []);

    return (
        <textarea
            ref={textareaRef}
            onInput={adjustTextareaHeight}
            className={`c-textarea ${mixName}`}
            {...props}
        />
    );
}

Textarea.propTypes = {
    mixName: PropTypes.string
}

Textarea.defaultProps = {
    mixName: ''
}

export default Textarea;
