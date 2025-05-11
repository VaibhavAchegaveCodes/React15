import React,{useState,useEffect} from 'react';
function ProductListing(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [sortOrder,setSortOrder]=useState('asc');
    const [selectedCategory,setSelectedCategory]=useState('all');

    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const response= await fetch('https://fakestoreapi.com/products');
                const data=await response.json();
                setProducts(data);
                setLoading(false);
            }catch(error){
                console.error('Error fetching products',error);
                setLoading(false);
            }
        }
        fetchProducts();
    },[])

    const handleDelete=(id)=>{
        const updatedProducts=products.filter(product=>product.id!==id);
        setProducts(updatedProducts);
    }

    const handleSort=()=>{
        const sortedProducts=[...products].sort((a,b)=> sortOrder==='asc'? a.price-b.price : b.price-a.price
        )
        setProducts(sortedProducts);
        setSortOrder(sortOrder==='asc'? 'desc':'asc')
    }

    const handleCategoryChange=(e)=>{
        setSelectedCategory(e.target.value);
    };

    const filteredProducts=selectedCategory==='all'? products: products.filter(product=>product.category===selectedCategory);

    const categories=[...new Set(products.map(product=>product.category))];

    if(loading) return <div>Loading products...</div>

    return(
        <div className='product-listing'>
            <h2>Product Management</h2>
            <div className='controls'>
                <button onClick={handleSort}>
                    Sort by Price: {sortOrder==='asc'?'ascending':'descending'}
                </button>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value='all'>All Categorues</option>
                {categories.map(category=>(<option key={category}value={category}>{category}</option>))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product=>(
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{products.title}</td>
                            <td>{product.category}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{product.rating?.rate} ({product.rating?.count})</td>
                            <td>
                                <button onClick={()=>handleDelete(product.id)}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
export default ProductListing;