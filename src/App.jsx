import React, { useState } from 'react';
import { X, StickyNote } from 'lucide-react';

const App = () => {

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask = [...task];
    copyTask.push({ title, details }) 

    setTask(copyTask)

    console.log(task);

    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1)

    setTask(copyTask)
  }


  const primaryBg = 'bg-gray-900';
  const secondaryBg = 'bg-gray-800';
  const accentColor = 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
  const inputBaseClasses = 'w-full py-3 px-5 text-gray-200 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 placeholder-gray-400 font-normal outline-none';

  return (
    <div className={`min-h-screen ${primaryBg} text-white font-sans flex flex-col lg:flex-row`}>
      <form onSubmit={submitHandler}
        className={`flex gap-6 lg:w-1/3 p-8 md:p-12 flex-col items-start ${secondaryBg} shadow-2xl lg:min-h-screen`}>
        
        <div className='flex items-center gap-3 mb-4'>
          <StickyNote className='w-8 h-8 text-indigo-400' />
          <h1 className='text-3xl md:text-4xl font-extrabold text-white tracking-wider'>
            Add <span className='text-indigo-400'>Notes</span>
          </h1>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder='Enter Notes heading'
          className={inputBaseClasses}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />

        {/* Detailed wala input */}
        <textarea
          placeholder='Write Details'
          className={`${inputBaseClasses} h-40 resize-none`}
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
          }}

        />

        {/* Submit Button */}
        <button
          type='submit'
          className={`w-full px-5 py-3 rounded-lg text-white font-semibold transition duration-300 shadow-md hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor} focus:ring-offset-gray-900 mt-2`}>
          Add Notes
        </button>
      </form>

      {/* --- Notes Display Section --- */}
      <div className='lg:w-2/3 p-8 md:p-12 lg:border-l border-gray-700'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-8'>
          Recent <span className='text-indigo-400'>Notes</span>
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 h-[90%] overflow-auto pb-10'>
          {task.length > 0 ? (
            task.map(function (elem, idx) {

              return (
                <div
                  key={idx}
                  className='relative flex flex-col justify-between h-56 bg-white rounded-xl shadow-xl p-5 text-gray-900 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-indigo-500/30 group'
                  style={{
                    borderTop: `6px solid ${
                      ['#6366f1', '#f97316', '#10b981', '#ef4444'][idx % 4]
                    }`,
                  }}
                >
                  {/* Note Content */}
                  <div className='overflow-hidden flex-grow'>
                    <h3 className='leading-tight text-xl font-extrabold mb-1 truncate'>
                      {elem.title}
                    </h3>
                    <p className='leading-snug text-sm text-gray-600 line-clamp-4'>
                      {elem.details}
                    </p>
                  </div>
                  {/* Footer and Delete Button */}
                  <div className='mt-3 flex justify-end items-center'>
                    <button onClick={() => {
                      deleteNote(idx)
                    }} 
                    className='p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white opacity-90 hover:opacity-100 transition duration-200 shadow-md'
                    title='Delete Note'>
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            // Empty State
            <div className='col-span-full flex flex-col items-center justify-center p-10 text-center text-gray-500'>
              <StickyNote className='w-16 h-16 mb-4 text-gray-600' />
              <p className='text-xl font-medium'>You have no notes yet.</p>
              <p className='text-md'>Start by adding one on the left!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App