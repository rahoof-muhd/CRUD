import { Link } from "react-router-dom";

function Home(){
    return(
        <>
        <h1 className=" text-center text-4xl mt-14">CRUD OPERTION</h1>

          <div className=" mt-28 text-xl flex gap-24 justify-center">
            <div className=" bg-blue-600 h-14 pt-3 text-white ">
            <Link to="/create" className=" p-8">Add Employee</Link>
            </div>
            <div className=" bg-blue-600 h-14 pt-3 text-white ">
            <Link to="/read" className=" p-8">Employee List</Link>
            </div>
          </div>
        {/* <hr className=" w-screen h-[2px] bg-black" /> */}
        </>
    )
}
export default Home;