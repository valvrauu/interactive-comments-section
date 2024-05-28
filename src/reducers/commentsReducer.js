const toggleCommentsMode = (comments, id, mode) => {
    return comments.map(comment => ({
        ...comment,
        [mode]: comment.id === id && !comment[mode],
        replies: comment.replies && toggleCommentsMode(comment.replies, id, mode)
    }));
};

export function commentsReducer(comments, action) {
    switch (action.type) {
        case 'like_comment':
            const handleLike = (comments, id) => {
                return comments.map(comment => {
                    if (comment.id === id) {
                        return {
                            ...comment,
                            score: action.liked ? comment.score + 1 : comment.score - 1,
                        }
                    }

                    return {
                        ...comment,
                        replies: comment.replies && handleLike(comment.replies, id)
                    };
                });
            };

            return handleLike(
                comments,
                action.id
            );
        case 'reply_mode':
            return toggleCommentsMode(
                comments,
                action.id,
                'replyMode'
            );
        case 'replyed_comment':
            const handleReply = (comments, idOwner) => {
                return comments.map(comment => ({
                    ...comment,
                    replies: comment.id === idOwner ? [
                        ...comment.replies, {
                            id: action.id,
                            idOwner: action.idOwner,
                            content: action.content,
                            createdAt: action.createdAt,
                            score: action.score,
                            replyingTo: action.replyingTo,
                            user: action.user,
                            replies: []
                        }
                    ] : [...comment.replies]
                }));
            };

            return handleReply(comments, action.idOwner);
        case 'submitted_comment':
            return [...comments, {
                id: action.id,
                content: action.content,
                createdAt: action.createdAt,
                score: action.score,
                user: action.user,
                replies: []
            }];
        case 'deleted_comment':
            const handleDelete = (comments, id) => {
                return comments.map(comment => {
                    if (comment.id !== id) {
                        return {
                            ...comment,
                            replies: comment.replies && handleDelete(comment.replies, id)
                        };
                    }

                    return '';
                }).filter(comment => comment);
            };

            return handleDelete(
                comments,
                action.id
            );
        case 'update_mode':
            return toggleCommentsMode(
                comments,
                action.id,
                'updateMode'
            );
        case 'updated_comment':
            const handleUpdated = (comments, id, content) => {
                return comments.map(comment => ({
                    ...comment,
                    content: comment.id === id ? content : comment.content,
                    replies: comment.replies && handleUpdated(comment.replies, id, content)
                }));
            };

            return handleUpdated(
                comments,
                action.id,
                action.content
            );
        default:
            throw Error('Unknow action: ' + action.type);
    }
}
