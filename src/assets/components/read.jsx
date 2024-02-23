import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Read() {
    const [data, setData] = useState();


    const [updateFormData, setUpdateFormData] = useState({
        userId: "",
        name: "",
        phone: "",
        email: "",
        description: ""
    });




    useEffect(()=> {
        axios.get("http://localhost:3000/api/read")
        .then(res=> {
            setData(res.data)
        })
    },[])



    const handleDelete = (userId) => {
        axios.delete(`http://localhost:3000/api/delete/${userId}`)
        .then(res => {
            // Remove the deleted item from the data array
            setData(data.filter(item => item.userId !== userId));
            alert(res.data.msg)
        })
        .catch(error => {
            console.error('Error deleting employee:', error);
        });
    };


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/read");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/api/update/${updateFormData.userId}`, updateFormData);
            // Refresh data after update
            fetchData();
            // Clear form data
            setUpdateFormData({
                userId: "",
                name: "",
                phone: "",
                email: "",
                description: ""
            });
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };


    const handleChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };


    return(
        <>
                <div>
                <div className=" p-6 flex gap-20">
          <h1 className=" text-3xl text-red-500 font-sans font-bold">Employees List</h1>
          <div className=" pl-32 text-xl flex gap-10 text-blue-600 font-bold">
            <Link to="/">Home</Link>
            <Link to="/create">Add Employees</Link>
          </div>
        </div>
        <hr className=" w-screen h-[2px] bg-black" />
                  <table className=" border-black border-2 m-auto place-items-center mt-10">
                    <thead className=" border-black border-2">
                        <tr >
                            <th className=" border-black border-2 p-2">Employee Id</th>
                            <th className=" border-black border-2 p-2">Employee Name</th>
                            <th className=" border-black border-2 p-2">Phone</th>
                            <th className=" border-black border-2 p-2">Email</th>
                            <th className=" border-black border-2 p-2">Description</th>
                            <th className=" border-black border-2 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=" border-black border-2">
        {data?.map((item, index) => (
            // <React.Fragment key={index}>
            //     <tr></tr>
            // </React.Fragment>
            <tr key={index}>
                <td className=" border-black border-2 p-2">{item.userId}</td>
                <td className=" border-black border-2 p-2">{item.name}</td>
                <td className=" border-black border-2 p-2">{item.phone}</td>
                <td className=" border-black border-2 p-2">{item.email}</td>
                <td className=" border-black border-2 p-2">{item.description}</td>
                <td className=" flex justify-evenly w-36">
                    <button  onClick={() => {
                                        setUpdateFormData({
                                            userId: item.userId,
                                            name: item.name,
                                            phone: item.phone,
                                            email: item.email,
                                            description: item.description
                                        });
                                    }}  className=" bg-blue-500 mt-2 text-white p-1 text-sm">Update</button>
                                   
                    <button onClick={() => handleDelete(item.userId)} className=" bg-red-500 mt-2 text-white text-sm p-1">Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
        </table>


        <div className=" mt-20">
                <h2 className="text-center text-2xl">Update Employee</h2>
                <div className="flex justify-center">
                    <div className=" flex ">
                        <input type="text" name="userId" value={updateFormData.userId} onChange={handleChange} placeholder="Employee Id" className="block border border-grey-light w-full p-3 mt-2" />
                        <input type="text" name="name" value={updateFormData.name} onChange={handleChange} placeholder="Name" className="block border border-grey-light w-full p-3 mt-2" />
                        <input type="text" name="phone" value={updateFormData.phone} onChange={handleChange} placeholder="Phone" className="block border border-grey-light w-full p-3 mt-2" />
                        <input type="text" name="email" value={updateFormData.email} onChange={handleChange} placeholder="Email" className="block border border-grey-light w-full p-3 mt-2" />
                        <input type="text" name="description" value={updateFormData.description} onChange={handleChange} placeholder="Description" className="block border border-grey-light w-full p-3 mt-2" />
                        <button onClick={handleUpdate} className="bg-blue-500 text-white p-3 w-full mt-5 relative bottom-2">Update Employee</button>
                    </div>
                </div>
            </div>
        

        </div>
        </>
    )
}
export default Read;