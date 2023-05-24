import React from 'react';
import {
    Text
} from 'react-native';

// Utility
import Font from "../utility/Font";
import {horizontalScale, scaleFontSize, verticalScale} from "../utility/Scale";
import Color from "../utility/Color";

interface LabelProps {
    fontSize?: number,
    bold?: boolean,
    regular?: boolean,
    medium?: boolean,
    light?: boolean,
    thin?: boolean,
    black?: boolean,
    color?: string,
    align?: string,
    mt?: number, // mt = Margin Top Space
    mb?: number, // mb = Margin Bottom Space
    ml?: number, // ml = Margin Left Space
    mr?: number, // mr = Margin Right Space
    mv?: number, // mv = Margin Vertical
    mh?: number, // mh = Margin Horizontal
    pt?: number, // pt = Padding Top
    pb?: number, // pb = Padding Bottom
    pl?: number, // pl = Padding Left
    pr?: number, // pr = Padding Right
    ph?: number, // ph = Padding Horizontal
    pv?: number, // pv = Padding Vertical
    singleLine?: boolean,
    numberOfLine?: number,
    style?: object
}

const defaultProps = {
    fontSize: 14,
    color: Color.black,
    align: 'left',
    mt: null,
    mb: null,
    ml: null,
    mr: null,
    mh: null,
    mv: null,
    pt: null,
    pb: null,
    pl: null,
    pr: null,
    ph: null,
    pv: null,
    singleLine: false,
    numberOfLine: null,
    style: {}
};

const TextLabel = (props: React.PropsWithChildren<LabelProps>) => {

    let styleArray = [];
    let fontFamily;
    if (props.bold)
        fontFamily = Font.bold;
    else if (props.medium)
        fontFamily = Font.medium;
    else if (props.light)
        fontFamily = Font.light;
    else if (props.black)
        fontFamily = Font.black;
    else if (props.bold)
        fontFamily = Font.bold;
    else if (props.thin)
        fontFamily = Font.thin;
    else
        fontFamily = Font.regular;

    if (props.mt)
        styleArray.push({marginTop: verticalScale(props.mt)});
    if (props.mb)
        styleArray.push({marginBottom: verticalScale(props.mb)});
    if (props.ml)
        styleArray.push({marginLeft: horizontalScale(props.ml)});
    if (props.mr)
        styleArray.push({marginRight: horizontalScale(props.mr)});
    if (props.mv)
        styleArray.push({marginVertical: verticalScale(props.mv)});
    if (props.mh)
        styleArray.push({marginHorizontal: horizontalScale(props.mh)});

    if (props.pt)
        styleArray.push({paddingTop: verticalScale(props.pt)});
    if (props.pb)
        styleArray.push({paddingBottom: verticalScale(props.pb)});
    if (props.pl)
        styleArray.push({paddingLeft: horizontalScale(props.pl)});
    if (props.pr)
        styleArray.push({paddingRight: horizontalScale(props.pr)});
    if (props.pv)
        styleArray.push({paddingVertical: verticalScale(props.pv)});
    if (props.ph)
        styleArray.push({paddingHorizontal: horizontalScale(props.ph)});

    styleArray.push({
        fontFamily,
        color: props.color,
        textAlign: props.align,
        fontSize: scaleFontSize(props.fontSize)
    });

    styleArray.push(props.style);

    return (
        <Text numberOfLines={props.singleLine ? 1 : props.numberOfLine}
              style={styleArray}
              allowFontScaling={false}>
            {props.children}
        </Text>
    )
};

TextLabel.defaultProps = defaultProps;

export default TextLabel;
