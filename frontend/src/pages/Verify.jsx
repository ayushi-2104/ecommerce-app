import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { backendUrl } from '../../../admin/src/App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { Authorization: `Bearer ${token}` } })
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify
