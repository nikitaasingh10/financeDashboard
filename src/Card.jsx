import React from "react";

const Card = ({title, children, style, className}) => {
    return (
        <div className={className} style={style}>
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default Card;