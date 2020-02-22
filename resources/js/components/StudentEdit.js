import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StudentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dob: "",
            class: "",
            student: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.match.params.student_id);
    }
    // handle change
    handleChange(e) {
        // this.setState({
        //     name: e.target.value
        // });
        // console.log(e.target.value);
        this.setState({[e.target.name]:e.target.value});
    }
    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`api/student_edit/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                // console.log('from handle sumit', response);
                this.props.history.push('/');
            });
    }

    // get all the tasks from backend
    getStudents() {
        axios.get(`api/student_edit/${this.props.match.params.id}/edit`).then(response =>
            this.setState({
                student: response.data.student,
                name: response.data.student.name,
                dob: response.data.student.dob,
                class: response.data.student.class,
            })
        );
    }
    // lifecycle mehtod
    // componentWillMount() {
    //     this.getStudents();
    // }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Student</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    {/*<div className="form-group">*/}
                                    {/*    <textarea*/}
                                    {/*        onChange={this.handleChange}*/}
                                    {/*        value={this.state.name}*/}
                                    {/*        className="form-control"*/}
                                    {/*        rows="5"*/}
                                    {/*        maxLength="255"*/}
                                    {/*        placeholder="Create a new task"*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type={'text'}
                                                   onChange={this.handleChange}
                                                   value={this.state.name}
                                                   className="form-control"
                                                   placeholder="Enter Name"
                                                   name={'name'}

                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">DOB</label>
                                        <div className="col-md-6">
                                            <input type={'text'}
                                                   onChange={this.handleChange}
                                                   value={this.state.dob}
                                                   className="form-control"
                                                   placeholder="Enter Date of Birth"
                                                   name={'dob'}

                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Class</label>
                                        <div className="col-md-6">
                                            <input type={'text'}
                                                   onChange={this.handleChange}
                                                   value={this.state.class}
                                                   name={'class'}
                                                   className="form-control"
                                                   placeholder="Enter class"

                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Edit Student
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentEdit;
