import React from 'react';

const Title = ({title,icon}) => {
    return (
        <div className="pb-3">
            {icon}
            <span className="px-3">
                {title}
            </span>
        </div>
    );
};

export default Title;
