import React from 'react'

function Form() {
  return (
    <div>
<div className="mainContainers">
<h1>Create Product</h1>
{/* enctype="multipart/form-data" */}
<form action="" method="post">
    <div>
        <label >Name</label>
        <input type="text" name="name" required />
    </div>

    <div>
        <label >Weight</label>
        <input type="number" name="weight" required />
    </div>

    <div>
        <label >Size</label>
        <select name="product_size" required>
            <option value="">select wieght</option>
            <option value="/g">g</option>
            <option value="/kg">kg</option>
        </select>
    </div>

    <div>
        <label >Price</label>
        <input type="text" name="price" required />
    </div>
    <div>
        <label >Image</label>
        <input type="file" name="image" required />
    </div>
    <div className="btn">
        <button type="submit">
            <i className="fa-solid fa-plus"></i> Create
        </button>
    </div>

</form>
</div>
    </div>
  )
}

export default Form
