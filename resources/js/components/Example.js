import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
// import { Link } from "react-router-dom";
import StudentEdit from './StudentEdit';
import {Link, BrowserRouter, Route} from 'react-router-dom';

class Example extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dob: "",
            class: "",
            students: []
        };
        // this.changeName = this.changeName.bind (this);
        // this.inputChangeHandler = this.inputChangeHandler.bind (this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);

        console.log('constructor');
    }

    componentDidMount() {
        console.log('did mount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update');
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    // changeName = () => {
    //     //     this.setState({name:'kasun samanpriya'});
    //     // };
    //     //
    //     // inputChangeHandler = (event) => {
    //     //     // console.log(event.target.value);
    //     //     this.setState({name:event.target.value});
    //     // };

    handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('api/student_insert',this.state
        ).then((response)=>{
            this.setState={
                name: "",
                dob: "",
                class: "",
            };
            this.getStudents();
        }).catch(error=>{
            console.log(error.response);
        });
    };

    handleChange(e) {
        // this.setState({
        //         //     name: e.target.value,
        //         //     dob: e.target.value,
        //         //     class: e.target.value
        //         //
        //         // });

        this.setState({[e.target.name]:e.target.value});


        // console.log(e.target.value);
    }


    renderStudents() {
        return this.state.students.map(students => (
            <div key={students.id} className="media">
                <div className="media-body">
                    <div>



                        {students.name}{" "}
                        {students.dob}{" "}
                        {students.class}{" "}
                        {/*<span className="text-muted">*/}
                        {/*    <br />*/}
                        {/*    by {students.name} |{" "}*/}
                        {/*    {students.updated_at*/}
                        {/*        .split(" ")*/}
                        {/*        .slice(1)*/}
                        {/*        .join(" ")}*/}
                        {/*</span>*/}
                        <Link to={'/edit_student/'+students.id} //params={{ student_id:students.id  }}
                            className="btn btn-sm btn-success float-right">
                            Update
                        </Link>
                        <button
                            onClick={() => this.handleDelete(students.id)}
                            className="btn btn-sm btn-warning float-right"
                        >
                            Delete
                        </button>
                    </div>
                    <hr />
                </div>
            </div>
        ));
    }
    // get all the students from backend
    getStudents() {
        axios.get("api/student_index").then(response =>
            this.setState({
                students: [...response.data.students]
            })
        );
    }
    // lifecycle mehtod
    componentWillMount() {
        this.getStudents();
    }
    // handle delete
    handleDelete(id) {
        // remove from local state
        const isNotId = student => student.id !== id;
        const updatedStudents= this.state.students.filter(isNotId);
        this.setState({ students: updatedStudents });
        // make delete request to the backend
        axios.delete(`api/student_delete/${id}`);
    }

    render() {
        // console.log('render');
        return (
            <BrowserRouter>
                <Route path={'/'} exact>
                    <div className="row">
                        <div className="container">
                            {/*<div className="row justify-content-left">*/}
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header">Student</div>

                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            {/*<form >*/}
                                            <div className="form-group row">
                                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Name</label>
                                                <div className="col-md-6">
                                                    <input type={'text'}
                                                           onChange={this.handleChange}
                                                           value={this.state.name}
                                                           className="form-control"
                                                           placeholder="Enter Name"
                                                           name={'name'}
                                                           required
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
                                                           required
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
                                                           required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-md-8 offset-md-4">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Add Student
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        {this.renderStudents()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*</div>*/}



                        {/*<div className="container">*/}
                        {/*    /!*<div className="row justify-content-right">*!/*/}
                        {/*        <div className="col-md-5">*/}
                        {/*            <div className="card">*/}
                        {/*                <div className="card-header">Student</div>*/}

                        {/*                <div className="card-body">*/}
                        {/*                    /!*<form onSubmit={this.handleSubmit}>*!/*/}
                        {/*                    <form >*/}
                        {/*                        <div className="form-group row">*/}
                        {/*                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Name</label>*/}
                        {/*                            <div className="col-md-6">*/}
                        {/*                                <input type={'text'}*/}
                        {/*                                       onChange={this.handleChange}*/}
                        {/*                                       value={this.state.name}*/}
                        {/*                                       className="form-control"*/}
                        {/*                                       placeholder="Enter Name"*/}
                        {/*                                       required*/}
                        {/*                                />*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="form-group row">*/}
                        {/*                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">DOB</label>*/}
                        {/*                            <div className="col-md-6">*/}
                        {/*                                <input type={'text'}*/}
                        {/*                                       onChange={this.handleChange}*/}
                        {/*                                       value={this.state.dob}*/}
                        {/*                                       className="form-control"*/}
                        {/*                                       placeholder="Enter Date of Birth"*/}
                        {/*                                       required*/}
                        {/*                                />*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}

                        {/*                        <div className="form-group row">*/}
                        {/*                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Class</label>*/}
                        {/*                            <div className="col-md-6">*/}
                        {/*                                <input type={'text'}*/}
                        {/*                                       onChange={this.handleChange}*/}
                        {/*                                       value={this.state.class}*/}
                        {/*                                       className="form-control"*/}
                        {/*                                       placeholder="Enter class"*/}
                        {/*                                       required*/}
                        {/*                                />*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="form-group row mb-0">*/}
                        {/*                            <div className="col-md-8 offset-md-4">*/}
                        {/*                                <button*/}
                        {/*                                    type="submit"*/}
                        {/*                                    className="btn btn-primary"*/}
                        {/*                                >*/}
                        {/*                                    Add Student*/}
                        {/*                                </button>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </form>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                    </div>
                </Route>
                <Route path='/edit_student/:student_id' component={StudentEdit} />
            </BrowserRouter>

        );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
