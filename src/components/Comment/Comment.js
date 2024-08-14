import React, { useState } from 'react';
import './Comment.css'; 
import CommentForm from '../CommentForm/CommentForm';
import { FaTrash } from 'react-icons/fa'; 

function Comment({ comment, onAddReply, onEditComment, onDeleteComment }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);


    const [editingReplies, setEditingReplies] = useState({});

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            onEditComment(comment.id, editText, false); 
        }
    };

    const handleEditReply = (replyId, text) => {
        setEditingReplies((prev) => ({
            ...prev,
            [replyId]: text,
        }));
    };

    const handleSaveReply = (replyId, text) => {
        onEditComment(comment.id, text, true, replyId);
        setEditingReplies((prev) => ({
            ...prev,
            [replyId]: undefined, 
        }));
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
                        {editingReplies[reply.id] !== undefined ? (
                            <textarea
                                className="reply-edit"
                                value={editingReplies[reply.id]}
                                onChange={(e) => handleEditReply(reply.id, e.target.value)}
                            />
                        ) : (
                            <p className="reply-text">{reply.text}</p>
                        )}
                        <p className="reply-date">{reply.date}</p>
                        <div className="reply-buttons">
                            {editingReplies[reply.id] !== undefined ? (
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleSaveReply(reply.id, editingReplies[reply.id])}
                                >
                                    Save
                                </button>
                            ) : (
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleEditReply(reply.id, reply.text)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;
