import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';


// Handling the try catch of all controller function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};


// Get all students
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {

  const result = await StudentServices.getAllStudentsFromDB();
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Data Retrieved Successfully',
    data: result,
  });
});

// Get Single student from database
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getSingleStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single student data retrieved successfully',
    data: result,
  });
});

// Get Single student from database
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const deleteStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
