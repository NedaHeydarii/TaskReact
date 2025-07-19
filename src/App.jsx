
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
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
      .catch(error => console.log('خطا  :', error));
  }

  // add  category
  const addCategory = () => {
    axios.post(`${baseUrl}/cat/create`, newCategory)
      .then(res => {
        alert('category ساخته شد');
        setNewCategory({ name: '', description: '', parentid: '' });
        fetchCategories();
      })
      .catch(error => console.log('خطا  :', error));
  }

  // update category
  const updateCategory = () => {
    axios.put(`${baseUrl}/cat/update`, editCategory)
      .then(() => {
        alert('ثبت شدههه')
        setEditCategory()
         fetchCategories()
      })
      .catch(error => console.log('ارور  در ادیت  شده:', error));
      console.log(setEditCategory)
  }


  return (
    <div style={{display:"flex" , alignItems:"center" , flexFlow:"column"}}>
      <h1> Category Lists Nedaa</h1>
        {/* <link href="/src/style.css" rel="stylesheet"></link> */}

      {/* listssssssssss*/}
      {Array.isArray(categories) && categories.map(cat => (
        <div key={cat} style={{ border: '1px solid pink', margin: '10px', padding: '10px', borderRadius:"20px" }}>
          <p>name: {cat.name}</p>
          <p>describe: {cat.describe}</p>
          <p>parentId: {cat.parentid}</p>
          <button style={{marginRight:"2px"}}  onClick={() => deleteCategory(cat.id)}>حذف</button>
          <button onClick={() => setEditCategory({ ...cat })}>ادیت</button>
        </div>
      ))}

      {/* create new category*/}
      <h2> Create New Category</h2>
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
      <button class="margin-y-2" onClick={addCategory}>ساخت</button>

      {/* Edit Form for categoryyy*/}
      {editCategory && (
        <div>
          <h2>Edit  one category</h2>
          <input
            placeholder="name"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
          />
          <input
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
