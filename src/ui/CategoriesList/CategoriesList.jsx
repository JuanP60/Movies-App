import React from "react";
import { useApiTMDB } from "../../hooks/ProviderApiTMDB";
import { useNavigate } from "react-router-dom";

function CategoriesList() {

    const {fetchCategories, categories} = useApiTMDB();
    const navigate = useNavigate();

    // podriamos agregar en el apiprovider manejo dde errores para el fetch de categories.
    React.useEffect(() => {
        fetchCategories();
    }, [])

    // funcion para enviar a la ruta por categoria

    const categoriesRoute = (id, name) => {
        navigate(`/category/${id}/${name}`);
    };

    return (
        <div className="flex justify-center mt-20">
            <ul className="flex justify-center max-w-6xs lg:max-w-6xl flex-wrap gap-3.5">
                {categories.map(category => (
                    <li 
                    key={category.id} 
                    className="cursor-pointer border border-red-950 rounded-xl p-1 sm:p-2 text-sm lg:text-base hover:bg-red-950"
                    onClick={() => categoriesRoute(category.id, category.name)}
                    >{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export {CategoriesList};