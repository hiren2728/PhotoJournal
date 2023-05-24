import React from "react";
import {
    TextInput
} from 'react-native';
import Color from "../utility/Color";
import Font from "../utility/Font";
import {scaleFontSize} from "../utility/Scale";

interface Props {
    fontSize?: number,
    fontFamily?: string,
    inputColor?: string,
    style?: object,
    placeholder?: string,
    extraProps?: object,
    onChangeText : (value : string) => void,
    editable? : boolean,
    value : string
}

const defaultProps = {
    fontSize: 16,
    fontFamily: Font.regular,
    inputColor: Color.gray,
    style: {},
    placeholder: "",
    extraProps: {},
    editable : true,
    value : ""
};


const TextInputArea = (props: Props) => {
    let style = {
        fontFamily: props.fontFamily,
        color: props.inputColor,
        fontSize: scaleFontSize(props.fontSize),
        ...props.style
    };

    return (
        <TextInput multiline={true}
                   style={style}
                   placeholder={props.placeholder}
                   placeholderTextColor={Color.gray}
                   onChangeText={props.onChangeText}
                   editable={props.editable}
                   value={props.value}
                   {...props.extraProps}/>
    )
};

TextInputArea.defaultProps = defaultProps;

export default TextInputArea;
