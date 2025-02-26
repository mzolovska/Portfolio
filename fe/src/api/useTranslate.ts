import { useState } from "react";
import axios from "../shared/useAxiosInstance";

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE; // Replace with your key

export const useTranslate = () => {
    const [translatedText, setTranslatedText] = useState("");

    const translate = async (text: string, target: string) => {
        try {
            const response = await axios.post(
                `https://translation.googleapis.com/language/translate/v2`,
                {},
                {
                    params: {
                        q: text,
                        target: target,
                        key: API_KEY,
                    },
                }
            );
            setTranslatedText(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error("Translation error", error);
        }
    };

    return { translatedText, translate };
};
