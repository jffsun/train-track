import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   // POSSIBLE ERROR - Want an array of strings
   exercises: [],
 });
 
 // used to navigate user to different endpoints
 const navigate = useNavigate();
 
 // these methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     
      // spread operator used to spread prev and value variables into their individual arguments
     return { ...prev, ...value };
   });
 }
 
 // this function will handle the submission connecting front end to back end with fetch requests
 async function onSubmit(e) {
   e.preventDefault();
 
   // when a post request is sent to the create url, we'll add a new workout record to the database.
   const newWorkout = { ...form };
 
   await fetch("http://localhost:3001/workout/add", {
     method: "POST",
     headers: { // our app knows how to handle the data returned which is JSON
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newWorkout),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   // reset the "form" state variable's attributes
   setForm({ name: "", exercises: [] });

   // redirect user to root route
   navigate("/");
 }
 
 // this following section will display the form that takes the input from the user
 return (
   <div>
     <h3>Create New Workout</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="exercises">Exercises</label>
         <input
           type="text"
           className="form-control"
           id="exercise"
           value={form.exercises}
           onChange={(e) => updateForm({ exercises: e.target.value })}
         />
       </div>
      {/* TO DO: ADD BUTTON - Adds additional exercise that populates another input field */}
       <div className="form-group">
         <input
           type="submit"
           value="Create workout"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}