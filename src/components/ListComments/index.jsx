import { useComments } from '../../contexts/CommentsContext';
import BoxComment from '../BoxComment';
import './styles.scss';

function ListComments() {
    const comments = useComments();
    console.log(comments);

    return (
        <div className="c-list-comments">
            {comments && comments.map(comment => <BoxComment key={comment.id} {...comment} />)}
        </div>
    );
}

export default ListComments;
