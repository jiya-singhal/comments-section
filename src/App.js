import React, { useEffect, useState } from 'react';
import CommentForm from './components/CommentForm/CommentForm';
import CommentList from './components/CommentList/CommentList';

function App() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const savedComments = JSON.parse(localStorage.getItem('comments'));
        if (savedComments) {
            setComments(savedComments);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const addComment = (name, text) => {
        const newComment = {
            id: Date.now(),
            name,
            text,
            date: new Date().toLocaleString(),
            replies: []
        };
        setComments([...comments, newComment]);
    };

    const addReply = (commentId, name, text) => {
        const newReply = {
            id: Date.now(),
            name,
            text,
            date: new Date().toLocaleString()
        };
        setComments(comments.map(comment => 
            comment.id === commentId ? {...comment, replies: [...comment.replies, newReply]} : comment
        ));
    };

    const editComment = (commentId, text, isReply, replyId) => {
        if (isReply) {
            setComments(comments.map(comment =>
                comment.id === commentId ? {
                    ...comment,
                    replies: comment.replies.map(reply =>
                        reply.id === replyId ? { ...reply, text } : reply
                    )
                } : comment
            ));
        } else {
            setComments(comments.map(comment =>
                comment.id === commentId ? { ...comment, text } : comment
            ));
        }
    };

    const deleteComment = (commentId, isReply, replyId) => {
        if (isReply) {
            setComments(comments.map(comment =>
                comment.id === commentId ? {
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== replyId)
                } : comment
            ));
        } else {
            setComments(comments.filter(comment => comment.id !== commentId));
        }
    };

    return (
        <div className="App">
            <h1>Comments Section</h1>
            <CommentForm onAddComment={addComment} />
            <CommentList 
                comments={comments} 
                onAddReply={addReply} 
                onEditComment={editComment} 
                onDeleteComment={deleteComment} 
            />
        </div>
    );
}

export default App;
