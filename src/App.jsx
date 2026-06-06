import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, reset,formState } = useForm();
  const {errors} = formState;
  const {
    register: editregister,
    handleSubmit: edithandleSubmit,
    setValue,
  } = useForm();
  const [task, settask] = useState(() => {
    const savedTask = localStorage.getItem("mytask");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => {
    localStorage.setItem("mytask", JSON.stringify(task));
  }, [task]);

  const submitHandler = (data) => {
    const copytask = [...task];
    copytask.push({ title: data.title, description: data.description });
    settask(copytask);
    reset();
  };
  const deleteTask = (idx) => {
    const copytask = [...task];
    copytask.splice(idx, 1);
    settask(copytask);
  };
  const editStart = (idx) => {
    setEditIdx(idx);
    setValue("editTitle", task[idx].title);
    setValue("editDescription", task[idx].description);
  };
  const saveData = (data) => {
    const copytask = [...task];
    copytask[editIdx] = {
      title: data.editTitle,
      description: data.editDescription,
    };
    settask(copytask);
    setEditIdx(null);
  };

  return (
    <div className="flex flex-col items-center font-serif  bg-slate-200 min-h-screen">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="h-1/2 flex flex-col gap-5 pt-10 "
      >
        <input
          className="border pt-1.5 pb-1.5 rounded-2xl pl-4 focus:border-indigo-500 transition-all focus:outline-none"
          type="text"
          placeholder="Enter Task Title :"
          id="title"
          {...register("title", {
            required: "Please Enter The Note Title ! ",
          })}
        />
        {errors.title && <small className="m-0 text-red-900 font-semibold">{errors.title?.message}</small>}
        <textarea
          className="border rounded p-2  focus:outline-none  focus:border-indigo-500 transition-all"
          placeholder="Enter Task Detail here"
          id="description"
          {...register("description", {
            required: "Please Enter The Note Description",
          })}
        ></textarea>
        {errors.description && <small className="m-0 text-red-900 font-semibold">{errors.description?.message}</small>}
        <button
          type="submit"
          className=" border bg-indigo-700 hover:bg-indigo-600 hover:cursor-pointer text-white font-bold transition-all rounded-2xl w-35 ml-auto mr-auto pt-1 pb-1 active:rounded-xs"
        >
          Save
        </button>
      </form>
      <h1 className="text-gray-700 text-xl mt-5 mb-5">Recent Task</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {task.length == 0 ? (
          <p className="text-gray-500 text-2xl">No tasks added yet!</p>
        ) : (
          task.map((elem, idx) => {
            return (
              <div key={idx}>
                {editIdx === idx ? (
                  <div key={idx}>
                    <form
                      className=" bg-white border-slate-400 shadow-2xl h-45 rounded-2xl w-40 p-3 flex flex-col justify-around text-center "
                      onSubmit={edithandleSubmit(saveData)}
                    >
                      <input
                        className="border rounded placeholder:text-sm text-center capitalize   focus:outline-none "
                        type="text"
                        placeholder="enter new title"
                        id="editTitle"
                        {...editregister("editTitle", {
                          required: "Please Enter New Title",
                        })}
                      />
                      <textarea
                        className="border rounded placeholder:text-sm text-center capitalize  focus:outline-none"
                        placeholder="enter new description"
                        id="editDescription"
                        {...editregister("editDescription", {
                          required: "Please Enter New Description",
                        })}
                      ></textarea>
                      <div className=" flex flex-row justify-around">
                        <button
                          className="border rounded pt-0.5 pb-0.5 pr-2 pl-2  bg-amber-400 text-white font-bold active:scale-95 hover:cursor-pointer"
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          className="border rounded pt-0.5 pb-0.5 pr-2 pl-2 hover:cursor-pointer bg-red-500 text-white font-bold active:scale-95"
                          onClick={() => {
                            setEditIdx(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className=" bg-white border-slate-400 shadow-2xl h-45 rounded-2xl w-40 p-3 flex flex-col justify-around text-center "
                  >
                    <h2 className="font-bold  line-clamp-4  capitalize'">{elem.title}</h2>
                    <p className="line-clamp-6 text-slate-600 truncate text-sl">{elem.description}</p>
                    <div className="flex flex-row justify-around">
                      <button
                        className="border rounded pt-0.5 capitalize pb-0.5 pr-2 pl-2  bg-cyan-400 text-white font-bold active:scale-95 hover:cursor-pointer"
                        onClick={() => {
                          editStart(idx);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="border rounded capitalize pt-0.5 pb-0.5 pr-2 pl-2 bg-red-500 text-white font-bold active:scale-95 hover:cursor-pointer "
                        onClick={() => {
                          deleteTask(idx);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
