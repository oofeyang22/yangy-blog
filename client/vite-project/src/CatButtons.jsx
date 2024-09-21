import {Link } from 'react-router-dom'

const CatButtons = () => {
    return (
      
        <div >

          <nav>
            <div className='buttons'>
              <button><Link to={"/post/category/python"}>Python</Link></button>
              <button><Link to={"/post/category/javascript"}>JavaScript</Link></button>
              <button><Link to={"/post/category/react"}>React</Link></button>
              <button><Link to={"/post/category/web-development"}>Web Development</Link></button>
              <button><Link to={"/post/category/ui-ux"}>UI/UX Design</Link></button>
            </div>
          </nav>
        </div>
    )
}

export default CatButtons;
