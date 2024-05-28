import PropTypes from 'prop-types';
import './styles.scss';

function Picture({ src, alt, mixName }) {
    return (
        <img
            className={`c-picture ${mixName}`}
            src={src}
            alt={alt}
        />
    );
}

Picture.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    mixName: PropTypes.string
}

Picture.defaultProps = {
    alt: '',
    mixName: ''
}

export default Picture;
