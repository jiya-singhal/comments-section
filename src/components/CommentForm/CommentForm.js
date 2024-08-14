import React, { useState } from 'react';
import './CommentForm.css'; 


function CommentForm({ onAddComment, parentId, isReply, onAddReply }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !text) {
            setError('Both fields are required.');
            return;
        }
        setError('');
        if (isReply) {
            onAddReply(parentId, name, text);
        } else {
            onAddComment(name, text);
        }
        setName('');
        setText('');
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <textarea 
                    id="comment"
                    placeholder="Comment" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">Post</button>
        </form>
    );
}

export default CommentForm;
