import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 

export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   // POSSIBLE BUG: empty array instead of empty string to store multiple workouts 
   exercises: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 // useEffect hook : side EFFECT that occurs
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3001/workout/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const workout = await response.json();
     if (!workout) {
       window.alert(`Workout with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(workout);
   }
 
   fetchData();
 
   return;
    // whenever params.id value changes, run the useEffect hook
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedWorkout = {
     name: form.name,
     exercises: form.exercises,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3001/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedWorkout),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   
   // redirect user to root route
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Workout</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="exercises">Exercises: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}