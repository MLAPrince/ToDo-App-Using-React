import React from 'react'
import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'

function App() {

  const [todo, settodo] = useState("")
  const [todosContainer, settodosContainer] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const isFirstLoad = useRef(true); // ✅ track first load
  const [editId, setEditId] = useState(null);
  // const areAllSelected = todosContainer.length > 0 && todosContainer.every(todo => todo.isCompleted);
  const selectedCount = todosContainer.filter(todo => todo.isCompleted).length;
  const areAllSelected = todosContainer.length > 0 && todosContainer.every(todo => todo.isCompleted);




  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      settodosContainer(todos);
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      // ✅ Skip saving on first load
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todosContainer));
  }, [todosContainer]);

  const handleEdit = (e, id) => {
    const t = todosContainer.find(item => item.id === id);
    settodo(t.todo);
    setEditId(id); // ✅ track which todo is being edited
  }


  const handleDelete = (e, id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (userConfirmed) {
      let newTodo = todosContainer.filter(item => {
        return item.id !== id; // Use !== for strict inequality
      });
      settodosContainer(newTodo);
    } else {
    }
  }

  const handleSubmit = () => {
    if (todo.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }

    if (editId) {
      // ✅ Edit mode: update existing todo
      const updatedTodos = todosContainer.map(item =>
        item.id === editId ? { ...item, todo } : item
      );
      settodosContainer(updatedTodos);
      setEditId(null); // exit edit mode
    } else {
      // ✅ Add new todo
      settodosContainer([...todosContainer, { id: uuidv4(), todo, isCompleted: false }]);
    }

    settodo(""); // clear input
  }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd(); // Call the same add function
    }

  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todosContainer.findIndex(item => {
      return item.id === id;
    })
    let newTodo = [...todosContainer];
    newTodo[index].isCompleted = !newTodo[index].isCompleted;
    settodosContainer(newTodo)
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container flex flex-col mx-auto bg-violet-100 my-6 rounded-xl py-5 px-1 h-[93vh] w-full h-[93vh] md:w-[70vw] md:h-[85vh] lg:w-1/2 lg:h-[80vh] relative">

        <div className='px-4'>
          <div className='mainHeading flex mb-4 justify-center items-center text-center flex-wrap text-2xl font-bold'>iTask - Manage your todos at one place</div>


          <div className='secondHeading text-xl ml-1 font-bold'>Add a Todo</div>


          <div className='inputCapsuleDiv flex mt-4 justify-center items-center gap-4 box-border'>
            <input onChange={handleChange} value={todo} className='border-1 px-3 py-1 border-white rounded-full bg-white   w-[90%] max-w-full outline-indigo-700 outline-1' type="text" onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }} placeholder="Enter your todo here..." />
            <button className='bg-violet-400 hover:bg-violet-600  px-4 py-2 rounded-full text-[13px] text-white font-bold transition-all-2s-ease duration-200 cursor-pointer' onClick={handleSubmit} >
              {editId ? "Save" : "Add"}
            </button>
            {editId && (<button className="text-red-500 font-bold hover:underline" onClick={() => { settodo(""); setEditId(null); }}>
              Cancel
            </button>)}

          </div>


          <div className='showFinishedDiv flex gap-2 ml-1 mt-5 '>
            <input className='' type="checkbox" checked={showFinished} onChange={toggleFinished} />
            <span className='opacity-65 text-[14px]'>Show Finished</span>
          </div>


          <div className='separatorlineDiv mt-2 flex justify-center items-center '>
            <div className='w-[100%] h-[1px] bg-black opacity-40 flex justify-center items-center'></div>
          </div>
        </div>


        <div className='flex justify-between items-center'>
          <div className='text-[16px] font-bold ml-4 mt-3'>Your Todos</div>

          <div className="flex justify-end items-center gap-4 mt-2 mr-0">
            <AnimatePresence>
              {selectedCount > 1 && (
                <motion.button
                  key="deleteSelected"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500  text-sm font-semibold hover:underline "
                  onClick={() => {
                    const confirmed = window.confirm("Delete all selected todos?");
                    if (confirmed) {
                      const remaining = todosContainer.filter(todo => !todo.isCompleted);
                      settodosContainer(remaining);
                    }
                  }}
                >
                  {/* Delete Selected */}
                  Delete
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              // whileTap={{ scale: 0.95 }}
              className="text-blue-500  text-sm font-semibold hover:underline transition w-22"
              onClick={() => {
                const updated = todosContainer.map(todo => ({
                  ...todo,
                  isCompleted: !areAllSelected,
                }));
                settodosContainer(updated);
              }}
            >
              {areAllSelected ? "Deselect All" : "Select All"}
            </motion.button>
          </div>

        </div>


        <div className="todosContainer transition-all duration-200 flex h-[70%] flex-col overflow-y-auto pr-2 pl-4">
          {todosContainer.length === 0 && <div className='m-auto mt-5 opacity-80'>No Todos to Display</div>}
          <AnimatePresence>
            {todosContainer.map(item => {
              return (showFinished || !item.isCompleted) && <motion.div
                initial={{ opacity: 0.1, y:0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                key={item.id} className={`flex gap-3 mt-3 items-center justify-between transition-all duration-300 ${item.id === editId ? "bg-violet-200 scale-[1.02] py-2 px-3 rounded-sm" : ""}`}>

                <div className='flex items-center justify-center gap-2'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
                  <div className={item.isCompleted ? "flex items-center justify-center opacity-60 text-[15px] line-through" : "flex items-center justify-center opacity-90 text-[15px]"}>{item.todo}</div>
                </div>

                <div className='eidtDelButtonsDiv flex gap-3 items-center justify-center'>
                  <button className='flex items-center justify-center  cursor-pointer' onClick={(e) => { handleEdit(e, item.id) }}>
                    <svg className='hover:opacity-60 transition-all duration-200' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                      <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round" />
                      <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <button className='flex items-center justify-center  cursor-pointer' onClick={(e) => { handleDelete(e, item.id) }}>
                    <svg className='hover:opacity-60 transition-all duration-200' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                      <path d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M20 15L13 21.9995M20 22L13 15.0005" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>

              </motion.div>
            })}
          </AnimatePresence>
        </div>

      </div>
    </>
  )
}

export default App
