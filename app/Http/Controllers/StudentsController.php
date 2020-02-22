<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;


class StudentsController extends Controller
{
    public function insert(Request $request){
//        return $request->all();

        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $student=new Student();
        $student = $student->create([
            'name' => $request->name,
            'dob' => $request->dob,
            'class' => $request->class,
        ]);

        return $student;
    }


    public function index(Request $request, Student $student) {
        // get all the tasks based on current user id
        $allStudents = Student::all();
//        $students = $allStudents->orderBy('created_at', 'desc')->take(20)->get();
        // return json response
        return response()->json([
            'students' => $allStudents,
        ]);
    }


    public function edit($id) {
        $student = Student::findOrFail($id);
        return response()->json([
            'student' => $student,
        ]);
    }

    public function update(Request $request, $id) {
        $input = $request->all();
        $student = Student::findOrFail($id);
        $student->update($input);
        return $student;
    }

    public function delete($id) {
        Student::findOrFail($id)->delete();
    }
}
