import PropTypes from 'prop-types';
import './styles.scss';

function Heading({ level, mixName, children }) {
    const headingClasses = {
        1: 'primary',
        2: 'secondary',
        3: 'tertiary',
        4: 'quaternary',
        5: 'quinary',
        6: 'senary',
    };

    const HeadingTag = `h${level}`;
    const headingModifiers = `c-heading--${headingClasses[level]}`;

    return (
        <HeadingTag className={`c-heading ${headingModifiers} ${mixName}`}>
            {children}
        </HeadingTag>
    );
}

Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    mixName: PropTypes.string,
    children: PropTypes.node.isRequired
}

Heading.defaultProps = {
    level: 1,
    mixName: ''
}

export default Heading;
