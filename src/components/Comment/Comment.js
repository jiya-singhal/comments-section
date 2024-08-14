import React, { useState } from 'react';
import './Comment.css'; 
import CommentForm from '../CommentForm/CommentForm';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon from react-icons

function Comment({ comment, onAddReply, onEditComment, onDeleteComment }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            onEditComment(comment.id, editText, false);
        }
    };

    return (
        <div className="comment-container">
            <div className="comment-header">
                <strong>{comment.name}</strong>
                <button className="delete-button" onClick={() => onDeleteComment(comment.id, false)}>
                    <FaTrash /> {/* FontAwesome trash icon */}
                </button>
            </div>
            {isEditing ? (
                <textarea
                    className="comment-edit"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <p className="comment-text">{comment.text}</p>
            )}
            <p className="comment-date">{comment.date}</p>
            <div className="comment-buttons">
                <button className="edit-button" onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            <CommentForm onAddReply={onAddReply} parentId={comment.id} isReply={true} />
            <div>
                {comment.replies.map(reply => (
                    <div key={reply.id} className="reply-container">
                        <div className="reply-header">
                            <strong>{reply.name}</strong>
                            <button className="delete-button" onClick={() => onDeleteComment(comment.id, true, reply.id)}>
                                <FaTrash /> {/* FontAwesome trash icon */}
                            </button>
                        </div>
                        <p className="reply-text">{reply.text}</p>
                        <p className="reply-date">{reply.date}</p>
                        <div className="reply-buttons">
                            <button className="edit-button" onClick={() => onEditComment(comment.id, reply.text, true, reply.id)}>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
