import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../api/getTodos";
import { useEffect, useState } from "react";

const Todo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [content , setContent] = useState("")
  const [description , setDescription] = useState("")
    async function getData(){
        if (id) {
            const {data} =  await getTodo(id)
            setContent(data.content)
            setDescription(data.description)
        }
      }
      useEffect(() => {
        getData()
      }, [])

    if (!id) {
        return <></>
    }
  return (
    <div className="space-x-4">
        <input className="p-2" placeholder="" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <input className="p-2" placeholder="" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-blue-700 text-white p-2" 
        onClick={ async() => { await updateTodo(id ,content , description)
            navigate("/")
        }
        
    }>SAVE</button>
    </div>
  )
}

export default Todo