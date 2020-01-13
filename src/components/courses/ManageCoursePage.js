import React,{useEffect,useState} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes  from 'prop-types';
import CourseForm from './CouseForm';
import {newCourse} from '../../../tools/mockData';

function ManageCoursePage({courses,authors,loadAuthors,loadCourses,saveCourse,...props}){

    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    useEffect(
        () => {
    loadCourses().catch(error=>{
      alert("loading courses failed"+error);
    });

    loadAuthors().catch(error=>{
      alert("laoding authors failed"+error);
    })
  },[props.course]);//note always provide the watch list else useEfect would be invoked if there are no changes

  //this works for both dropdownlist and text fields
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course);
  }

  
    return (   
     
    <CourseForm course = {course} errors={errors}  authors={authors} onChange={handleChange} onSave={handleSave} />
      );
  
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
  courses:PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors:PropTypes.func.isRequired,
  loadCourses:PropTypes.func.isRequired,
  saveCourse:PropTypes.func.isRequired
};


export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
  }
  
  function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
      slug && state.courses.length > 0
        ? getCourseBySlug(state.courses, slug)
        : newCourse;
    return {
      course,
      courses: state.courses,
      authors: state.authors
    };
  }
//this approach would expose all the actions as props
// function mapDispatchToProps(dispatch){
//   return {
//     actions:{
//       loadCourses:bindActionCreators(courseActions.loadCourses,dispatch)  ,
//       loadAuthors:bindActionCreators(authorActions.loadAuthors,dispatch)  ,

//     }
//      //   note action creators are called by dispatch
//   };
// }


//declaring mapDispatchToProps as an Object
const  mapDispatchToProps = { 
        loadCourses:courseActions.loadCourses,
        loadAuthors:authorActions.loadAuthors,
        saveCourse:courseActions.saveCourse
      } ;
       



export default connect (mapStateToProps,mapDispatchToProps) (ManageCoursePage);
