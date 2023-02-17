import React, { useEffect, useState } from "react";

// lets the user navigate to another page by clicking
import { Link } from "react-router-dom";
 
const Workout = (props) => (
 <tr>
   <td>{props.workout.name}</td>
   <td>{props.workout.exercises}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.workout._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteWorkout(props.workout._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function WorkoutList() {
// state variables initially set to empty array POSSIBLE BUG 
 const [workouts, setWorkouts] = useState([]);
 
 // This method fetches the workouts from the database.
 useEffect(() => {
   async function getWorkouts() {
     const response = await fetch(`http://localhost:3001/workout/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       console.log('GET Request fail')
       return;
     }
 
     const workouts = await response.json();
     setWorkouts(workouts);
   }
 
   getWorkouts();
 
   return;
 }, [workouts.length]);
 
 // this method will delete a workout based on workout's id
 async function deleteWorkout(id) {
   await fetch(`http://localhost:3001/${id}`, {
     method: "DELETE"
   });
 
   const newWorkouts = workouts.filter((el) => el._id !== id);
   setWorkouts(newWorkouts);
 }
 
 // this method will map out the workouts on the table
 function workoutList() {
   return workouts.map((workout) => {
     return (
       <Workout
         workout={workout}
         deleteWorkout={() => deleteWorkout(workout._id)}
         key={workout._id}
       />
     );
   });
 }
 
 // this following section will display the table with the workouts of individuals.
 return (
   <div>
     <h3>Workout List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Exercises</th>
         </tr>
       </thead>
       <tbody>{workoutList()}</tbody>
     </table>
   </div>
 );
}