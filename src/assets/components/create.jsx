import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import React, { useState } from "react";
import axios from "axios"


function Create() {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    phone: '',
    email: '',
    description: ''
  });




  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });






  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  

    try {
      console.log(formData);
      const response = await axios.post('http://localhost:3000/api/create', formData);
      console.log(response.data);
      alert(response.data.msg)
      navigate("/read")
    } catch (error) {
      alert('failed:' + error.response.data.msg)
      console.error('failed:', error.response.data.msg);
    }
  };


  return (
    <>
      <div className="">
        <div className=" p-6 flex gap-20">
          <h1 className=" text-3xl text-red-500 font-sans font-bold">New Employee</h1>
          <div className=" pl-32 text-xl flex gap-10 text-blue-600 font-bold">
            <Link to="/">Home</Link>
            <Link to="/read">Employees List</Link>
          </div>
        </div>
        <hr className=" w-screen h-[2px] bg-black" />
        <form onSubmit={handleSubmit} className=" grid bg-slate-400 w-96 gap-10 m-auto place-items-center p-10 mt-16">
          <div className=" flex w-full ">
            <label className="  w-1/2"> Employee Id:</label>
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="" />
          </div >
          <div className="flex w-full">
            <label className="w-1/2"> Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="" />
          </div>
          <div className=" w-full" >
            <div className="flex w-full">
          <label className="w-1/2">Phone: </label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          
          <div className="flex w-full">
          <label className="w-1/2"> Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="flex w-full">
          <label className="w-1/2"> Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className=" bg-blue-600 text-white p-1 pl-2 pr-2 text-center">
            <input type="submit" value={"Add Employee"} />
          </div>
        </form>
      </div>
    </>
  );
}

export default Create;



