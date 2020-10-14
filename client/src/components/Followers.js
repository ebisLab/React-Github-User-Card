import React from 'react';
import Users from './Users'

const Followers = (props) => {

    return(
        <div style={{margin: '50px'}}>
<h1>My followers</h1>
   {props.followers.map(folks => (
       <Users key={folks.id} folks={folks} />
       ))}

        </div>
    )
}

export default Followers