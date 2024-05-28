import PropTypes from 'prop-types';
import './styles.scss';

function Label({ text }) {
    return (
        <span className="c-label">
            {text}
        </span>
    );
}

Label.propTypes = {
    text: PropTypes.string.isRequired
}

export default Label;
