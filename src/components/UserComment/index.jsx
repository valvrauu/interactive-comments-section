import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCommentsDispatch } from '../../contexts/CommentsContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from '../Button';
import CreatedAt from '../CreatedAt';
import DeleteModal from '../DeleteModal';
import Form from '../Form';
import Heading from '../Heading';
import Label from '../Label';
import Picture from '../Picture';
import ReplyingTo from '../ReplyingTo';
import Textarea from '../Textarea';
import Text from '../Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faReply, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

function UserComment({ id, content, createdAt, score, replyingTo, user, updateMode }) {
    const [text, setText] = useState(() => replyingTo ? `@${replyingTo} ${content}` : '');
    const [isLiked, setIsLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useCommentsDispatch();
    const currentUser = useCurrentUser();
    const isCurrentUser = currentUser.username === user.username;

    const handleLiked = () => {
        if (isLiked) return;
        setIsLiked(true);

        dispatch({ type: 'like_comment', liked: true, id, score, isLiked });
    }

    const handleUnliked = () => {
        if (!isLiked) return;
        setIsLiked(false);

        dispatch({ type: 'like_comment', id, score, isLiked });
    }

    const handleUpdate = e => {
        e.preventDefault();
        const replyName = `@${replyingTo}`;

        dispatch({
            type: 'updated_comment',
            content: text.includes(replyName)
                ? text.substring(replyName.length + 1)
                : text,
            replyingTo,
            id
        });

        dispatch({ type: 'update_mode', id });
    }

    const handleUpdateMode = () => {
        setText(replyingTo ? `@${replyingTo} ${content}` : content);
        dispatch({ type: 'update_mode', id });
    }

    return (
        <div className="c-user-comment">
            <div className="c-user-comment__header">
                <Picture src={user.image.png} alt={user.username} />

                <div className="c-user-comment__user-details">
                    <Heading level={1}>{user.username}</Heading>
                    {isCurrentUser && <Label text="you" />}
                </div>

                <CreatedAt date={createdAt} />
            </div>

            {updateMode
                ? (<Form onSubmit={handleUpdate} mixName="c-user-comment__form">
                    <Textarea
                        value={text}
                        mixName="c-user-comment__textarea"
                        placeholder="Add a comment..."
                        onChange={e => setText(e.target.value)}
                        required
                    />
                    <Button
                        text="Update"
                        theme="dark"
                        mixName="c-user-comment__updateBtn"
                        modifiers={['contained', 'big', 'upper']}
                    />
                </Form>)
                : (<Text mixName="c-user-comment__text">
                    {replyingTo && <ReplyingTo name={replyingTo} />}{' '}
                    {content}
                </Text>)}

            <div className="c-user-comment__actions">
                <Button
                    text={score}
                    theme="like s-like"
                    modifiers={['contained', 'big']}
                    mixName="c-user-comment__likeBtn"
                    startIcon={<FontAwesomeIcon icon={faPlus} onClick={handleLiked} />}
                    endIcon={<FontAwesomeIcon icon={faMinus} onClick={handleUnliked} />}
                />

                <div className="c-user-comment__actions-end">
                    {isCurrentUser && <Button
                        text="Delete"
                        theme="delete"
                        startIcon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => setShowModal(true)}
                    />}

                    <DeleteModal
                        isOpen={showModal}
                        onCancel={() => setShowModal(false)}
                        onConfirm={() => dispatch({ type: 'deleted_comment', id })}
                    />

                    {isCurrentUser
                        ? <Button
                            text="Edit"
                            theme="light"
                            startIcon={<FontAwesomeIcon icon={faPen} />}
                            onClick={handleUpdateMode}
                        />
                        : <Button
                            text="Reply"
                            theme="light"
                            startIcon={<FontAwesomeIcon icon={faReply} />}
                            onClick={() => dispatch({ type: 'reply_mode', id })}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

UserComment.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    replyingTo: PropTypes.string,
    user: PropTypes.object.isRequired,
    updateMode: PropTypes.bool
};

UserComment.defaultProps = {
    replyingTo: null,
    updateMode: false
}

export default UserComment;
