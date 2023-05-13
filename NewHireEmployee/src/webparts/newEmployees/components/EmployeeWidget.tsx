import * as React from 'react';

export function EmployeeWidget(props: any) {
    return (
        <div className="card" style={{ width: '100%' }}>
            <img className="card-img-top" src={props?.photo} alt={props?.name}/>
            <div className="card-body">
                <h6 className="card-title">{props?.name}</h6>
                <p className="card-text">{props?.bio}</p>
                <a href={props?.url} target="_blank" className="btn btn-primary">See Profile</a>
            </div>
        </div>
    )
}