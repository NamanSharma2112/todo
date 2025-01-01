import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid'; 
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";





function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinshed, setshowFinshed] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
    }
  }, [])
  
  const saveToLS = ()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinshed = (e) => {
     setshowFinshed (!showFinshed)    
  }
  


  const handleEdit =(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let index= todos.findIndex(item =>{
      return item.id == id;})
       let newTodos = todos.filter(item=>{
        return item.id!==id
       });
     setTodos(newTodos)
     saveToLS()

  } 
 
  const handleDelete = (e, id)=>{
    let index= todos.findIndex(item =>{
      return item.id == id;})
       let newTodos = todos.filter(item=>{
        return item.id!==id
       });
     setTodos(newTodos)
     saveToLS()


  } 
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo , isCompleted : false}])
    setTodo("")
    
    saveToLS()

  } 

  const handleChange = (e)=>{
    
    setTodo(e.target.value)
  } 

  const handelCheckbox = (e) => {
   
    let id = e.target.name;

  let index= todos.findIndex(item =>{
    return item.id == id;})
     let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()

   
  }
  

  return (
    <>
    <NavBar/>
     <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh] md:w-[40%]">
           <h1 className='font-bold text-center text-3xl'>i-Task manage your todos at one place</h1>
            <div className='Addtodo my-5 flex flex-col gap-4'>
              <h2 className='text-2xl font-bold '>Add a Todo</h2>
              <div className='flex'>
              <input type='text' onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-1'></input>
             <button onClick={handleAdd} disabled={todo.length<3} className='buttons bg-violet-700 hover:bg-violet-900 disabled:bg-violet-700 p-4 py-2 font-bold text-sm text-white rounded-full '>Save</button>
              </div>            
            </div>
            <input className='my-4' onChange={toggleFinshed} type='checkbox' checked={showFinshed}/> Show Finshed Task
            <div className='h-[1px] bg-black opacity-20'></div>
            <h2 className='text-2xl font-bold'>Your Todos</h2>
            <div className='todos' >
              {todos.length === 0 && <div className='m-5'>No Todos to display!</div>}
              {todos.map (item=>{

                return (showFinshed ||!item.isCompleted) && <div key={item.id} className='todo flex  my-3 justify-between'>
                  <div className='flex gap-5'>
                   <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
                    <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                    </div>
                    <div className='buttons flex h-full'>
                   <button onClick={(e)=>handleEdit(e, item.id)} className='buttons bg-violet-700 hover:bg-violet-900 p-2 py-1 font-bold text-sm text-white rounded-md mx-2'><CiEdit />
                   </button>
                   <button  onClick={(e)=>{handleDelete(e, item.id)}} className='buttons bg-violet-700 hover:bg-violet-900 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><MdDeleteOutline />
                   </button>
                    </div>

                   </div>
                   } ) }
             </div>
         </div>
     
    </>
  )
}

export default App
