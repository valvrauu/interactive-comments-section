import PropTypes from 'prop-types';
import './styles.scss';

function ReplyingTo({ name }) {
    return (
        <span className="c-reply-to">
            @{name}
        </span>
    );
}

ReplyingTo.propTypes = {
    name: PropTypes.string.isRequired
}

export default ReplyingTo;
