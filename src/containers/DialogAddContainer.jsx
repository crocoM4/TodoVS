﻿// import React from 'react';
// import PropTypes from 'prop-types';

// import {
//   SELECT_WANT_TO_ADD,
//   ADD_CATEGORY,
//   ADD_ARGUMENT,
//   SELECT_CATEGORY,
//   DONE,
// } from '../constants/steps';

// import Dialog from '../components/dialogAdd/Dialog';
// import SelectAction from '../components/dialogAdd/SelectAction';
// import AddCategory from '../components/dialogAdd/AddCategory';
// import SelectCategory from '../components/dialogAdd/SelectCategory';
// import AddTodoArgument from '../components/dialogAdd/AddTodoArgument';
// import Done from '../components/dialogAdd/Done';

// const getContentToRender = (steps) => {
//   if (steps.length === 0) {
//     return <SelectAction />;
//   }
//   const lastStep = steps[steps.length - 1];
//   switch (lastStep.stepId) {
//     case SELECT_WANT_TO_ADD:
//       return <SelectAction />;
//     case ADD_CATEGORY:
//       return <AddCategory />;
//     case ADD_ARGUMENT:
//       return <AddTodoArgument />;
//     case SELECT_CATEGORY:
//       return <SelectCategory />;
//     case DONE:
//       return <Done />;
//     default:
//       return <SelectAction />;
//   }
// };

// const DialogAddContainer = props =>
//   <Dialog {...props} contentToRender={getContentToRender(props.steps)} />;

// DialogAddContainer.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onBack: PropTypes.func.isRequired,
//   steps: PropTypes.arrayOf(PropTypes.shape({
//     stepId: PropTypes.string.isRequired,
//     options: PropTypes.shape({}),
//   })).isRequired,
// };

// // const mapStateToProps = state => (
// //   {
// //     isOpen: state.dialogAdd.isOpen,
// //     contentToRender: getContentToRender(state.dialogAdd.steps),
// //   }
// // );

// // const mapDispatchToProps = dispatch => (
// //   {
// //     onClose: () => {
// //       dispatch(toogleOpen(false));
// //     },
// //     onBack: () => {
// //       dispatch(goPreviousStep());
// //     },
// //   }
// // );

// // const DialogAddContainer = connect(
// //   mapStateToProps,
// //   mapDispatchToProps,
// // )(Dialog);

// export default DialogAddContainer;