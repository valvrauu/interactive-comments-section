import PropTypes from 'prop-types';
import './styles.scss';

function Form({ children, mixName, ...props }) {
    return (
        <form className={`c-form ${mixName}`} {...props}>
            {children}
        </form>
    );
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    mixName: PropTypes.string
}

Form.defaultProps = {
    mixName: ''
}

export default Form;
