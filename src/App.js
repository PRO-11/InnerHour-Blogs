import logo from './logo.png'
import './App.css';
import Card from './Card';
import { useEffect, useState } from 'react';
import axios from "axios"
function App() {
  const [data,setData]=useState([]);
  //Pagination State
  const [pageNo,setPageNo]=useState(1)
  const [limit,setlimit]=useState(0)
  //Modal State
  const [modal,setmodal]=useState(false)
  const [modelDetail,setDetail]=useState([])
  //Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    console.log(query)
    setSearchQuery(query);

    // Filter the cards based on the search query
    const filtered = data.filter((card) =>
      card.title.toLowerCase().includes(query)
    );
    console.log(filtered)
    setFilteredCards(filtered);
  };

  const handlePrevious=()=>{
    console.log("previous")
    setPageNo(pageNo-1);
  }
  const handleNext=()=>{
    console.log("next")
    console.log(limit)
    setPageNo(pageNo+1);
  }

  const openModal=async(slug)=>{
    console.log(slug)
    setmodal(true)
    const response=await axios.get(`https://api.theinnerhour.com/v1/blogdetail/${slug}`)
      console.log(response.data)
      setDetail(response.data.blog)

  }
  useEffect(()=>{
    const getApiData=async()=>{
      const response=await axios.get(`https://api.theinnerhour.com/v1/customers/resources/articles/list?page=${pageNo}&limit=10`)
      console.log(response.data.total_page)
      setlimit(response.data.total_page)
      setData(response.data.data)
    }
    getApiData()
  },[pageNo])
  return (
    <div class=" flex flex-col min-h-screen overflow-y-auto" >
     
     {modal&&<div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed   bg-black bg-opacity-50 top-0 left-0 right-0 z-50 flex justify-center   w-full p-11  overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full ">
      
    <div class="relative w-full max-w-3xl max-h-full flex flex-col  ">
    <button type="button" class="mb-3   bg-gray-600 rounded-full text-sm p-1.5 ml-auto inline-flex flex-row-reverse items-center text-white" data-modal-hide="defaultModal" onClick={()=>setmodal(false)}>
                    <svg aria-hidden="true" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
        <div class="relative bg-white rounded-xl shadow dark:bg-gray-700">
            
            <div class="flex items-start justify-between   rounded-3xl dark:border-gray-600">
               <img src={"https:"+modelDetail.thumb} class="rounded-t-lg w-full h-96"/>
               
            </div>
          
            <div class="p-6 space-y-6">
              <h1 class="  text-black font-extrabold text-xl">{modelDetail?.title}</h1>
                <p class="text-base text-black font-normal" dangerouslySetInnerHTML={{ __html:modelDetail?.body }}>
                    
                </p>
            </div>
          
        
        </div>
    </div>
</div>}
      <div >
        <img src={logo} class="mx-28 my-3 h-12" />
      </div>
      <div class=" min-h-screen overflow-y-auto md:w-full w-max " style={{"backgroundColor":"#f5f5f5"}}>
      <div class="flex  flex-row md:justify-between  ">
        {(searchQuery.trim().length==0)&&<h3 class="mx-28 my-14 font-semibold text-xl">All articles</h3>}
        {(searchQuery.trim().length!=0)&&<h3 class="mx-28 my-14 font-semibold text-xl w-auto ">Search results for:{searchQuery}</h3>}
        <div class="flex items-center justify-center  ">
        <div class="relative text-gray-600">
      <input type="text" name="q" value={searchQuery}
        onChange={handleSearch} class="md:w-80 w-1/2 p-3 pl-5 mx-16 text-sm text-black rounded-md  focus:outline-none focus:bg-white " placeholder="Search articles" autocomplete="off"/>
      <span class="absolute inset-y-0 right-0 pt-2 pr-24 md:pr-16  flex-row-reverse">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
    </div>
      </div>
      </div>
      <div className=" mx-24  mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-1 ">
      {(searchQuery.trim().length==0)&&data.map((ele)=>{
        return <Card key={ele.id} title={ele.title} imgUrl={"https:"+ele.thumb} description={ele.short_description} slug={ele.slug} openModal={openModal}/>
      })}
      </div>
      {(filteredCards.length>0&&searchQuery.trim().length>0)?<div className=" mx-24  mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-1 ">
      {filteredCards.map((ele)=>{
        return <Card key={ele.id} title={ele.title} imgUrl={"https:"+ele.thumb} description={ele.short_description} slug={ele.slug} openModal={openModal}/>
      })}
      </div>:
      searchQuery.trim().length!=0&&<p class="text-center text-lg font-bold">No results for this search</p>

      }
      <div className="flex justify-between sm:justify-end items-center mt-10 gap-1">
      {(searchQuery.trim().length==0)&&<button disabled={pageNo<=1} className={`${
                  pageNo > 1
                    ? "hover:bg-gray-400 hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                } mx-3 my-3 w-fit  flex justify-center items-center text-lg text-center font-semibold px-3 py-1 border-2  rounded-lg text-gray-800] `} onClick={handlePrevious}>
      &larr;  Prev
      </button>}
       {(searchQuery.trim().length==0)&&<button disabled={pageNo== limit}  className={`${
                  pageNo< limit
                    ? "hover:bg-gray-400 hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                } mx-3 my-3 w-fit  flex justify-center items-center text-lg text-center font-semibold px-3 py-1 border-2  rounded-lg text-gray-800] `} onClick={handleNext}>
         Next &rarr;
      </button>}
  </div>
      </div>
       
    </div>
  );
}

export default App;
