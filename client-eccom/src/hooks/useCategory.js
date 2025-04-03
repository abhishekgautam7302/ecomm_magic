import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategories = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            setCategories(data?.category || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            // Consider adding error state handling here
        }
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]); // Now properly included in dependencies

    return categories;
}