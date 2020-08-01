import React, { Component } from 'react'
import PostRegistration from "../registration/PostRegistration";

const userData = {name:'shawn', age: '21'}
class CreateMentee extends Component {
    render() {
        return (
            <div>
                <PostRegistration data = {userData} />
            </div>
            
        )
    }
}

export default CreateMentee