import React from 'react';
import {SafeAreaView, StyleSheet,TextInput } from 'react-native';

const CommentTextInput = () => {
    return(
        <SafeAreaView>
            <TextInput
                style={{
                    borderColor: global.mainColor,
                    height: 300,
                    margin: 12,
                    borderWidth: 5,
                    borderRadius: 10,
                    padding: 10,
                    width: '0%',
                    textAlignVertical: 'top'
                }}
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
      height: 40,
      margin: 12,
      borderWidth: 5,
      borderRadius: 10,
      padding: 10,
    },
});

export default CommentTextInput;