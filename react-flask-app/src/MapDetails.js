import { useSelector } from "react-redux";
import { useParams } from "react-router";

const MapDetails = (Props) => {
    let { mapId } = useParams();
    console.log(mapId);
    const blogData = useSelector((state) => state.blogData);
    const blog = blogData.find(p => p.id === Number(mapId));

    if (!blog) {
      return (
        <h2> Sorry. Blog doesn't exist </h2>
      );
    } else {
      return (
        <div>
        <h3> {blog.name} </h3>
        <p>{blog.description}</p>
        </div>
      );
    }
}

export default MapDetails;