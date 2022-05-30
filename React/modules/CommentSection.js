import React from 'react';
import {SafeAreaView, StyleSheet,TextInput } from 'react-native';

const CommentTextInput = () => {
    return(
        <SafeAreaView>
            <TextInput
                style={styles.input}
                borderColor={global.mainColor}
                onChangeText={newText => global.comment = newText}
                placeholder='Entrez votre commentaire...'
                multiline={true}
                numberOfLines={4}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        maxHeight: 700,
        marginVertical: 15,
        borderWidth: 5,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top'
    },
});

export default CommentTextInput;