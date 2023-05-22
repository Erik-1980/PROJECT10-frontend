import {Link} from 'react-router-dom';

export default function HeaderAdmin() {

  return (
    <header>
      <div className="header">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/admin'>Main</Link></li> 
          <li><Link to='/admin/getuser'>Get User</Link></li>
          <li><Link to='/admin/getallusers'>Get All Users</Link></li>
          <li><Link to='/admin/addcategory'>Category</Link></li>
          <li><Link to='/admin/getoneproduct'>Get One Product</Link></li>
          <li><Link to='/admin/getallproducts'>Get All Products</Link></li>
          <li><Link to='/admin/addproduct'>Add Products</Link></li>
          <li><Link to='/admin/updateproduct'>Update Products</Link></li>
        </ul> 
      </div>
    </header>
  );
}
