import React, {RefObject} from "react";

/* Hold the reference of navigation bar to use it globally */
export const navigationRef : RefObject<any> = React.createRef();

// For Navigate to respected route with data using global navigation reference
export const navigate = (name : string,params : object) => {
    navigationRef.current?.navigate(name,params);
};
