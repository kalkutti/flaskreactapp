import MapList from "./MapList";
import RedBlack from "./RedBlack";
import MapDetails from "./MapDetails";
import { Link, Outlet, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

const Map = () => useRoutes([
    { 
        path: '/', 
        element: <MapHome />,
        children: [
            { path: '/', element: <MapList /> },
            { path: 'redblack', element: <RedBlack /> },
            { path: ':mapId', element: <MapDetails /> },
        ]
    }
])

const MapHome = () => {
    const blogData = useSelector((state) => state.blogData);
    const linkList = blogData.map((blog) => {
        return (
          <li key={blog.id}>
            <Link to={`${blog.id}`}>{blog.name}</Link>
          </li>
        );
    });

    return (
        <div>
            <div>
                <h3>My Maps</h3>
                <ul>{linkList}</ul>
            </div>
            <Outlet />
        </div>
    );
}

export default Map;