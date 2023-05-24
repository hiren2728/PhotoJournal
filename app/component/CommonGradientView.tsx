import React,{PropsWithChildren} from "react";

// Third Party
import LinearGradient from 'react-native-linear-gradient';
import Color from "../utility/Color";

interface GradientViewProps {
    colors? : Array<string>,
    style? : Object
}

const defaultProps = {
    colors : [Color.gradient_black_zero,Color.gradient_black_100],
    style : {}
};

const CommonGradientView = (props : PropsWithChildren<GradientViewProps>) => {
    return(
        <LinearGradient colors={props.colors || []} style={props.style}>
            {props.children}
        </LinearGradient>
    )
};

CommonGradientView.defaultProps = defaultProps;

export default CommonGradientView;
