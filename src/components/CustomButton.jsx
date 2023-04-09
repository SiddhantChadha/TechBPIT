import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {Colors} from "../colors";

const CustomButton = (props) => {
    return (
        <Pressable style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginHorizontal: "10%",
        borderRadius: 8,
        elevation: 3,
        backgroundColor: Colors.PRIMARY_BLUE,
        marginVertical: '5%'
    },
    text: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.25,
        color: Colors.WHITE,
    },
});

export default CustomButton