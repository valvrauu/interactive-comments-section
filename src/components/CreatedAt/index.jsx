import PropTypes from 'prop-types';
import './styles.scss';

function CreatedAt({ date }) {
    return (
        <span className="c-create-at">
            {date}
        </span>
    );
}

CreatedAt.propTypes = {
    date: PropTypes.string.isRequired
};

export default CreatedAt;
