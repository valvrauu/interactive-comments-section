import PropTypes from 'prop-types';
import AddComment from '../AddComment';
import UserComment from '../UserComment';
import './styles.scss';

function BoxComment(comment) {
    const { user, id, idOwner, replies, replyMode } = comment;
    const replyTo = { name: user.username, id: idOwner || id }

    return (
        <div className="c-box-comment">
            <UserComment {...comment} />
            {replyMode && <AddComment replyTo={replyTo} id={id} />}

            {replies && replies.length > 0 && <div className="c-box-comment__replies">
                {replies.map(comment => <BoxComment key={comment.id} {...comment} />)}
            </div>}
        </div>
    );
}

BoxComment.propTypes = {
    comment: PropTypes.object,
    replyMode: PropTypes.bool
};

export default BoxComment;
