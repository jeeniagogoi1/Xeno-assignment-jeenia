import {createContext,useState} from "react"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const loginUser = async (userData)=> {
        try{
            const res = await fetch('http://localhost:4000/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData})
            })
            const result = await res.json()
            if(!result.error){
                console.log(result)
                localStorage.setItem("token",result.token)
                setUser(result.user)
                alert("Success")
            }else{
                alert(result.error)
            }
        }catch(err){
            console.log(err)
        }
    }
    const registerUser = async (userData) =>{
        try{
            const res = await fetch('http://localhost:4000/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData})
            })
            const result = await res.json()
            if(!result.error){
                alert("Success")
            }else{
                alert(result.error)
            }
        }catch(err){
            console.log(err)
        }
    }
    return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser}}>{children}</AuthContext.Provider>
}

export default AuthContext