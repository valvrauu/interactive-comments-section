import PropTypes from 'prop-types';
import Heading from '../Heading';
import Text from '../Text';
import Button from '../Button';
import './styles.scss';

function DeleteModal({ isOpen, onCancel, onConfirm }) {
    return (
        <div className={`c-modal-overlay ${!isOpen && 'c-modal-overlay--hidden'}`}>
            <div className='c-delete-modal'>
                <Heading level={2} mixName="c-delete-modal__heading">
                    Delete comment
                </Heading>

                <Text>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can’t be undone.
                </Text>

                <div className='c-delete-modal__actions'>
                    <Button
                        text="No, cancel"
                        theme="cancel"
                        modifiers={['contained', 'big', 'upper']}
                        onClick={onCancel}
                    />

                    <Button
                        text="Yes, delete"
                        theme="delete-reverse"
                        modifiers={['contained', 'big', 'upper']}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    )
}

DeleteModal.propTypes = {
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func
}

DeleteModal.defaultProps = {
    isOpen: false,
}

export default DeleteModal;
