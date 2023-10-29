
import '../style/App.css';
import TableauCours from './TableauCours';
import SearchBar from './SearchBar';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const getOrders = async (course) => {
    try{
      console.log('get orders est appelé')
      if (course.orders_list.length !== 0){
        const response = await Axios.get(`http://localhost:3001/orders/course/${course.course_id}`);
        if (response.status === 200){
          let r = await response.data
          return(r)
        }
      }
      else{
        return []
      }
    }
    catch(err){
        console.log(err)
        return []
    }
  }


  const getCourse = async () => {
    console.log("get course appelé")
    let ajd = new Date();
    let date = new Date().setDate(ajd.getDate()-7)
    try{
      let response = await Axios.get(`http://localhost:3001/course/after/${date}`);
      if( response.status === 200 ){
        updateCourseList(response.data)
      }
    }
    catch(err){
      alert("server surement turn off")
      return false
    }
  }
  let [courseList, updateCourseList] = useState(false)
  
  useEffect(() => {
    getCourse()
  },[])
  // let sortedData= dataSort(comandes)
  return (
    <div id="page ">
      <SearchBar titre={"Présence à l'EPK"}/>
      <div id="boiteCours">
        {
          courseList !== false &&
          courseList.map((course) => (

          <TableauCours key={course.id} course={course} ordersList={getOrders(course)}/>
        ))
        }
      </div>
    </div>

  );
}

export default App;
