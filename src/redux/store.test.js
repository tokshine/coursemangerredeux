import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      id: 1,
      title: "Clean Code"
    };
    const course2 = {
      id: 2,
      title: "Clean Code2"
    };
  
    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);
  
    const action2 = courseActions.createCourseSuccess(course2);
    store.dispatch(action2);

      
    const updateCourse = { id: 2, title: "Update Title" };
    const action3 = courseActions.updateCourseSuccess(updateCourse);
    store.dispatch(action3);



    // assert
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
    const updatedCourse = store.getState().courses.find(c=>c.id== 2);
    expect(updateCourse.title).toEqual(updatedCourse.title);
    expect(store.getState().courses.length).toEqual(2);

  });
  