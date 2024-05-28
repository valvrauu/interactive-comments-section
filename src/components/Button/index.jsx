import PropTypes from 'prop-types';
import './styles.scss';

function Button({ text, theme, modifiers, mixName, startIcon, endIcon, onClick }) {
    const btnModifiers = modifiers && modifiers.map(modify => `c-btn--${modify}`).join(' ');

    return (
        <button
            className={`c-btn t-${theme} ${btnModifiers} ${mixName}`}
            onClick={onClick}
        >
            {startIcon}
            {text}
            {endIcon}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    theme: PropTypes.string.isRequired,
    modifiers: PropTypes.array,
    mixName: PropTypes.string,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element,
    onClick: PropTypes.func
};

Button.defaultProps = {
    modifiers: [],
    mixName: '',
    startIcon: null,
    endIcon: null,
    onClick: () => { }
};

export default Button;
