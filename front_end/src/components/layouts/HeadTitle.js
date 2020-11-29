import React from 'react'


function HeadTitle(props) {
    return (
        <div className="d-flex justify-content-center mb-4 col-12">
            <div className="col-md-7 text-center heading-section">
                <span className="subheading">{props.EngTitle}</span>
                <h2 className="mb-3">{props.HdTitle}</h2>
            </div>
        </div>
    )
}

export default HeadTitle;
