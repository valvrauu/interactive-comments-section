import PropTypes from 'prop-types';
import './styles.scss';

function Text({ children, mixName }) {
    return (
        <p className={`c-text ${mixName}`}>
            {children}
        </p>
    );
}

Text.propTypes = {
    children: PropTypes.node.isRequired,
    mixName: PropTypes.string
}

Text.defaultProps = {
    mixName: ''
}

export default Text;
