import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Chats = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);
    const history = useHistory();
    const [chatEngineLoading, setChatEngineLoading] = useState(true); // Отдельный стейт для загрузки ChatEngine

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    };

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
    };

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        } 
        if (!loading) { // Проверяем, загрузились ли данные пользователя
            axios.get('https://api.chatengine.io/user/me', {
            headers: {
                "project-id": "1347b75e-3396-4a06-8c17-a1525e52a4fc",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setChatEngineLoading(false); // Устанавливаем false, когда ChatEngine загрузится
        })
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.displayName);
            formData.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formData.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users',
                    formData,
                    { headers: { 'private-key': '9a34ec26-e61b-4564-a19c-5d756809b3b6' } }
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error));
            })
        });
    } 
}, [user, history, loading]); 

// if (!user || loading || chatEngineLoading) return 'Loading...'; 
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="1347b75e-3396-4a06-8c17-a1525e52a4fc"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;
