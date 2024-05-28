import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCommentsDispatch } from '../../contexts/CommentsContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from '../Button';
import Form from '../Form';
import Picture from '../Picture';
import Textarea from '../Textarea';
import generateUniqueId from '../../utils/generateUniqueId';
import './styles.scss';

function AddComment({ replyTo, id }) {
    const [text, setText] = useState(() => (replyTo?.name ? `@${replyTo.name} ` : ''));
    const currentUser = useCurrentUser();
    const dispatch = useCommentsDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        if (replyTo) {
            const replyName = `@${replyTo.name}`;

            dispatch({
                type: 'replyed_comment',
                id: generateUniqueId(),
                idOwner: replyTo.id,
                content: text.includes(replyName)
                    ? text.substring(replyName.length + 1)
                    : text,
                createdAt: "1 minute ago",
                score: 0,
                replyingTo: replyTo.name,
                user: currentUser
            });

            dispatch({ type: 'reply_mode', id });
        } else {
            dispatch({
                type: 'submitted_comment',
                id: generateUniqueId(),
                content: text,
                createdAt: "1 minute ago",
                score: 0,
                user: currentUser,
                replies: []
            });
        }

        setText('');
    };

    return (
        <div className="c-add-comment">
            <Form onSubmit={handleSubmit} mixName="c-add-comment__form" >
                <Textarea
                    value={text}
                    placeholder="Add a comment..."
                    onChange={e => setText(e.target.value)}
                    required
                />

                <div className="c-add-comment__details">
                    <Picture
                        src={currentUser.image.png}
                        alt={currentUser.username}
                    />

                    <Button
                        text={replyTo ? 'Reply' : 'Send'}
                        theme="dark"
                        modifiers={['contained', 'big', 'upper']}
                    />
                </div>
            </Form>
        </div>
    );
}

AddComment.propTypes = {
    replyTo: PropTypes.object,
    id: PropTypes.string
};

AddComment.defaultProps = {
    replyTo: null,
    id: null
};

export default AddComment;
