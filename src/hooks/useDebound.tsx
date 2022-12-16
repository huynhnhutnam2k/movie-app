import { useEffect, useState } from 'react'

const useDebound = (initialValue = "", delay = 1000) => {
    const [deboundValue, setDeboundValue] = useState(initialValue)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboundValue(initialValue)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [delay, initialValue])
    return deboundValue
}

export default useDebound