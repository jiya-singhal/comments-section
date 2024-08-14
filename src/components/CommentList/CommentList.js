import React from 'react';
import Comment from '../Comment/Comment';

function CommentList({ comments, onAddReply, onEditComment, onDeleteComment }) {
    return (
        <div>
            {comments.map(comment => (
                <Comment 
                    key={comment.id} 
                    comment={comment} 
                    onAddReply={onAddReply} 
                    onEditComment={onEditComment} 
                    onDeleteComment={onDeleteComment} 
                />
            ))}
        </div>
    );
}

export default CommentList;
