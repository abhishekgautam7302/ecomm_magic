import React from 'react'

import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../Context/search';

const SearchInput = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/v1/product/search/${search.keyword}`);
            setSearch({ ...search, results: res.data });
            navigate('/search');

        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
        <form className="d-flex align-items-center" role="search" onSubmit={handleSubmit}>
          <input 
            className="form-control rounded-start-3 border-end-1 border-b-0 rounded-end-0" 
            type="search" 
            placeholder="Search..." 
            aria-label="Search"
            name="search"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            style={{ height: "38px" }}
          />
          <button 
            className="form-control btn btn-light rounded-start-0 rounded-end-3 border-start-2 d-flex align-items-center justify-content-center" 
            type="submit"
            style={{ height: "38px", width: "45px" }}
          >
            <CiSearch size={20} />
          </button>
        </form>
      </div>
      
    )
}

export default SearchInput;





