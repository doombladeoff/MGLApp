import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps { }

export const Input: React.FC<InputProps> = (props) => {
    return (
        <TextInput
            placeholderTextColor="#80838A"
            {...props}
            style={{
                width: '100%',
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: '#2F3137',
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: 'white',
                fontSize: 16,
            }}
        />
    );
};