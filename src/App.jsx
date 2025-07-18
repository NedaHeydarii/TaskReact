
import { useState, useEffect } from 'react'
import axios from 'axios'


const App =  () => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState({ name: '', description: '', parentid: '' });
  const [editCategory, setEditCategory] = useState(null)
const baseUrl = 'https://learn-react-task-01-production.up.railway.app'

   useEffect(() =>{
    fetchCategories()
  }, [])

  // all cat

  const fetchCategories = () => {
    axios.get(`${baseUrl}/cat/allCat`)
      .then(response => setCategories(response.data))
      .catch(error => console.log('  erorrr:', error));
  }

  // delete category
  const deleteCategory = (id) => {
    axios.delete(`${baseUrl}/cat/delete/${id}`)
      .then(() => {
        alert('دیلیت شده')
        fetchCategories()
      })
      .catch(error => console.log(' خطا  در دیلیت :', error))
  }
 
  // add  category
  const addCategory = () => {
    axios.post(`${baseUrl}/cat/create`, newCategory)
      .then(res => {
        alert('category ساخته شد');
        setNewCategory({ name: '', description: '', parentid: '' })
        fetchCategories();
      })
      .catch(error => console.log('خطا  :', error))
  }

  // put category
  const updateCategory = () => {
    axios.put(`${baseUrl}/cat/update`, editCategory)
      .then(() => {
        alert('ثبت شدههه')
        setEditCategory()
         fetchCategories()
      })
      .catch(error => console.log('ارور  در ادیت  شده:', error))
      console.log(setEditCategory)
  }


  return (
    <div style={{display:"flex" , alignItems:"center" , flexFlow:"column"}}>
      <h1 style={{color:"pink"}}> Category Lists Nedaa</h1>
        {/* <link href="/src/style.css" rel="stylesheet"></link> */}

      {/* listssssssssss*/}
      <div style={{    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
      {Array.isArray(categories) && categories.map(cat => (
        <div key={cat} style={{ border: '1px solid pink', margin: '10px', padding: '10px', borderRadius:"20px",}}>
          <p>name: {cat.name}</p>
          <p>describe: {cat.describe}</p>
          <p>parentId: {cat.parentid}</p>
          <button style={{marginRight:"2px" , color:"red"}}  onClick={() => deleteCategory(cat.id)}>حذف</button>
          <button style={{color:"purple"}} onClick={() => setEditCategory({ ...cat })}>ادیت</button>
        </div>
      ))}
</div>
      {/* create new category*/}
      <div style={{ border:"1px solid yellow", borderRadius:"10px" , display:"flex", flexFlow:"column" , padding:"13px"}}>
  
      <h2 style={{color:"yellow"}} > Create New Category</h2>
      <input
        placeholder="name"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <input style={{marginTop:"5px" , marginBottom:"5px" }}
        placeholder="describe"
        value={newCategory.describe}
        onChange={(e) => setNewCategory({ ...newCategory, describe: e.target.value })}
      />
      <input
        placeholder="parentId"
        value={newCategory.parentid}
        onChange={(e) => setNewCategory({ ...newCategory, parentid: e.target.value })}
      />
      <button style={{marginTop:"4px" , marginBottom:"10px"}} onClick={addCategory}>ساخت</button>

       </div>

      {/* Edit Form for categoryyy*/}
      {editCategory && (
        <div style={{ marginTop:"10px", display:"flex" , flexFlow:"column" , border:"4px solid purple" , borderRadius:"10px" , padding:"13px"}}>
          <h2 style={{color:"purple"}}>Edit one of your category</h2>
          <input
            placeholder="name"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
          />
          <input style={{marginTop:"4px" , marginBottom:"4px"}}
            placeholder="describe"
            value={editCategory.describe}
            onChange={(e) => setEditCategory({ ...editCategory, describe: e.target.value })}
          />
          <input
            placeholder="parentId"
            value={editCategory.parentid}
            onChange={(e) => setEditCategory({ ...editCategory, parentid: e.target.value })}
          />
          <button onClick={updateCategory}>ثبت   کن</button>
          <button onClick={() => setEditCategory(null)}>انصراف</button>
        </div>
      )}
    </div>
  );
}

export default App