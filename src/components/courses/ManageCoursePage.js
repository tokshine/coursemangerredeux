import React,{useEffect,useState} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes  from 'prop-types';
import CourseForm from './CouseForm';
import {newCourse} from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";

function ManageCoursePage({courses,authors,loadAuthors,loadCourses,saveCourse,history,...props}){

    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false); //local state -- this state is not required  for the whole application,we dont need redux help here

    useEffect(
        () => {
    if (courses.length ===0){
        loadCourses().catch(error=>{
        alert("loading courses failed"+error);
        });
    } else{
            setCourse({...props.course}); //update the course object when a new course is passed
    }
    if (authors.length ===0){
        loadAuthors().catch(error=>{
        alert("laoding authors failed"+error);
        });
    }
  },[props.course]);//note always provide the watch list else useEfect would be invoked if there are no changes

  //this works for both dropdownlist and text fields
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  //client side validation
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course).then(()=>{ 
      toast.success ("Course saved.");
        history.push("/courses"); //note after saving it goes to courses ,hence redirecting resets the saving flag to false
    }).catch(error=> {
      setSaving(false); setErrors({onSave:error.message})
    });
  }

  
    return (   
     authors.length===0 || courses.length ===0 ?(<Spinner/>) : 
    <CourseForm course = {course} errors={errors}  authors={authors} onChange={handleChange} onSave={handleSave} saving={saving} />
      );
  
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
  courses:PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors:PropTypes.func.isRequired,
  loadCourses:PropTypes.func.isRequired,
  saveCourse:PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
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
