import React from 'react'
import { useSelector } from "react-redux"

export default function LoginOnly({ element }) {
    const { adminLoginData } = useSelector(state => state.adminSignIn)
    return adminLoginData ? element : "Unauthorised access found..."
}

