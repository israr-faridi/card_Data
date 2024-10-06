import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./App.css"
import { modelImages } from './utils/image';


const App = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState([])
  const [search, setSearch] = useState('')
  const [found, setFound] = useState(false)
  const [filterProduct, setFilterProduct] = useState([])
  const getData = async () => {
    setLoading(true)
    try {
      const data = await axios.get('https://freetestapi.com/api/v1/cars');
      const res = data?.data
      setLoading(false)
      const Models = [... new Set(res.map((item) => item.model))]
      setModel(Models)
      setFilterProduct(res)
      setProduct(res)
    }
    catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSearch = () => {
    const filterSearch = filterProduct.filter((item) => item.model.toLowerCase().includes(search.toLowerCase()))
    if (filterSearch.length == 0) {
      setFound(true)
    } else {
      setFound(false)
      setFilterProduct(filterSearch)
    }
  }

  const handleEnterSearch=(e)=>{
    if(e.key=="Enter"){
      handleSearch()
    }
  }

  const handleVale = (cat) => {
    if (cat == "All") {
      setFilterProduct(product)
    } else {
      const filterData = product.filter((item) => item.model === cat)
      setFilterProduct(filterData)
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='bg-slate-300'>

      {
        loading ? <div className="loader"></div> :
          <>
           <div className='flex flex-col sm:flex-row w-full justify-center items-center pt-3 gap-3'>
  <input
    className='w-full sm:w-[45%] md:w-[40%] lg:w-[35%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    onKeyDown={handleEnterSearch}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder='Search...'
  />
  
  <select
    className='w-full sm:w-[30%] md:w-[25%] lg:w-[20%] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    onChange={(e) => handleVale(e.target.value)}
  >
    <option value="All">All</option>
    {model.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ))}
  </select>

  <button
    className='w-full sm:w-[20%] md:w-[15%] lg:w-[12%] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
    onClick={handleSearch}
  >
    Search
  </button>
</div>


            {
              found ? <p className='w-full flex justify-center items-center mt-32 text-3xl font-bold'>data not found</p> :
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {filterProduct.map((item, index) => {
                const { year, model, color } = item;
                const imageUrl=modelImages[model]||'https://robbreport.com/wp-content/uploads/2024/07/mistral01.jpg?w=1000';
                return (
                  <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img className='w-full h-52 object-cover' src={imageUrl} />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{model}</h3>
                      <div className="flex justify-between py-2">
                      <p className="text-gray-600">Year: {year}</p>
                      <p className="text-gray-600">Color: {color}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            }

          </>
      }

    </div>
  )
}

export default App
