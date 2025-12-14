import React from "react";

const Card = ({title, amount, style, className}) => {
    console.log(`🔄 Card "${title}" is rendering`);
    return (
        <div className={className} style={style}>
            <h3>{title}</h3>
            <h3>${amount}</h3>
        </div>
    );
};

export default React.memo(Card);

/*
React.memo does:
    Only re-renders Card if props actually change
    Compares prev props vs new props
    Skips render if props are the same
*/