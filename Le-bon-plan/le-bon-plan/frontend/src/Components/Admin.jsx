import React, { useEffect, useState } from 'react';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false)
    
    useEffect(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/admin', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const res = await resObj.json();
            if (response.ok) {
                setUsers(res.data)
                setIsConnected(true)
            } else {
                setIsConnected(false)
            }
        } catch(err) {
            setIsConnected(false)
            console.error(err)
        }
    }, [])



    if (!isConnected) {
        return <h1>Veuillez vous connecter</h1>
    }

    if (users && users.length > 0) {
        return (
            <div>
                {users.map(u => (
                    <div> {u.firstname}</div>
                ))}
            </div>
        )
    }

    return (
        <div>Aucun users</div>
    )
}


