import { createContext, useState, useContext, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {getDoc, doc, getFirestore } from 'firebase/firestore'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth()
    const db = getFirestore()

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        window.confirm("¿Confirmas que quieres cerrar sesión?") ? signOut(auth) : null
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, "usuarios", currentUser.uid)
                const userDocSnap = await getDoc(userDocRef)

                if (userDocSnap.exists() && userDocSnap.data().rol === 'admin') {
                    setUser({ ...currentUser, rol: 'admin' })
                } else {
                    setUser({ ...currentUser, rol: 'user' })
                }
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()

    }, [auth, db])

    const value = {
        user,
        loading,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}